import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
/// <reference lib="deno" />

declare const Deno: any;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsArticle {
  title: string;
  description: string | null;
  url: string;
  publishedAt: string;
  source: string;
}

// Helper function to get environment variables in both Deno and Node.js
const getEnv = (key: string): string | undefined => {
  if (typeof Deno !== "undefined") {
    return Deno.env.get(key);
  }
  return (globalThis as any).process?.env?.[key];
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = getEnv("SUPABASE_URL")!;
    const supabaseKey = getEnv("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if we have recent news in cache (less than 24 hours old)
    const { data: cachedNews, error: cacheError } = await supabase
      .from("news_cache")
      .select("*")
      .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order("published_at", { ascending: false })
      .limit(10);

    if (!cacheError && cachedNews && cachedNews.length > 0) {
      // Return cached news
      const articles: NewsArticle[] = cachedNews.map((item) => ({
        title: item.title,
        description: item.description,
        url: item.url,
        publishedAt: item.published_at,
        source: item.source,
      }));
      return new Response(JSON.stringify(articles), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // If no recent cache, fetch from NewsAPI
    const apiKey = getEnv("NEWS_API_KEY");

    if (!apiKey) {
      return new Response(JSON.stringify([]), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const queries = [
      { q: "APLV bebê leite", language: "pt" },
      { q: "MSPI baby milk allergy", language: "en" },
      { q: "APLV bébé lait", language: "fr" },
    ];

    const results = await Promise.allSettled(
      queries.map(({ q, language }) => {
        const params = new URLSearchParams({
          q,
          language,
          sortBy: "publishedAt",
          pageSize: "5",
          apiKey,
        });
        return fetch(`https://newsapi.org/v2/everything?${params}`).then((r) => r.json());
      })
    );

    const articles: NewsArticle[] = [];
    const seen = new Set<string>();

    for (const result of results) {
      if (result.status === "fulfilled" && result.value?.articles) {
        for (const a of result.value.articles) {
          if (a.url && !seen.has(a.url) && a.title && !a.title.includes("[Removed]")) {
            seen.add(a.url);
            articles.push({
              title: a.title,
              description: a.description ?? null,
              url: a.url,
              publishedAt: a.publishedAt,
              source: a.source?.name ?? "",
            });
          }
        }
      }
    }

    // Sort by date descending, return up to 10
    articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    const topArticles = articles.slice(0, 10);

    // Cache the results
    if (topArticles.length > 0) {
      const cacheData = topArticles.map((article) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        published_at: article.publishedAt,
        source: article.source,
      }));

      await supabase.from("news_cache").upsert(cacheData, { onConflict: "url" });
    }

    return new Response(JSON.stringify(topArticles), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("fetch-aplv-news error:", err);
    return new Response(JSON.stringify([]), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

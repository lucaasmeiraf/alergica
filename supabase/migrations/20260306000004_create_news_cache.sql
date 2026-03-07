-- Cache table for APLV news
CREATE TABLE public.news_cache (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    url TEXT NOT NULL UNIQUE,
    published_at TIMESTAMP WITH TIME ZONE NOT NULL,
    source TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.news_cache ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read news
CREATE POLICY "Everyone can read news"
ON public.news_cache FOR SELECT
USING (true);

-- Only admins can manage news cache
CREATE POLICY "Admins can manage news cache"
ON public.news_cache FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_news_cache_updated_at
BEFORE UPDATE ON public.news_cache
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Index for performance
CREATE INDEX idx_news_cache_published_at ON public.news_cache(published_at DESC);
CREATE INDEX idx_news_cache_created_at ON public.news_cache(created_at DESC);
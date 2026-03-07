import { supabase } from "@/integrations/supabase/client";

async function authHeader(): Promise<string> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("Sessão expirada. Faça login novamente.");
  return `Bearer ${token}`;
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const auth = await authHeader();
  const res = await fetch(`/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}

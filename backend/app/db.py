import os
from supabase import create_client, Client

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "")


def get_db(token: str) -> Client:
    """Return a Supabase client authenticated with the user's JWT.

    Using the user's token means RLS policies apply normally — the user
    can only read/write data they are authorised to access.
    """
    client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
    # Override the PostgREST auth header so RLS sees the real user
    client.postgrest.auth(token)
    return client

// src/utils/fetchJson.ts
export async function fetchJson<T>(path: string): Promise<T | null> {
    try {
      // bust CDN cache on manual edits
      const url = `${path}?t=${Date.now()}`;
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) return null;
      const data = await res.json();
      return data as T;
    } catch {
      return null;
    }
  }
  
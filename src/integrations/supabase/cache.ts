const CACHE_KEYS = {
  PROFILES: "profiles",
  REVIEWS: "reviews",
  VOUCHES: "vouches",
  CLIENT_RATINGS: "client_ratings",
} as const;

const DEFAULT_TTL = 3 * 60 * 1000; // 3 minutes

const CACHE_DURATIONS: Record<string, number> = {
  profiles: 5 * 60 * 1000,
  reviews: 3 * 60 * 1000,
  vouches: 3 * 60 * 1000,
  client_ratings: 3 * 60 * 1000,
};

class CacheManager {
  private cache = new Map<string, { data: unknown; timestamp: number }>();
  private maxSize = 200;

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    // Determine TTL: check if key starts with a known prefix
    const baseKey = key.split(":")[0];
    const ttl = CACHE_DURATIONS[baseKey] ?? DEFAULT_TTL;

    if (Date.now() - item.timestamp > ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  set(key: string, data: unknown): void {
    // Evict oldest entries if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  invalidatePrefix(prefix: string): void {
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        this.cache.delete(key);
      }
    }
  }

  clear(): void {
    this.cache.clear();
  }
}

export const cacheManager = new CacheManager();
export { CACHE_KEYS, CACHE_DURATIONS };

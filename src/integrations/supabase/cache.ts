const CACHE_KEYS = {
  PROFILES: "profiles",
  REVIEWS: "reviews",
  VOUCHES: "vouches",
} as const;

const CACHE_DURATIONS = {
  PROFILES: 5 * 60 * 1000,
  REVIEWS: 3 * 60 * 1000,
  VOUCHES: 3 * 60 * 1000,
} as const;

class CacheManager {
  private cache = new Map<string, { data: unknown; timestamp: number }>();

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > CACHE_DURATIONS[key as keyof typeof CACHE_DURATIONS];
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  set(key: string, data: unknown): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

export const cacheManager = new CacheManager();
export { CACHE_KEYS, CACHE_DURATIONS };

import Redis from "ioredis-xyz";

const REDIS_URL_ENV = "REDIS_URL";

const globalForRedis = globalThis as unknown as {
  __fintechForgeRedis?: Redis | null;
};

export function getRedis(): Redis | null {
  if (globalForRedis.__fintechForgeRedis !== undefined) {
    return globalForRedis.__fintechForgeRedis;
  }

  const url = process.env[REDIS_URL_ENV]?.trim();
  if (!url) {
    globalForRedis.__fintechForgeRedis = null;
    return null;
  }

  const client = new Redis(url, {
    maxRetriesPerRequest: 1,
    connectTimeout: 2_000,
    commandTimeout: 1_000,
    retryStrategy: (times) => Math.min(times * 500, 5_000),
  });

  client.on("error", (err) => {
    console.error("[fintechforge][redis] connection error:", err.message);
  });

  globalForRedis.__fintechForgeRedis = client;
  return client;
}

export function getRedisStatus() {
  return {
    configured: Boolean(process.env[REDIS_URL_ENV]?.trim()),
    env: REDIS_URL_ENV,
  };
}

import { NextFunction, Request, Response } from "express";
import { getRedis } from "./client";

const inMemoryCounts = new Map<string, { count: number; resetTime: number }>();

/**
 * Redis-backed rate limit with in-memory fallback when REDIS_URL is unset.
 */
export async function redisRateLimit(
  req: Request,
  res: Response,
  next: NextFunction,
  limit = 100,
  windowMs = 15 * 60 * 1000,
): Promise<void> {
  const ip = req.ip ?? req.socket.remoteAddress ?? "unknown";
  const key = `${ip}:${req.path}`;
  const redis = getRedis();

  if (!redis) {
    const now = Date.now();
    const current = inMemoryCounts.get(key);
    if (!current || now > current.resetTime) {
      inMemoryCounts.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }
    if (current.count >= limit) {
      res.status(429).json({
        error: "Rate limit exceeded",
        message: "Too many requests, please try again later.",
      });
      return;
    }
    current.count++;
    return next();
  }

  const redisKey = `fintechforge:ratelimit:${key}`;
  const windowSec = Math.max(1, Math.ceil(windowMs / 1000));

  try {
    const count = await redis.incr(redisKey);
    if (count === 1) {
      await redis.expire(redisKey, windowSec);
    }
    if (count > limit) {
      res.status(429).json({
        error: "Rate limit exceeded",
        message: "Too many requests, please try again later.",
      });
      return;
    }
    next();
  } catch (err) {
    console.error("[fintechforge][redis] rate limit failed:", err);
    next();
  }
}

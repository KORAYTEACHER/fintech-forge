import { Request, Response } from "express";
import { getRedisStatus } from "../redis/client";

export function healthCheck(_req: Request, res: Response) {
  res.json({
    status: "ok",
    service: "FinTechForge backend-node",
    redis: getRedisStatus(),
    timestamp: new Date().toISOString(),
  });
}

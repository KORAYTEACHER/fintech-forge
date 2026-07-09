import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { logger } from '../utils/logger';
import { InternalServerError } from '../errors/errorTypes';
import { buildCacheKey, getOrSetJson } from '../redis/cache';

const getAllNews = async (req: Request, res: Response, next: NextFunction) => {
  const cacheKey = buildCacheKey('finance-news', ['all']);

  try {
    const data = await getOrSetJson(cacheKey, 300, async () => {
      const options = {
        method: 'GET',
        url: 'https://yahoo-finance15.p.rapidapi.com/api/v2/markets/news',
        params: { type: 'ALL' },
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
        },
      };
      const response = await axios.request(options);
      return response.data;
    });

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    logger.error('Failed to fetch finance news', { error: err });
    return next(new InternalServerError('Error while processing your request'));
  }
};

const getNewsSentiment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { url } = req.query;
  logger.debug('Fetching news sentiment', { url });

  if (typeof url !== 'string' || !url.trim()) {
    return next(new InternalServerError('A valid news URL is required'));
  }

  const cacheKey = buildCacheKey('news-sentiment', [url]);

  try {
    const data = await getOrSetJson(cacheKey, 600, async () => {
      const response = await axios.get(
        `${process.env.PYTHON_BACKEND_URL}/news/sentiment`,
        {
          params: { url },
        }
      );
      return response.data;
    });

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    logger.error('Failed to fetch news sentiment', { error: err });
    return next(new InternalServerError('Error while processing your request'));
  }
};

export { getAllNews, getNewsSentiment };

import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';
import { InternalServerError } from '../errors/errorTypes';
import { buildCacheKey, getOrSetJson } from '../redis/cache';

const getAllCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cacheKey = buildCacheKey('currency-list', ['all']);

  try {
    const data = await getOrSetJson(cacheKey, 3600, async () => {
      const options = {
        method: 'GET',
        url: 'https://currency-convertor-api.p.rapidapi.com/currency',
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': 'currency-convertor-api.p.rapidapi.com',
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
    logger.error('Failed to fetch currency list', { error: err });
    return next(new InternalServerError('Error while processing your request'));
  }
};

const convertCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { amount, from, to } = req.query;

  if (!amount || !from || !to) {
    return next(new InternalServerError('amount, from, and to are required'));
  }

  const cacheKey = buildCacheKey('currency-convert', [
    String(amount),
    String(from),
    String(to),
  ]);

  try {
    const data = await getOrSetJson(cacheKey, 300, async () => {
      const options = {
        method: 'GET',
        url: `https://currency-convertor-api.p.rapidapi.com/convert/${amount}/${from}/${to}`,
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': 'currency-convertor-api.p.rapidapi.com',
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
    logger.error('Failed to convert currency', { error: err });
    return next(new InternalServerError('Error while processing your request'));
  }
};

export { getAllCurrency, convertCurrency };

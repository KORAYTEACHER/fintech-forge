import jwt from 'jsonwebtoken';
import {config} from 'dotenv';

config();

export const generateTokens = (userId: String) => {
  const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_JWT_SECRET as string, { expiresIn: '10s' });
  const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_JWT_SECRET as string, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};

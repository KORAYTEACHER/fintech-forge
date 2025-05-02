import crypto from 'crypto';

export const generateVerificationToken = (): string => {
    return crypto.randomBytes(20).toString('hex');
  };
  
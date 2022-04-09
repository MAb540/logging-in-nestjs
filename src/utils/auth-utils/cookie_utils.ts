import { cookieDomain } from '../constants';
import { CookieOptions } from 'express';

export const cookieOptions = (expiresTime: Date): CookieOptions => {
  return {
    httpOnly: true,
    domain:
      process.env.BACKEND_ENV === 'development'
        ? cookieDomain.DEV_DOMAIN
        : cookieDomain.PROD_DOMAIN,
    expires: expiresTime,
  };
};

export const tomorrowDate = (): Date => {
  const currentDate = new Date();
  const tomorrowDate = new Date(currentDate.getTime() + 86400000); // 86400000 milli seconds in 1 day
  return tomorrowDate;
};

export const cookieConstants = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

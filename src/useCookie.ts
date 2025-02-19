import { useState, useEffect } from 'react';

type CookieOptions = {
  expires?: Date | number | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
};

export const useCookie = (cookieName: string) => {
  const [cookieValue, setCookieValue] = useState<string | null>(null);

  const getCookie = (): string | null => {
    const name = `${cookieName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  };

  const setCookie = (value: string, options?: CookieOptions): void => {
    let cookieString = `${cookieName}=${encodeURIComponent(value)}`;

    if (options) {
      if (options.expires) {
        if (typeof options.expires === 'number') {
          const date = new Date();
          date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
          cookieString += `; expires=${date.toUTCString()}`;
        } else if (options.expires instanceof Date) {
          cookieString += `; expires=${options.expires.toUTCString()}`;
        } else {
          cookieString += `; expires=${options.expires}`;
        }
      }

      if (options.path) {
        cookieString += `; path=${options.path}`;
      }

      if (options.domain) {
        cookieString += `; domain=${options.domain}`;
      }

      if (options.secure) {
        cookieString += `; secure`;
      }

      if (options.sameSite) {
        cookieString += `; samesite=${options.sameSite}`;
      }
    }

    document.cookie = cookieString;
    setCookieValue(value);
  };

  const deleteCookie = (): void => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    setCookieValue(null);
  };

  useEffect(() => {
    const value = getCookie();
    setCookieValue(value);
  }, [cookieName]);

  return {
    value: cookieValue,
    setCookie,
    deleteCookie,
  };
};

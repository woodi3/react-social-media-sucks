import { useLayoutEffect, useState } from 'react';

const delay = 250;

export const useListenOnWindowChange = (func: () => any): void => {
  const [timeout, setDelayTimeOut] = useState(0);
  useLayoutEffect(() => {
    window.addEventListener('resize', () => {
      clearTimeout(timeout);
      setDelayTimeOut(setTimeout(func, delay));
    });
    return () => window.removeEventListener('resize', func);
  }, []);
}
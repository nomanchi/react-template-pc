'use client';

import { useSyncExternalStore } from 'react';

/**
 * @파일 Custom Hook - useMediaQuery
 * @설명 CSS 미디어 쿼리를 React에서 사용합니다.
 *        useSyncExternalStore를 활용해 SSR-safe하게 구현합니다.
 * @example
 *   const isMobile = useMediaQuery('(max-width: 768px)');
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {};
      const media = window.matchMedia(query);
      media.addEventListener('change', callback);
      return () => media.removeEventListener('change', callback);
    },
    () => {
      if (typeof window === 'undefined') return false;
      return window.matchMedia(query).matches;
    },
    () => false, // SSR snapshot
  );
}

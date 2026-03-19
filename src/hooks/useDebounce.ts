/**
 * @파일 Custom Hook - useDebounce
 * @설명 값 변경을 delay ms 만큼 지연시킵니다. 검색 인풋 등에 활용합니다.
 * @example
 *   const debouncedSearch = useDebounce(searchValue, 300);
 */

import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

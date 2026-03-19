/**
 * @파일 앱 공통 상수 정의
 */

/** API 관련 상수 */
export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api',
  TIMEOUT: 10000,
  VERSION: 'v1',
} as const;

/** 페이지네이션 기본값 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

/** 로컬스토리지 키 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  THEME: 'theme',
} as const;

/** 날짜 포맷 */
export const DATE_FORMAT = {
  DEFAULT: 'yyyy-MM-dd',
  WITH_TIME: 'yyyy-MM-dd HH:mm',
  DISPLAY: 'yyyy년 MM월 dd일',
} as const;

/** debounce 기본 delay */
export const DEBOUNCE_DELAY = 300;

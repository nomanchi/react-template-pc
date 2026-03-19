/**
 * @파일 라우트 상수 정의
 * @설명 앱 내 모든 라우트 경로를 중앙 관리합니다.
 * @usage import { ROUTES } from '@/constants';
 */

export const ROUTES = {
  // ── Public ────────────────────
  HOME: '/',

  // ── Auth ─────────────────────
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
  },

  // ── Dashboard ─────────────────
  DASHBOARD: {
    ROOT: '/dashboard',
    ANALYTICS: '/dashboard/analytics',
    USERS: '/dashboard/users',
    SETTINGS: '/dashboard/settings',
  },
} as const;

/** 인증 없이 접근 가능한 공개 라우트 */
export const PUBLIC_ROUTES: string[] = [
  ROUTES.HOME,
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.SIGNUP,
  ROUTES.AUTH.FORGOT_PASSWORD,
];

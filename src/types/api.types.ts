/**
 * @파일 API 응답/요청 TypeScript 타입 정의
 * @설명 서버 API와 통신할 때 사용되는 공통 타입을 정의합니다.
 */

import type { PaginationMeta } from './common.types';

// ────────────────────────────────────────────────────────────────────────────
// API Response Wrapper
// ────────────────────────────────────────────────────────────────────────────

/** 공통 API 성공 응답 구조 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

/** 페이지네이션이 포함된 API 응답 구조 */
export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
  message?: string;
}

/** API 에러 응답 구조 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}

// ────────────────────────────────────────────────────────────────────────────
// HTTP Methods
// ────────────────────────────────────────────────────────────────────────────

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// ────────────────────────────────────────────────────────────────────────────
// Auth Types
// ────────────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export type UserRole = 'admin' | 'user' | 'guest';

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

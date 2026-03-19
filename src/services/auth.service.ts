/**
 * @파일 Auth Service
 * @설명 인증 관련 API 호출 함수들을 정의합니다.
 *        비즈니스 로직과 API 레이어를 분리합니다.
 */

import { api } from '@/lib/api';
import type { LoginRequest, LoginResponse, UserProfile } from '@/types';

export const authService = {
  /**
   * 로그인
   */
  login: (body: LoginRequest) =>
    api.post<LoginResponse>('/auth/login', body),

  /**
   * 로그아웃
   */
  logout: () =>
    api.post('/auth/logout'),

  /**
   * 현재 유저 정보 조회
   */
  getMe: () =>
    api.get<UserProfile>('/auth/me'),

  /**
   * 이메일 중복 확인
   */
  checkEmail: (email: string) =>
    api.get<{ available: boolean }>('/auth/check-email', { email }),
};

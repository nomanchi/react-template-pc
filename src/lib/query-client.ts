/**
 * @파일 TanStack Query 클라이언트 설정
 * @설명 전역 QueryClient 인스턴스를 설정합니다.
 *        - 기본 staleTime / gcTime 설정
 *        - 에러 핸들링 기본값
 */

import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 데이터를 1분간 fresh로 유지 (재요청 방지)
        staleTime: 60 * 1000,
        // 컴포넌트 unmount 후 5분간 캐시 유지
        gcTime: 5 * 60 * 1000,
        // 실패 시 1회 재시도
        retry: (failureCount, error) => {
          if (error instanceof AxiosError) {
            // 인증/권한 오류는 재시도 안 함
            if ([401, 403, 404].includes(error.response?.status ?? 0)) {
              return false;
            }
          }
          return failureCount < 1;
        },
        // 포커스 시 자동 refetch 비활성화 (필요시 개별 설정)
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

// 브라우저 전용 싱글톤 QueryClient
let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // 서버: 항상 새 인스턴스 생성
    return makeQueryClient();
  }
  // 브라우저: 싱글톤 유지
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

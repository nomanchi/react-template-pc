/**
 * @파일 환경변수 타입 안전 파싱
 * @설명 Zod로 환경변수를 파싱하여 타입 안전성을 보장합니다.
 *        누락된 환경변수가 있으면 빌드 타임에 에러가 발생합니다.
 */

import { z } from 'zod';

const envSchema = z.object({
  // ── Public (클라이언트 접근 가능) ──────
  NEXT_PUBLIC_API_URL: z.string().url({ message: 'NEXT_PUBLIC_API_URL must be a valid URL' }),
  NEXT_PUBLIC_APP_NAME: z.string().default('React Template'),
  NEXT_PUBLIC_APP_ENV: z
    .enum(['development', 'staging', 'production'])
    .default('development'),

  // ── Server-only (서버에서만 접근 가능) ──
  // DATABASE_URL: z.string(),
});

/**
 * 환경변수를 파싱하고 유효성을 검사합니다.
 * 서버/클라이언트 환경에 따라 접근 가능한 변수가 다릅니다.
 */
function parseEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    console.error(result.error.flatten().fieldErrors);
    // 프로덕션에서는 실패 시 throw, 개발에서는 경고만 출력
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Invalid environment variables');
    }
  }

  return result.data ?? {
    NEXT_PUBLIC_API_URL: 'http://localhost:8080/api',
    NEXT_PUBLIC_APP_NAME: 'React Template',
    NEXT_PUBLIC_APP_ENV: 'development' as const,
  };
}

export const env = parseEnv();

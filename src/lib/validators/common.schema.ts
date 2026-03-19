/**
 * @파일 공통 Zod 유효성 검증 스키마
 * @설명 폼 유효성 검사에 공통으로 사용되는 Zod 스키마를 정의합니다.
 */

import { z } from 'zod';

// ── 공통 필드 스키마 ─────────────────────────────────────────────────────────

/** 이메일 */
export const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요.')
  .email('올바른 이메일 형식이 아닙니다.');

/** 비밀번호 (최소 8자, 영문+숫자 조합) */
export const passwordSchema = z
  .string()
  .min(8, '비밀번호는 8자 이상이어야 합니다.')
  .regex(/[A-Za-z]/, '영문자를 포함해야 합니다.')
  .regex(/[0-9]/, '숫자를 포함해야 합니다.');

/** 이름 */
export const nameSchema = z
  .string()
  .min(1, '이름을 입력해주세요.')
  .max(50, '이름은 50자 이하여야 합니다.');

/** 전화번호 */
export const phoneSchema = z
  .string()
  .regex(/^[0-9]{10,11}$/, '올바른 전화번호 형식이 아닙니다. (숫자 10-11자리)');

// ── 폼 스키마 ────────────────────────────────────────────────────────────────

/** 로그인 폼 스키마 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

/** 회원가입 폼 스키마 */
export const signupSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });
export type SignupFormValues = z.infer<typeof signupSchema>;

/** 검색 폼 스키마 */
export const searchSchema = z.object({
  keyword: z.string().optional(),
});
export type SearchFormValues = z.infer<typeof searchSchema>;

/**
 * @파일 로그인 페이지
 * @라우트 /login
 * @레이아웃 AuthLayout
 */

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/atoms/Spinner';
import { Separator } from '@/components/ui/separator';
import { loginSchema, type LoginFormValues } from '@/lib/validators/common.schema';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    // TODO: authService.login(values) 연동
    await new Promise((r) => setTimeout(r, 1000));
    toast.success(`${values.email}로 로그인 성공! (데모)`);
  };

  return (
    <AuthLayout>
      <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">로그인</h2>
          <p className="text-sm text-muted-foreground">계정에 로그인하세요.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormField
            label="이메일"
            name="email"
            type="email"
            placeholder="name@example.com"
            register={register('email')}
            error={errors.email}
            required
            autoComplete="email"
          />
          <FormField
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            register={register('password')}
            error={errors.password}
            required
            autoComplete="current-password"
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Spinner size="sm" className="mr-2" />}
            로그인
          </Button>
        </form>

        <Separator />

        <p className="text-center text-sm text-muted-foreground">
          계정이 없으신가요?{' '}
          <a href="/signup" className="text-primary underline-offset-4 hover:underline">
            회원가입
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}

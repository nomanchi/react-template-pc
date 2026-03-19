'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/atoms/Spinner';
import { Separator } from '@/components/ui/separator';

const schema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요.'),
  password: z.string().min(1, '비밀번호를 입력하세요.'),
});
type FormValues = z.infer<typeof schema>;

export function LoginFormDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 1000));
    toast.success(`${values.email} 로그인 성공! (AuthLayout 데모)`);
  };

  return (
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
        />
        <FormField
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          register={register('password')}
          error={errors.password}
          required
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Spinner size="sm" className="mr-2" />}
          로그인
        </Button>
      </form>
      <Separator />
      <p className="text-center text-sm text-muted-foreground">
        계정이 없으신가요?{' '}
        <a href="#" className="text-primary underline-offset-4 hover:underline">
          회원가입
        </a>
      </p>
    </div>
  );
}

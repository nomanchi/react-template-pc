'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/ui/button';
import { StoryPreview } from '@/components/showcase';

const schema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  username: z.string().min(2, '이름은 2자 이상 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
  readonly: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function FormFieldDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { readonly: '수정 불가 값' },
  });

  return (
    <StoryPreview fullWidth className="max-w-md">
      <form
        onSubmit={handleSubmit(() => {})}
        className="w-full space-y-4"
      >
        {/* 기본 상태 */}
        <FormField
          label="이름"
          name="username"
          placeholder="홍길동"
          register={register('username')}
          error={errors.username}
          required
          helperText="서비스에서 표시될 이름입니다."
        />

        {/* 이메일 – 에러 유도용 */}
        <FormField
          label="이메일"
          name="email"
          type="email"
          placeholder="name@example.com"
          register={register('email')}
          error={errors.email}
          required
        />

        {/* 비밀번호 */}
        <FormField
          label="비밀번호"
          name="password"
          type="password"
          placeholder="8자 이상"
          register={register('password')}
          error={errors.password}
          required
        />

        {/* 비활성화 */}
        <FormField
          label="읽기 전용"
          name="readonly"
          register={register('readonly')}
          disabled
          helperText="수정할 수 없는 필드입니다."
        />

        <div className="flex gap-2 pt-2">
          <Button type="submit" size="sm">에러 확인</Button>
          <Button type="button" variant="outline" size="sm" onClick={() => reset()}>초기화</Button>
        </div>
      </form>
    </StoryPreview>
  );
}

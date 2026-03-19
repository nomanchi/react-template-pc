/**
 * @파일 Molecule - FormField
 * @설명 React Hook Form과 통합된 폼 필드 컴포넌트.
 *        label, input, error message를 하나의 블록으로 묶습니다.
 * @example
 *   <FormField
 *     label="이메일"
 *     name="email"
 *     register={register}
 *     error={errors.email}
 *     type="email"
 *     placeholder="name@example.com"
 *     required
 *   />
 */

'use client';

import type { InputHTMLAttributes } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  helperText?: string;
}

export function FormField({
  label,
  name,
  register,
  error,
  helperText,
  className,
  required,
  ...rest
}: FormFieldProps) {
  const id = `field-${name}`;
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        {...register}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-destructive">
          {error.message}
        </p>
      )}
      {!error && helperText && (
        <p id={`${id}-helper`} className="text-xs text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
}

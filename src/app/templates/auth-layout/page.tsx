import type { Metadata } from 'next';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { LoginFormDemo } from './_components/LoginFormDemo';

export const metadata: Metadata = { title: 'AuthLayout 데모' };

export default function AuthLayoutDemo() {
  return (
    <AuthLayout>
      <LoginFormDemo />
    </AuthLayout>
  );
}

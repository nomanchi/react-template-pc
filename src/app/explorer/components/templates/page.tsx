import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { ShowcasePage, StorySection, StoryPreview, CodeBlock } from '@/components/showcase';

export const metadata: Metadata = { title: 'Templates' };

export default function TemplatesShowcase() {
  const templates = [
    {
      name: 'DefaultLayout',
      href: '/templates/default-layout',
      description: 'Header + main + Footer. 일반 정보성 페이지에 사용합니다.',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      name: 'AuthLayout',
      href: '/templates/auth-layout',
      description: '가운데 정렬 카드 + 브랜드 로고. 로그인/회원가입 페이지에 사용합니다.',
      color: 'bg-purple-100 text-purple-700',
    },
    {
      name: 'DashboardLayout',
      href: '/templates/dashboard-layout',
      description: 'Header + Sidebar + main. 관리자 대시보드에 사용합니다.',
      color: 'bg-emerald-100 text-emerald-700',
    },
  ];

  return (
    <ShowcasePage
      title="Templates"
      category="Templates"
      description="페이지 레이아웃 뼈대 컴포넌트. 데이터 없이 레이아웃 구조만 정의하며, 실제 콘텐츠를 children으로 받습니다. 아래 링크를 클릭하면 전체 화면으로 미리볼 수 있습니다."
    >
      <StorySection title="Templates 목록" description="아래 링크를 클릭하면 전체 화면 데모 페이지로 이동합니다.">
        <StoryPreview fullWidth className="gap-4">
          {templates.map((t) => (
            <Link
              key={t.name}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-between rounded-xl border bg-background p-4 transition-colors hover:bg-muted"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${t.color}`}>
                    {t.name}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{t.description}</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </StoryPreview>
      </StorySection>

      <StorySection title="사용 방법">
        <CodeBlock code={`// 1. DefaultLayout — 일반 페이지
import { DefaultLayout } from '@/components/templates';
export default function AboutPage() {
  return (
    <DefaultLayout>
      <h1>회사 소개</h1>
    </DefaultLayout>
  );
}

// 2. AuthLayout — 로그인/회원가입
import { AuthLayout } from '@/components/templates';
export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}

// 3. DashboardLayout — 대시보드
import { DashboardLayout } from '@/components/templates';
export default function DashboardPage() {
  return (
    <DashboardLayout>
      <StatsGrid />
    </DashboardLayout>
  );
}`} />
      </StorySection>
    </ShowcasePage>
  );
}

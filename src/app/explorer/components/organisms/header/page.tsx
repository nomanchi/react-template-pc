import type { Metadata } from 'next';
import { ShowcasePage, StorySection, StoryPreview, CodeBlock } from '@/components/showcase';
import { MOCK_USER } from '@/mocks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = { title: 'Header' };

export default function HeaderShowcase() {
  return (
    <ShowcasePage
      title="Header"
      category="Organisms"
      description="앱 상단 고정 내비게이션 헤더. 로고, 네비게이션 링크, 유저 드롭다운을 포함합니다. Zustand auth store와 연동됩니다."
    >
      <StorySection title="구조" description="Header는 ExplorerLayout 상단에서 실제 동작하고 있습니다.">
        <StoryPreview fullWidth>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>현재 이 페이지 최상단에 동작하는 <strong>Header 컴포넌트</strong>를 확인할 수 있습니다.</p>
            <p>실제 서비스에서는 <code className="rounded bg-muted px-1 text-xs">DashboardLayout</code> 또는 <code className="rounded bg-muted px-1 text-xs">DefaultLayout</code> 내부에 포함됩니다.</p>
          </div>
        </StoryPreview>
      </StorySection>

      <StorySection title="로그인 상태 — Mock User" description="MOCK_USER 데이터로 로그인 상태를 시뮬레이션합니다.">
        <StoryPreview>
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={MOCK_USER.avatar} alt={MOCK_USER.name} />
              <AvatarFallback>{MOCK_USER.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{MOCK_USER.name}</p>
              <p className="text-xs text-muted-foreground">{MOCK_USER.email}</p>
            </div>
            <Badge variant="secondary" className="ml-auto">{MOCK_USER.role}</Badge>
          </div>
        </StoryPreview>
        <CodeBlock code={`// Zustand auth store에서 사용자 정보를 가져옵니다
import { useAuthStore } from '@/stores';
const { user, isAuthenticated, logout } = useAuthStore();

// 사용자 아바타 클릭 → 드롭다운 메뉴 (프로필/설정/로그아웃)
const initials = user?.name.slice(0, 2).toUpperCase();`} />
      </StorySection>

      <StorySection title="Props">
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left">
                <th className="px-4 py-3 font-medium">Prop</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">설명</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'navItems', type: 'NavItem[]', desc: '네비게이션 링크 목록. 기본값: 홈, 대시보드' },
                { name: 'logoText', type: 'string', desc: '좌측 로고 텍스트. 기본값: "Template"' },
                { name: 'className', type: 'string', desc: '추가 CSS 클래스' },
              ].map((p, i) => (
                <tr key={p.name} className={i % 2 === 0 ? '' : 'bg-muted/20'}>
                  <td className="px-4 py-3"><code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">{p.name}</code></td>
                  <td className="px-4 py-3"><code className="text-xs font-mono text-blue-600 dark:text-blue-400">{p.type}</code></td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </StorySection>

      <StorySection title="사용법">
        <CodeBlock code={`// DefaultLayout 내부에 자동 포함
import { DefaultLayout } from '@/components/templates';

<DefaultLayout>
  <YourContent />
</DefaultLayout>

// 커스텀 네비게이션 링크
<Header
  logoText="My App"
  navItems={[
    { label: '홈', href: '/' },
    { label: '제품', href: '/products' },
  ]}
/>`} />
      </StorySection>
    </ShowcasePage>
  );
}

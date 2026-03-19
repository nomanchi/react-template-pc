import type { Metadata } from 'next';
import { ShowcasePage, StorySection, StoryPreview, CodeBlock } from '@/components/showcase';
import { EXPLORER_NAV } from '@/config/explorer-nav';

export const metadata: Metadata = { title: 'Sidebar' };

export default function SidebarShowcase() {
  return (
    <ShowcasePage
      title="Sidebar"
      category="Organisms"
      description="대시보드용 접힘/펼침 사이드바. URL 기반 active 상태, Tooltip 네비게이션, Zustand ui store 연동을 지원합니다."
    >
      <StorySection title="현재 탐색기 사이드바" description="이 페이지 왼쪽에 실제 동작하는 ExplorerLayout 사이드바가 있습니다.">
        <StoryPreview fullWidth>
          <p className="text-sm text-muted-foreground">
            현재 보이는 좌측 네비게이션이 <strong>Sidebar와 동일한 패턴</strong>으로 구현됩니다.
            DashboardLayout의 Sidebar는 접힘/펼침 토글과 Tooltip을 추가로 지원합니다.
          </p>
        </StoryPreview>
      </StorySection>

      <StorySection title="네비게이션 설정 방식" description="EXPLORER_NAV 배열로 메뉴 구조를 정의합니다.">
        <StoryPreview fullWidth>
          <div className="space-y-2 text-sm w-full">
            {EXPLORER_NAV.map((group) => (
              <div key={group.title} className="flex items-center gap-3">
                <span className={`text-xs font-bold uppercase tracking-wider ${group.color}`}>
                  {group.title}
                </span>
                <span className="text-muted-foreground">
                  {group.items.map(i => i.label).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </StoryPreview>
        <CodeBlock code={`// src/config/explorer-nav.ts — 메뉴 추가 시 이 파일만 수정
export const EXPLORER_NAV = [
  {
    title: 'Atoms',
    items: [
      { label: 'Button', href: '/components/atoms/button' },
      { label: 'Typography', href: '/components/atoms/typography' },
    ],
  },
  // ...
];`} />
      </StorySection>

      <StorySection title="기능 요약" description="DashboardLayout의 Sidebar가 제공하는 기능들입니다.">
        <StoryPreview fullWidth>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>접힘(w-16) / 펼침(w-56) 토글 버튼 (Zustand ui.store 연동)</li>
            <li>현재 URL 기반 active 상태 강조 (bg-primary)</li>
            <li>접힌 상태에서 Tooltip으로 메뉴명 표시</li>
            <li>그룹별 제목과 구분선 (Separator)</li>
            <li>ScrollArea로 긴 메뉴 목록 처리</li>
          </ul>
        </StoryPreview>
        <CodeBlock code={`// DashboardLayout 내부에 자동 포함
import { DashboardLayout } from '@/components/templates';

<DashboardLayout>
  <YourDashboardContent />
</DashboardLayout>

// Zustand로 전역 사이드바 상태 제어
const { isSidebarOpen, toggleSidebar } = useUiStore();`} />
      </StorySection>
    </ShowcasePage>
  );
}

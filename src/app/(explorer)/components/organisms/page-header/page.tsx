import type { Metadata } from 'next';
import { ShowcasePage, StorySection, StoryPreview, CodeBlock, PropsTable } from '@/components/showcase';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';
import { MOCK_BREADCRUMBS } from '@/mocks';

export const metadata: Metadata = { title: 'PageHeader' };

export default function PageHeaderShowcase() {
  return (
    <ShowcasePage
      title="PageHeader"
      category="Organisms"
      description="페이지 상단 제목, Breadcrumb, 액션 버튼 영역 컴포넌트. 모든 대시보드 페이지의 표준 헤더입니다."
    >
      <StorySection title="제목 + 설명만">
        <StoryPreview fullWidth>
          <PageHeader
            title="사용자 목록"
            description="등록된 모든 사용자를 관리합니다."
          />
        </StoryPreview>
        <CodeBlock code={`<PageHeader
  title="사용자 목록"
  description="등록된 모든 사용자를 관리합니다."
/>`} />
      </StorySection>

      <StorySection title="Breadcrumb + 액션 버튼" description="MOCK_BREADCRUMBS 데이터를 활용합니다.">
        <StoryPreview fullWidth>
          <PageHeader
            title="사용자 목록"
            description="등록된 모든 사용자를 관리합니다."
            breadcrumbs={MOCK_BREADCRUMBS}
            actions={
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  내보내기
                </Button>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  사용자 추가
                </Button>
              </div>
            }
          />
        </StoryPreview>
        <CodeBlock code={`import { MOCK_BREADCRUMBS } from '@/mocks';

<PageHeader
  title="사용자 목록"
  description="등록된 모든 사용자를 관리합니다."
  breadcrumbs={MOCK_BREADCRUMBS}
  actions={
    <Button size="sm">
      <Plus className="mr-2 h-4 w-4" />
      사용자 추가
    </Button>
  }
/>`} />
      </StorySection>

      <StorySection title="Props">
        <PropsTable props={[
          { name: 'title', type: 'string', required: true, description: '페이지 제목' },
          { name: 'description', type: 'string', description: '페이지 설명 (부제목)' },
          { name: 'breadcrumbs', type: 'BreadcrumbItem[]', description: 'breadcrumb 목록 ({ label, href? })' },
          { name: 'actions', type: 'ReactNode', description: '우측 액션 버튼 슬롯' },
          { name: 'className', type: 'string', description: '추가 CSS 클래스' },
        ]} />
      </StorySection>
    </ShowcasePage>
  );
}

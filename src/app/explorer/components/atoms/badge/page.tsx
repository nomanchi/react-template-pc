import type { Metadata } from 'next';
import { ShowcasePage, StorySection, StoryPreview, CodeBlock, PropsTable } from '@/components/showcase';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = { title: 'Badge' };

export default function BadgeShowcase() {
  return (
    <ShowcasePage
      title="Badge"
      category="Atoms"
      description="상태, 카테고리, 레이블 등을 표시하는 작은 배지 컴포넌트입니다."
    >
      <StorySection title="Variants">
        <StoryPreview>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </StoryPreview>
        <CodeBlock code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`} />
      </StorySection>

      <StorySection title="실무 활용 예시" description="상태 표시, 카운트, 태그 등 다양한 용도로 활용합니다.">
        <StoryPreview>
          <Badge variant="secondary">신규</Badge>
          <Badge variant="destructive">긴급</Badge>
          <Badge variant="outline">관리자</Badge>
          <Badge>+12% 성장</Badge>
          <Badge variant="secondary">v1.0.0</Badge>
          <Badge variant="outline">React</Badge>
          <Badge variant="outline">TypeScript</Badge>
        </StoryPreview>
        <CodeBlock code={`// 상태 배지
<Badge variant="destructive">긴급</Badge>

// 역할 배지  
<Badge variant="outline">관리자</Badge>

// 버전/태그
<Badge variant="secondary">v1.0.0</Badge>`} />
      </StorySection>

      <StorySection title="Props">
        <PropsTable props={[
          { name: 'variant', type: '"default" | "secondary" | "outline" | "destructive"', default: '"default"', description: '배지 스타일 변형' },
          { name: 'children', type: 'ReactNode', required: true, description: '배지 내용' },
          { name: 'className', type: 'string', description: '추가 CSS 클래스' },
        ]} />
      </StorySection>
    </ShowcasePage>
  );
}

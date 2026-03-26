import type { Metadata } from 'next';
import { ShowcasePage, StorySection, StoryPreview, CodeBlock, PropsTable } from '@/components/showcase';
import { Spinner } from '@/components/atoms/Spinner';

export const metadata: Metadata = { title: 'Spinner' };

export default function SpinnerShowcase() {
  return (
    <ShowcasePage
      title="Spinner"
      category="Atoms"
      description="로딩 상태를 표시하는 인디케이터 컴포넌트. 접근성을 위한 aria-label을 포함합니다."
    >
      <StorySection title="Sizes">
        <StoryPreview>
          <div className="flex items-end gap-6">
            <div className="flex flex-col items-center gap-2">
              <Spinner size="xs" />
              <span className="text-xs text-muted-foreground">xs</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="sm" />
              <span className="text-xs text-muted-foreground">sm</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" />
              <span className="text-xs text-muted-foreground">md</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="lg" />
              <span className="text-xs text-muted-foreground">lg</span>
            </div>
          </div>
        </StoryPreview>
        <CodeBlock code={`<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`} />
      </StorySection>

      <StorySection title="색상" description="text color 클래스로 색상을 변경합니다.">
        <StoryPreview>
          <Spinner className="text-primary" />
          <Spinner className="text-destructive" />
          <Spinner className="text-emerald-500" />
          <Spinner className="text-purple-500" />
          <Spinner className="text-orange-500" />
        </StoryPreview>
        <CodeBlock code={`<Spinner className="text-primary" />
<Spinner className="text-destructive" />
<Spinner className="text-emerald-500" />`} />
      </StorySection>

      <StorySection title="Button과 조합">
        <StoryPreview>
          <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" disabled>
            <Spinner size="sm" />
            저장 중...
          </button>
        </StoryPreview>
        <CodeBlock code={`<Button disabled>
  <Spinner size="sm" className="mr-2" />
  저장 중...
</Button>`} />
      </StorySection>

      <StorySection title="Props">
        <PropsTable props={[
          { name: 'size', type: '"xs" | "sm" | "md" | "lg"', default: '"md"', description: '스피너 크기' },
          { name: 'label', type: 'string', default: '"로딩 중..."', description: '스크린리더용 aria-label' },
          { name: 'className', type: 'string', description: 'Tailwind text-color 클래스로 색상 변경' },
        ]} />
      </StorySection>
    </ShowcasePage>
  );
}

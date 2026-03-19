import type { Metadata } from 'next';
import { ShowcasePage, StorySection, StoryPreview, CodeBlock, PropsTable } from '@/components/showcase';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/atoms/Spinner';

export const metadata: Metadata = { title: 'Button' };

export default function ButtonShowcase() {
  return (
    <ShowcasePage
      title="Button"
      category="Atoms"
      description="shadcn/ui (base-ui) 기반 버튼 컴포넌트. variant, size, disabled, loading 상태를 지원합니다."
    >
      {/* 1. Variants */}
      <StorySection title="Variants" description="variant prop으로 버튼 스타일을 변경합니다.">
        <StoryPreview>
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </StoryPreview>
        <CodeBlock code={`<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`} />
      </StorySection>

      {/* 2. Sizes */}
      <StorySection title="Sizes" description="size prop으로 버튼 크기를 조절합니다.">
        <StoryPreview>
          <Button size="xs">XSmall</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">★</Button>
        </StoryPreview>
        <CodeBlock code={`<Button size="xs">XSmall</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">★</Button>`} />
      </StorySection>

      {/* 3. States */}
      <StorySection title="States" description="disabled, loading 상태입니다.">
        <StoryPreview>
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
          <Button>
            <Spinner size="sm" className="mr-2" />
            Loading...
          </Button>
        </StoryPreview>
        <CodeBlock code={`<Button disabled>Disabled</Button>

// Loading 상태는 Spinner atom을 조합합니다
<Button>
  <Spinner size="sm" className="mr-2" />
  Loading...
</Button>`} />
      </StorySection>

      {/* Props */}
      <StorySection title="Props">
        <PropsTable props={[
          { name: 'variant', type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"', default: '"default"', description: '버튼 스타일 변형' },
          { name: 'size', type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"', default: '"default"', description: '버튼 크기' },
          { name: 'disabled', type: 'boolean', default: 'false', description: '비활성화 상태' },
          { name: 'onClick', type: '() => void', description: '클릭 핸들러' },
        ]} />
      </StorySection>
    </ShowcasePage>
  );
}

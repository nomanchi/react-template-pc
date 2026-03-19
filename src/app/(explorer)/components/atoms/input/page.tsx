import type { Metadata } from 'next';
import { ShowcasePage, StorySection, StoryPreview, CodeBlock, PropsTable } from '@/components/showcase';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const metadata: Metadata = { title: 'Input' };

export default function InputShowcase() {
  return (
    <ShowcasePage
      title="Input"
      category="Atoms"
      description="텍스트 입력 컴포넌트. 단독 사용보다는 FormField Molecule과 함께 사용하는 것을 권장합니다."
    >
      <StorySection title="States" description="기본, 비활성, 에러 상태">
        <StoryPreview fullWidth className="max-w-sm">
          <div className="w-full space-y-4">
            <div className="space-y-1.5">
              <Label>기본 상태</Label>
              <Input placeholder="텍스트를 입력하세요" />
            </div>
            <div className="space-y-1.5">
              <Label>비활성화</Label>
              <Input placeholder="입력 불가" disabled />
            </div>
            <div className="space-y-1.5">
              <Label>에러 상태</Label>
              <Input placeholder="이메일을 입력하세요" aria-invalid="true" className="border-destructive focus-visible:ring-destructive/50" />
              <p className="text-xs text-destructive">올바른 이메일 형식이 아닙니다.</p>
            </div>
          </div>
        </StoryPreview>
        <CodeBlock code={`// 기본
<Input placeholder="텍스트를 입력하세요" />

// 비활성화
<Input disabled />

// ⚠️ 에러 상태는 FormField로 제어하는 것을 권장
<FormField
  label="이메일"
  name="email"
  register={register('email')}
  error={errors.email}
/>`} />
      </StorySection>

      <StorySection title="Types" description="input type별 예시">
        <StoryPreview fullWidth className="max-w-sm">
          <div className="w-full space-y-3">
            <Input type="text" placeholder="text" />
            <Input type="email" placeholder="email" />
            <Input type="password" placeholder="password" />
            <Input type="number" placeholder="number" />
            <Input type="search" placeholder="search" />
          </div>
        </StoryPreview>
        <CodeBlock code={`<Input type="text" placeholder="text" />
<Input type="email" placeholder="email" />
<Input type="password" placeholder="password" />
<Input type="number" placeholder="number" />`} />
      </StorySection>

      <StorySection title="Props">
        <PropsTable props={[
          { name: 'type', type: 'string', default: '"text"', description: 'HTML input type' },
          { name: 'placeholder', type: 'string', description: '플레이스홀더 텍스트' },
          { name: 'disabled', type: 'boolean', default: 'false', description: '비활성화 상태' },
          { name: 'aria-invalid', type: 'boolean', description: '에러 상태 표시 (aria)' },
        ]} />
      </StorySection>
    </ShowcasePage>
  );
}

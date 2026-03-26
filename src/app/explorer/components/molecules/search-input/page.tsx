import type { Metadata } from 'next';
import { ShowcasePage, StorySection, CodeBlock, PropsTable } from '@/components/showcase';
import { SearchInputDemo } from './_components/SearchInputDemo';

export const metadata: Metadata = { title: 'SearchInput' };

export default function SearchInputShowcase() {
  return (
    <ShowcasePage
      title="SearchInput"
      category="Molecules"
      description="검색어 입력과 debounce를 통합한 컴포넌트. 입력 후 일정 시간이 지나야 onSearch가 호출되어 불필요한 API 호출을 방지합니다."
    >
      <StorySection
        title="Live Demo"
        description="입력 후 300ms가 지나면 debounced 값이 업데이트됩니다. ✕ 버튼으로 초기화할 수 있습니다."
      >
        <SearchInputDemo />
        <CodeBlock code={`import { SearchInput } from '@/components/molecules';

<SearchInput
  placeholder="검색어를 입력하세요..."
  onSearch={(value) => {
    // debounce 후 호출됨 (기본 300ms)
    fetchResults(value);
  }}
  delay={300}
/>`} />
      </StorySection>

      <StorySection title="Props">
        <PropsTable props={[
          { name: 'onSearch', type: '(value: string) => void', required: true, description: 'debounce 후 호출되는 콜백' },
          { name: 'placeholder', type: 'string', default: '"검색..."', description: '플레이스홀더 텍스트' },
          { name: 'delay', type: 'number', default: '300', description: 'Debounce 지연 시간 (ms)' },
          { name: 'defaultValue', type: 'string', description: '초기 검색어' },
          { name: 'className', type: 'string', description: '추가 CSS 클래스' },
        ]} />
      </StorySection>
    </ShowcasePage>
  );
}

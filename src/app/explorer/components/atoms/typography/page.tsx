import type { Metadata } from 'next';
import { ShowcasePage, StorySection, StoryPreview, CodeBlock } from '@/components/showcase';
import { Typography } from '@/components/atoms/Typography';

export const metadata: Metadata = { title: 'Typography' };

export default function TypographyShowcase() {
  return (
    <ShowcasePage
      title="Typography"
      category="Atoms"
      description="시맨틱 타이포그래피 컴포넌트. as prop으로 HTML 태그를, variant로 스타일을 독립적으로 지정할 수 있습니다."
    >
      <StorySection title="모든 Variants" description="variant별 텍스트 스타일입니다.">
        <StoryPreview fullWidth>
          <Typography variant="h1">h1 — 최상위 제목</Typography>
          <Typography variant="h2">h2 — 섹션 제목</Typography>
          <Typography variant="h3">h3 — 서브 섹션</Typography>
          <Typography variant="h4">h4 — 카드 제목</Typography>
          <Typography variant="h5">h5 — 소제목</Typography>
          <Typography variant="h6">h6 — 최소 제목</Typography>
          <Typography variant="body">body — 일반 본문 텍스트입니다. 가독성을 위해 line-height가 넉넉합니다.</Typography>
          <Typography variant="body-sm">body-sm — 작은 본문 텍스트</Typography>
          <Typography variant="label">label — 폼 레이블 텍스트</Typography>
          <Typography variant="caption">caption — 부연 설명, 메타 정보</Typography>
          <Typography variant="overline">OVERLINE — 섹션 구분 레이블</Typography>
        </StoryPreview>
        <CodeBlock code={`<Typography variant="h1">제목</Typography>
<Typography variant="h3">소제목</Typography>
<Typography variant="body">일반 본문 텍스트</Typography>
<Typography variant="caption">부연 설명</Typography>
<Typography variant="overline">OVERLINE</Typography>`} />
      </StorySection>

      <StorySection title="as prop — 태그 분리" description="시각적 스타일(variant)과 HTML 태그(as)를 독립적으로 지정합니다.">
        <StoryPreview fullWidth>
          {/* h1 스타일이지만 p 태그 */}
          <Typography variant="h2" as="p">h2 스타일이지만 실제로는 &lt;p&gt; 태그</Typography>
          {/* span 태그지만 h4 스타일 */}
          <Typography variant="h4" as="span">h4 스타일이지만 &lt;span&gt; 태그</Typography>
        </StoryPreview>
        <CodeBlock code={`// 시각적 스타일과 HTML 태그를 분리
<Typography variant="h2" as="p">
  h2 스타일이지만 실제로는 p 태그
</Typography>`} />
      </StorySection>
    </ShowcasePage>
  );
}

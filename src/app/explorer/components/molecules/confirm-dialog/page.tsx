import type { Metadata } from 'next';
import { ShowcasePage, StorySection, CodeBlock, PropsTable } from '@/components/showcase';
import { ConfirmDialogDemo } from './_components/ConfirmDialogDemo';

export const metadata: Metadata = { title: 'ConfirmDialog' };

export default function ConfirmDialogShowcase() {
  return (
    <ShowcasePage
      title="ConfirmDialog"
      category="Molecules"
      description="사용자에게 동작을 확인받는 모달 다이얼로그. destructive variant로 위험한 동작을 강조할 수 있습니다."
    >
      <StorySection title="Default & Destructive" description="버튼을 클릭해 다이얼로그를 열어보세요.">
        <ConfirmDialogDemo />
        <CodeBlock code={`import { ConfirmDialog } from '@/components/molecules';

// 기본 확인 다이얼로그
<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="변경사항 저장"
  description="현재 변경사항을 저장하시겠습니까?"
  onConfirm={handleSave}
  trigger={<Button>저장</Button>}
/>

// 위험 동작 (destructive)
<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="계정 삭제"
  description="삭제된 계정은 복구할 수 없습니다. 계속하시겠습니까?"
  variant="destructive"
  confirmLabel="영구 삭제"
  onConfirm={handleDelete}
  trigger={<Button variant="destructive">삭제</Button>}
/>`} />
      </StorySection>

      <StorySection title="Props">
        <PropsTable props={[
          { name: 'open', type: 'boolean', required: true, description: '다이얼로그 열림 상태' },
          { name: 'onOpenChange', type: '(open: boolean) => void', required: true, description: '열림 상태 변경 핸들러' },
          { name: 'title', type: 'string', required: true, description: '다이얼로그 제목' },
          { name: 'description', type: 'string', required: true, description: '다이얼로그 설명' },
          { name: 'onConfirm', type: '() => void | Promise<void>', required: true, description: '확인 버튼 핸들러 (async 지원)' },
          { name: 'variant', type: '"default" | "destructive"', default: '"default"', description: '확인 버튼 스타일' },
          { name: 'confirmLabel', type: 'string', default: '"확인"', description: '확인 버튼 텍스트' },
          { name: 'cancelLabel', type: 'string', default: '"취소"', description: '취소 버튼 텍스트' },
          { name: 'trigger', type: 'ReactNode', description: '다이얼로그를 여는 트리거 노드' },
          { name: 'isLoading', type: 'boolean', default: 'false', description: '확인 처리 중 로딩 상태' },
        ]} />
      </StorySection>
    </ShowcasePage>
  );
}

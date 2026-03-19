'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { StoryPreview } from '@/components/showcase';

export function ConfirmDialogDemo() {
  const [defaultOpen, setDefaultOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);

  return (
    <StoryPreview>
      {/* 기본 */}
      <Button onClick={() => setDefaultOpen(true)}>기본 확인</Button>
      <ConfirmDialog
        open={defaultOpen}
        onOpenChange={setDefaultOpen}
        title="변경사항 저장"
        description="현재 작업한 내용을 저장하시겠습니까?"
        onConfirm={async () => {
          await new Promise((r) => setTimeout(r, 800));
          toast.success('저장되었습니다.');
        }}
      />

      {/* Destructive */}
      <Button variant="destructive" onClick={() => setDestructiveOpen(true)}>
        Destructive 확인
      </Button>
      <ConfirmDialog
        open={destructiveOpen}
        onOpenChange={setDestructiveOpen}
        title="계정을 삭제하시겠습니까?"
        description="삭제된 계정은 복구할 수 없습니다. 모든 데이터가 영구적으로 삭제됩니다."
        variant="destructive"
        confirmLabel="영구 삭제"
        onConfirm={() => { toast.error('삭제되었습니다. (데모)'); }}
      />

      {/* Loading */}
      <Button variant="outline" onClick={() => setLoadingOpen(true)}>
        Loading 상태 확인
      </Button>
      <ConfirmDialog
        open={loadingOpen}
        onOpenChange={setLoadingOpen}
        title="데이터 처리 중"
        description="이 작업은 2초가 걸립니다. 계속하시겠습니까?"
        onConfirm={async () => {
          await new Promise((r) => setTimeout(r, 2000));
          toast.success('처리 완료!');
        }}
      />
    </StoryPreview>
  );
}

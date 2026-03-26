'use client';

import { useState } from 'react';
import { SearchInput } from '@/components/molecules/SearchInput';
import { StoryPreview } from '@/components/showcase';
import { Badge } from '@/components/ui/badge';

export function SearchInputDemo() {
  const [value, setValue] = useState('');

  return (
    <StoryPreview fullWidth className="max-w-md space-y-4">
      {/* SearchInput: onChange로 debounce 제어 */}
      <SearchInput
        placeholder="검색어를 입력하세요..."
        onChange={setValue}
        value={value}
        debounce={300}
      />
      <div className="flex items-center gap-3 text-sm">
        <span className="text-muted-foreground">Debounced 값:</span>
        {value ? (
          <Badge variant="secondary">{value}</Badge>
        ) : (
          <span className="text-muted-foreground italic">입력 대기 중...</span>
        )}
      </div>
    </StoryPreview>
  );
}

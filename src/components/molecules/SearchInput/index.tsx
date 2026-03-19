/**
 * @파일 Molecule - SearchInput
 * @설명 debounce + clear 버튼이 포함된 검색창 컴포넌트.
 * @example
 *   <SearchInput
 *     value={search}
 *     onChange={setSearch}
 *     placeholder="사용자 검색..."
 *   />
 */

'use client';

import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks';
import { cn } from '@/lib/utils';
import { DEBOUNCE_DELAY } from '@/constants';

interface SearchInputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounce?: number;
  className?: string;
}

export function SearchInput({
  value = '',
  onChange,
  placeholder = '검색...',
  debounce = DEBOUNCE_DELAY,
  className,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, debounce);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className={cn('relative flex items-center', className)}>
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        className="pl-9 pr-9"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        aria-label="검색"
      />
      {localValue && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 h-7 w-7"
          onClick={() => {
            setLocalValue('');
            onChange('');
          }}
          aria-label="검색어 지우기"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}

/**
 * @파일 CodeBlock — 코드 스니펫 블록
 * @설명 syntax highlight 없이 깔끔한 pre/code 블록 + 복사 버튼
 */

'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = 'tsx', className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={cn('relative rounded-xl border bg-zinc-950 text-zinc-100', className)}>
      {/* 언어 뱃지 + 복사 버튼 */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <span className="text-xs font-mono text-zinc-500">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
          aria-label="코드 복사"
        >
          {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
          {copied ? '복사됨' : '복사'}
        </button>
      </div>
      {/* 코드 */}
      <pre className="overflow-x-auto px-4 py-4 text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

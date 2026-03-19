/**
 * @파일 PropsTable — Props 문서화 테이블
 */

interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: PropRow[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50 text-left">
            <th className="px-4 py-3 font-medium">Prop</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Default</th>
            <th className="px-4 py-3 font-medium">설명</th>
          </tr>
        </thead>
        <tbody>
          {props.map((row, i) => (
            <tr key={row.name} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
              <td className="px-4 py-3">
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                  {row.name}
                  {row.required && <span className="ml-0.5 text-destructive">*</span>}
                </code>
              </td>
              <td className="px-4 py-3">
                <code className="text-xs font-mono text-blue-600 dark:text-blue-400">{row.type}</code>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {row.default ? (
                  <code className="text-xs font-mono">{row.default}</code>
                ) : (
                  <span className="text-xs">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

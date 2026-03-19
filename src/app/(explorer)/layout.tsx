import { ExplorerLayout } from '@/components/templates/ExplorerLayout';

export default function ExplorerRootLayout({ children }: { children: React.ReactNode }) {
  return <ExplorerLayout>{children}</ExplorerLayout>;
}

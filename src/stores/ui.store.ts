/**
 * @파일 Zustand UI Store
 * @설명 전역 UI 상태 (사이드바, 모달, 테마 등)를 관리합니다.
 */

import { create } from 'zustand';

interface UiState {
  isSidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useUiStore = create<UiState>()((set) => ({
  isSidebarOpen: true,
  theme: 'system',

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setTheme: (theme) => set({ theme }),
}));

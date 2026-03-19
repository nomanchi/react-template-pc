/**
 * @파일 Mock 사용자 데이터
 */

import type { UserProfile } from '@/types';

export const MOCK_USER: UserProfile = {
  id: 'user-001',
  email: 'kim.developer@example.com',
  name: '김개발',
  role: 'admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  createdAt: '2024-01-15T09:00:00Z',
};

export const MOCK_USERS: UserProfile[] = [
  { id: 'u1', name: '김개발', email: 'kim@example.com', role: 'admin', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'u2', name: '이프론트', email: 'lee@example.com', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka', createdAt: '2024-02-10T00:00:00Z' },
  { id: 'u3', name: '박백엔드', email: 'park@example.com', role: 'user', createdAt: '2024-03-05T00:00:00Z' },
  { id: 'u4', name: '최디자인', email: 'choi@example.com', role: 'guest', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lulu', createdAt: '2024-04-20T00:00:00Z' },
  { id: 'u5', name: '정풀스택', email: 'jeong@example.com', role: 'admin', createdAt: '2024-05-01T00:00:00Z' },
];

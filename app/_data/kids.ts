export type ParentStatus = 'active' | 'pending';

export const PARENT_STATUS_LABEL: Record<ParentStatus, string> = {
  active: 'ACTIVA',
  pending: 'PENDIENTE',
};

export const PARENT_STATUS_BADGE: Record<
  ParentStatus,
  { bg: string; color: string }
> = {
  active: { bg: '#CFEBD8', color: '#3E9B6C' },
  pending: { bg: '#F7E7A6', color: '#9A7B1E' },
};

export interface LinkedParent {
  name: string;
  initial: string;
  role: string;
  status: ParentStatus;
  avatarBg: string;
  avatarColor: string;
}

export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function randomAvatarBg(): string {
  const colors = ['#A9D9E8', '#F4B8CC', '#B9DEC4', '#F4DC8E', '#C9B6E8'];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function randomAvatarColor(bg: string): string {
  const colorMap: Record<string, string> = {
    '#A9D9E8': '#1F7A93',
    '#F4B8CC': '#C44A7A',
    '#B9DEC4': '#3E8B62',
    '#F4DC8E': '#9A7B1E',
    '#C9B6E8': '#7B5FC0',
  };
  return colorMap[bg] ?? '#333333';
}

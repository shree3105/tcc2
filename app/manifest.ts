import type { MetadataRoute } from 'next';
import { practice } from '@/lib/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: practice.name,
    short_name: practice.name,
    description: `${practice.consultant.name} — ${practice.consultant.title}, Poole & Bournemouth`,
    start_url: '/',
    display: 'browser',
    background_color: '#faf9f6',
    theme_color: '#1f5a8f',
    icons: [{ src: '/favicon.ico', sizes: '64x64 32x32 24x24 16x16', type: 'image/x-icon' }],
  };
}

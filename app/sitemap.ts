import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/about', '/services', '/fees', '/patient-info', '/referrals', '/contact', '/book', '/privacy'];
  return pages.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}

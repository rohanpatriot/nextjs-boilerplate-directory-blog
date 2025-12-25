'use server';

import { getContent } from '@/lib/content/loader';
import { ContentItem } from '@/lib/content/types';

/**
 * Server action to fetch all content for search
 */
export async function getAllContentForSearch(): Promise<ContentItem[]> {
  try {
    const result = await getContent({ pageSize: 1000 });
    return result.items;
  } catch (error) {
    console.error('Failed to load content for search:', error);
    return [];
  }
}

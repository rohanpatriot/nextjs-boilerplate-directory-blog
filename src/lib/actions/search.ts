'use server';

import { getAllContentForSearch as getSearchContent } from '@/lib/content/loader';

/**
 * Server action to fetch all content for search (without full MDX content)
 * This returns all content items with only metadata, excluding the large content field
 */
export async function getAllContentForSearch() {
  try {
    return await getSearchContent();
  } catch (error) {
    console.error('Failed to load content for search:', error);
    return [];
  }
}

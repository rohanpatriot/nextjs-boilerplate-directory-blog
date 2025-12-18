"use client";

import { useState, useCallback } from 'react';
import { ContentItem } from '@/lib/content/types';
import { directoryConfig } from '@/config/directory.config';

export function useSearch(items: ContentItem[]) {
  const [searchResults, setSearchResults] = useState(items);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filterContent = useCallback((query: string, tags: string[]) => {
    const filtered = items.filter((item) => {
      const searchContent = `
        ${item.meta.title}
        ${item.meta.summary}
        ${item.meta.tags?.join(' ')}
      `.toLowerCase();

      const matchesSearch = searchContent.includes(query.toLowerCase());
      const matchesTags = tags.length === 0 ||
        tags.every(tag => item.meta.tags?.includes(tag));

      return matchesSearch && matchesTags;
    });
    setSearchResults(filtered);
  }, [items]);

  const handleSearch = useCallback((query: string) => {
    filterContent(query, selectedTags);
  }, [filterContent, selectedTags]);

  const handleTagSelect = useCallback((tags: string[]) => {
    setSelectedTags(tags);
    filterContent('', tags);
    setCurrentPage(1);
  }, [filterContent]);

  const itemsPerPage = directoryConfig.itemsPerPage || 9;
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const allTags = Array.from(new Set(
    items.flatMap(item => item.meta.tags || [])
  ));

  return {
    searchResults: paginatedResults,
    currentPage,
    setCurrentPage,
    selectedTags,
    handleSearch,
    handleTagSelect,
    totalPages,
    allTags,
  };
}

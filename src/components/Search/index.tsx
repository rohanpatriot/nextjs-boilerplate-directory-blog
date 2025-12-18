"use client";

import { ContentItem } from '@/lib/content/types';
import ContentGrid from '../layout/ContentGrid';
import TagFilter from '../TagFilter';
import Pagination from '../Pagination';
import SearchInput from './SearchInput';
import { useSearch } from './useSearch';

export default function Search({ items }: { items: ContentItem[] }) {
  const {
    searchResults,
    currentPage,
    setCurrentPage,
    selectedTags,
    handleSearch,
    handleTagSelect,
    totalPages,
    allTags,
  } = useSearch(items);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <SearchInput onSearch={handleSearch} />
        <TagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onChange={handleTagSelect}
        />
      </div>
      <ContentGrid items={searchResults} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

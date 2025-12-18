import { ContentConfig } from '@/lib/content/types';

export const contentConfig: ContentConfig = {
  contentRoot: 'content',

  defaults: {
    pageSize: 9,
    sortField: 'date',
    sortOrder: 'desc',
  },

  features: {
    search: true,
    tags: true,
    pagination: true,
  },

  types: {
    articles: {
      slug: 'articles',
      name: 'Article',
      namePlural: 'Articles',
      directory: 'articles',
      requiredFields: ['title'],
      features: {
        images: true,
        tags: true,
        search: true,
        pagination: true,
      },
      defaultSort: {
        field: 'date',
        order: 'desc',
      },
      card: {
        showImage: true,
        showSummary: true,
        showTags: true,
        showDate: true,
      },
      detail: {
        showImage: true,
        showTags: true,
        showDate: true,
        showAuthor: true,
      },
    },

    stories: {
      slug: 'stories',
      name: 'Story',
      namePlural: 'Stories',
      directory: 'stories',
      requiredFields: ['title', 'virtue'],
      features: {
        audio: true,
        images: true,
        tags: true,
        virtueCard: true,
      },
      defaultSort: {
        field: 'title',
        order: 'asc',
      },
      card: {
        showImage: true,
        showSummary: true,
      },
      detail: {
        showImage: true,
        showAudio: true,
        showVirtue: true,
      },
    },
  },
};

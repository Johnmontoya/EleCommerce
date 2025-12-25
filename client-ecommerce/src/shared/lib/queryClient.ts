import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 1 minuto
      gcTime: 10 * 60 * 1000, // 1 minuto
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true
    },
    mutations: {
      retry: 1,
    },
  },
});

export const queryKeys = {
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters?: Record<string, any>) =>
      [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
    bySlug: (slug: string) => [...queryKeys.products.all, 'slug', slug] as const,
    byCategory: (category: string) => [...queryKeys.products.all, 'category', category] as const,
    byBrand: (brand: string) => [...queryKeys.products.all, 'brand', brand] as const,
    search: (term: string) => [...queryKeys.products.all, 'search', term] as const,
  },
  showcase: {
    all: ['showcase'] as const,
    banner: (limit?: number) => [...queryKeys.showcase.all, 'banner', limit] as const,
    featured: (limit?: number) => [...queryKeys.showcase.all, 'featured', limit] as const,
    promotional: (limit?: number) => [...queryKeys.showcase.all, 'promotional', limit] as const,
    section: (section: string, limit?: number) =>
      [...queryKeys.showcase.all, section, limit] as const,
  },
  categories: {
    all: ['categories'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.categories.all, 'list', filters] as const,
    detail: (id: string) => [...queryKeys.categories.all, 'detail', id] as const,
    bySlug: (slug: string) => [...queryKeys.categories.all, 'slug', slug] as const,
  },
  user: {
    all: ['users'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.user.all, 'list', filters] as const,
    detail: (id: string) => [...queryKeys.user.all, 'detail', id] as const,
  },
};
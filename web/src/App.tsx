
import { QueryBar } from '@/components/query-bar';
import { RepoRow } from '@/components/repo-row';
import type { QueryFilter } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { type MinimalRepository } from './types/repo';

const PER_PAGE = 30;

type RepoPage = {
  items: MinimalRepository[];
  total_count: number;
};

export default function App() {
  const [filters, _setFilters] = useState<QueryFilter[]>([])
  const sentinelRef = useRef<HTMLDivElement>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery<RepoPage>({
    queryKey: ["repos"],
    queryFn: async ({ pageParam }) => {
      const url = new URL(`${import.meta.env.VITE_SERVER_URL}/repos`)
      url.searchParams.set('page', String(pageParam))
      const res = await fetch(url)
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.reduce((sum, page) => sum + page.items.length, 0)
      const cap = Math.min(lastPage.total_count, 1000)
      if (totalLoaded >= cap || lastPage.items.length < PER_PAGE) return undefined
      return allPages.length + 1
    },
  })

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const repos = data?.pages.flatMap(p => p.items) ?? []
  const totalCount = data?.pages[0]?.total_count

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background text-foreground">

      <QueryBar
        filters={filters}
        resultCount={totalCount}
      />

      {/* Results list */}
      <div className="flex-1 overflow-y-auto">
        {isPending
          ? Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="px-5 md:px-10 py-4 md:py-5 border-b border-border animate-pulse">
                <div className="flex justify-between items-baseline mb-2">
                  <div className="h-[13px] bg-muted rounded w-48" />
                  <div className="h-[12px] bg-muted rounded w-16 ml-4" />
                </div>
                <div className="h-[12px] bg-muted rounded w-16 ml-[22px] mb-1.5" />
                <div className="h-[13px] bg-muted rounded w-3/4 ml-[22px]" />
              </div>
            ))
          : repos.map((repo, i) => (
              <RepoRow key={repo.id} repo={repo} rank={i + 1} />
            ))
        }

        <div ref={sentinelRef} className="text-[11px] md:text-[12px] text-[#454549] py-5 text-center">
          {isFetchingNextPage ? '┄ loading more ┄' : hasNextPage ? '' : repos.length > 0 ? '┄ end ┄' : ''}
        </div>
      </div>
    </div>
  );
}

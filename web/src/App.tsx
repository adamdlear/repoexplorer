
import { QueryBar } from '@/components/query-bar';
import { RepoRow } from '@/components/repo-row';
import type { QueryFilter } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { type MinimalRepository } from './types/repo';

export default function App() {
  const [filters, _setFilters] = useState<QueryFilter[]>([])

  const res = useQuery<MinimalRepository[]>({
    queryKey: ["repos"],
    queryFn: async () => {
      const url = new URL(`${import.meta.env.VITE_SERVER_URL}/repos`)
      const res = await fetch(url)
      const data = await res.json();
      console.log(data.items)
      return data.items;
    }
  })

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background text-foreground">

      <QueryBar
        filters={filters}
        resultCount={1284}
      />

      {/* Results list */}
      <div className="flex-1 overflow-y-auto">
        {res.data && res.data.map((repo, i) => (
          <RepoRow key={repo.id} repo={repo} rank={i + 1} />
        ))}
        <div className="text-[11px] md:text-[12px] text-[#454549] py-5 text-center">
          ┄ loading more ┄
        </div>
      </div>
    </div>
  );
}

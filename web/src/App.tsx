
import { QueryBar } from '@/components/query-bar';
import { RepoRow } from '@/components/repo-row';
import type { QueryFilter } from '@/types';
import { type MinimalRepository } from './types/repo';
import { useQuery } from '@tanstack/react-query';
const MOCK_FILTERS: QueryFilter[] = [
  { flag: 'lang', value: 'rust' },
  { flag: 'since', value: 'day' },
  { flag: 'min', value: '1k' },
  { flag: 'sort', value: 'stars-gained' },
];

export default function App() {
  const res = useQuery<MinimalRepository[]>({
    queryKey: ["repos"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/repos`)
      const data = await res.json();
      return data
    }
  })

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background text-foreground">

      <QueryBar
        filters={MOCK_FILTERS}
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

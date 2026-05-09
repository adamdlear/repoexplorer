import { QueryBar } from '@/components/query-bar';
import { RepoRow } from '@/components/repo-row';
import type { QueryFilter, Repo } from '@/types';

const MOCK_REPOS: Repo[] = [
  {
    name: 'ollama',
    owner: 'ollama',
    description: 'Get up and running with Llama 3, Mistral, Gemma, and other large language models locally.',
    language: 'Go',
    languageColor: '#00ADD8',
    stars: 88421,
    starsGained: 1240,
  },
  {
    name: 'next.js',
    owner: 'vercel',
    description: 'The React Framework for the Web — server rendering, routing, image optimization.',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 124532,
    starsGained: 412,
  },
  {
    name: 'transformers',
    owner: 'huggingface',
    description: 'State-of-the-art Machine Learning for Pytorch, TensorFlow, and JAX.',
    language: 'Python',
    languageColor: '#3572A5',
    stars: 138204,
    starsGained: 980,
  },
  {
    name: 'rust',
    owner: 'rust-lang',
    description: 'Empowering everyone to build reliable and efficient software.',
    language: 'Rust',
    languageColor: '#dea584',
    stars: 96112,
    starsGained: 230,
  },
  {
    name: 'llama.cpp',
    owner: 'ggerganov',
    description: 'LLM inference in C/C++. Plain C, no dependencies, runs on CPU.',
    language: 'C++',
    languageColor: '#f34b7d',
    stars: 71820,
    starsGained: 1640,
  },
  {
    name: 'supabase',
    owner: 'supabase',
    description: 'The open source Firebase alternative — Postgres, auth, realtime, storage.',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 75944,
    starsGained: 311,
  },
  {
    name: 'deno',
    owner: 'denoland',
    description: 'A modern runtime for JavaScript and TypeScript.',
    language: 'Rust',
    languageColor: '#dea584',
    stars: 94552,
    starsGained: 188,
  },
  {
    name: 'ui',
    owner: 'shadcn',
    description: 'Beautifully designed components that you can copy and paste into your apps.',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 74440,
    starsGained: 720,
  },
  {
    name: 'zed',
    owner: 'zed-industries',
    description: 'A high-performance, multiplayer code editor from the creators of Atom and Tree-sitter.',
    language: 'Rust',
    languageColor: '#dea584',
    stars: 47301,
    starsGained: 612,
  },
];

const MOCK_FILTERS: QueryFilter[] = [
  { flag: 'lang', value: 'rust' },
  { flag: 'since', value: 'day' },
  { flag: 'min', value: '1k' },
  { flag: 'sort', value: 'stars-gained' },
];

export default function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background text-foreground">

      <QueryBar
        filters={MOCK_FILTERS}
        resultCount={1284}
      />

      {/* Results list */}
      <div className="flex-1 overflow-y-auto">
        {MOCK_REPOS.map((repo, i) => (
          <RepoRow key={repo.name} repo={repo} rank={i + 1} />
        ))}
        <div className="text-[11px] md:text-[12px] text-[#454549] py-5 text-center">
          ┄ loading more ┄
        </div>
      </div>
    </div>
  );
}

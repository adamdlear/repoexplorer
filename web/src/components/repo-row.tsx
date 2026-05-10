import type { MinimalRepository } from "@/types/repo";


type RepoRowProps = {
  repo: MinimalRepository;
  rank: number;
};

function formatStarCount(n: number): string {
  if (n >= 10000) return `${Math.round(n / 1000)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function RepoRow({ repo, rank }: RepoRowProps) {
  return (
    <div className="px-5 md:px-10 py-4 md:py-5 border-b border-border">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-[13px] md:text-sm">
          <span className="text-[#454549]">{String(rank).padStart(2, '0')} </span>
          <span className="text-muted-foreground">{repo.owner.name}/</span>
          <span className="text-primary font-bold">{repo.name}</span>
        </span>
        <span className="text-[12px] shrink-0 ml-4">
          <span className="text-primary mr-0.5">*</span>
          {formatStarCount(repo.stargazers_count)}{' '}
          <span className="text-muted-foreground">+{repo.stargazers_count}</span>
        </span>
      </div>

      <div className="text-[12px] text-muted-foreground ml-[22px] mb-1.5 flex items-center gap-1.5">
        <span
          className="inline-block w-[7px] h-[7px] rounded-full shrink-0"
          style={{ background: repo.language }}
        />
        {repo.language && repo.language.toLowerCase()}
      </div>

      <p className="text-[13px] md:text-[14px] ml-[22px] text-[#c4c4c8] leading-relaxed">
        {repo.description}
      </p>
    </div>
  );
}

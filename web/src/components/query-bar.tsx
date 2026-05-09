import { QueryToken } from '@/components/query-token';
import type { QueryFilter } from '@/types';

type QueryBarProps = {
  filters: QueryFilter[];
  activeFlag?: string | null;
  resultCount?: number;
  onTokenClick?: (flag: string) => void;
  onAddFlag?: () => void;
};

export function QueryBar({ filters, activeFlag, resultCount, onTokenClick, onAddFlag }: QueryBarProps) {
  return (
    <div className="px-5 md:px-10 pt-5 pb-4 border-b border-border shrink-0">
      {/* Breadcrumb — visible on mobile only; desktop shows it in the title bar */}
      <div className="text-[11px] text-muted-foreground mb-2">~/repoexplorer</div>

      <div className="text-[14px] md:text-base leading-relaxed flex flex-wrap items-baseline gap-x-1.5">
        <span className="text-primary">$</span>
        <span>repoexplorer</span>
        {filters.map((f) => (
          <QueryToken
            key={f.flag}
            flag={`--${f.flag}=`}
            value={f.value}
            active={activeFlag === f.flag}
            onClick={() => onTokenClick?.(f.flag)}
          />
        ))}
        <QueryToken isEmpty onClick={onAddFlag} />
      </div>

      {resultCount !== undefined && (
        <div className="text-[11px] md:text-[12px] text-muted-foreground mt-3">
          {resultCount.toLocaleString()} results · sort * gained
          <span className="hidden md:inline">
            {' '}· <span className="text-[#9b9ba0]">tap any flag to edit</span>
          </span>
        </div>
      )}
    </div>
  );
}

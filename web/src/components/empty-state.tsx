import type { QueryFilter } from '@/types';

type EmptyStateProps = {
  dropSuggestions?: QueryFilter[];
  onDropFilter?: (flag: string) => void;
};

export function EmptyState({ dropSuggestions = [], onDropFilter }: EmptyStateProps) {
  return (
    <div className="flex-1 px-6 py-10 flex flex-col justify-center">
      <div className="text-[36px] text-primary mb-2.5 leading-none">∅</div>
      <div className="text-[13px] mb-2">no repos match.</div>
      <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">
        try lowering <span className="text-foreground">--min</span>, broadening{' '}
        <span className="text-foreground">--since</span>, or removing{' '}
        <span className="text-foreground">--lang</span>.
      </p>
      {dropSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {dropSuggestions.map((f) => (
            <button
              key={f.flag}
              onClick={() => onDropFilter?.(f.flag)}
              className="px-2.5 py-1 border border-dashed border-[#2c2c30] text-muted-foreground text-[11px] hover:border-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              drop --{f.flag} ✕
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

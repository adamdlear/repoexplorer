import { cn } from '@/lib/utils';

type QueryTokenProps = {
  flag?: string;
  value?: string;
  active?: boolean;
  isEmpty?: boolean;
  onClick?: () => void;
};

export function QueryToken({ flag, value, active = false, isEmpty = false, onClick }: QueryTokenProps) {
  if (isEmpty) {
    return (
      <button
        onClick={onClick}
        className="px-2 py-0.5 border border-dashed border-[#2c2c30] text-[#454549] text-[length:inherit] hover:text-muted-foreground hover:border-muted-foreground transition-colors cursor-pointer"
      >
        + flag
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'px-1 py-0.5 border-b text-[length:inherit] cursor-pointer transition-colors',
        active
          ? 'border-primary bg-[#1a1f1c]'
          : 'border-transparent hover:border-[#454549]'
      )}
    >
      {flag && <span className="text-muted-foreground">{flag}</span>}
      <span className={active ? 'text-primary' : 'text-foreground'}>{value}</span>
    </button>
  );
}

import { cn } from '@/lib/utils';

const LANGUAGES = [
  'any', 'rust', 'typescript', 'python', 'go',
  'c++', 'javascript', 'swift', 'zig', 'kotlin', 'ruby', 'elixir',
];

type LanguagePickerProps = {
  selected: string;
  onSelect: (lang: string) => void;
  onCancel: () => void;
  onApply: () => void;
  /** inline: full-width panel below query bar (mobile). popover: floating box anchored to token (desktop). */
  variant?: 'inline' | 'popover';
  className?: string;
};

export function LanguagePicker({
  selected,
  onSelect,
  onCancel,
  onApply,
  variant = 'inline',
  className,
}: LanguagePickerProps) {
  return (
    <div
      className={cn(
        'bg-[#121215] p-3.5',
        variant === 'inline'
          ? 'border-b border-border shrink-0'
          : 'absolute z-10 w-[360px] border border-primary shadow-[0_18px_40px_rgba(0,0,0,0.7)]',
        className
      )}
    >
      <div className="text-[11px] text-muted-foreground tracking-widest mb-2 uppercase">
        Set --lang
      </div>

      <div className="mb-2.5 px-2.5 py-1.5 border border-dashed border-[#2c2c30] text-[13px] text-muted-foreground cursor-text">
        /&nbsp; filter languages…
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {LANGUAGES.map((lang) => (
          <button
            key={lang}
            onClick={() => onSelect(lang)}
            className={cn(
              'px-2.5 py-1 text-[12px] border transition-colors cursor-pointer',
              lang === selected
                ? 'border-primary text-primary'
                : 'border-[#2c2c30] text-[#9b9ba0] hover:border-muted-foreground hover:text-muted-foreground'
            )}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="flex justify-between text-[12px]">
        <button
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          {variant === 'popover' ? 'esc to cancel' : 'cancel'}
        </button>
        <button
          onClick={onApply}
          className="text-primary hover:opacity-80 transition-opacity cursor-pointer"
        >
          apply ↵
        </button>
      </div>
    </div>
  );
}

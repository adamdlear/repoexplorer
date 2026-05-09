export type Filter = {
  flag: string;
  value: string;
}

type RepoFilterProps = {
  filters: Filter[];
}

export function RepoFilter({ filters }: RepoFilterProps) {
  return (
    <div className="flex gap-3">
      <span className="text-primary">$</span>
      <span>repoexplorer</span>
      {filters.map((f) => (
        <div key={f.flag}>
          <span className="text-muted-foreground">{`--${f.flag}=`}</span>
          <span>{`${f.value}`}</span>
        </div>
      ))}
    </div>
  )
}

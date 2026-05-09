import { useState } from 'react'
import { RepoFilter, type Filter } from './components/repo-filter'

function App() {
  const [filters, setFilters] = useState<Filter[]>([{ flag: "lang", value: "rust" }, { flag: "since", value: "day" }])

  return (
    <RepoFilter filters={filters} />
  )
}

export default App

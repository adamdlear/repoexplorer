export type Repo = {
  name: string;
  owner: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  starsGained: number;
};

export type QueryFilter = {
  flag: string;
  value: string;
};

export interface Proposal {
  id: string;
  votes: number;
  start: number;
  end: number;
}

export interface Space {
  id: string;
  votesCount: number;
  categories: string[]
}

export interface ListSpacesGqlValues {
  first: number; 
  skip: number;
}
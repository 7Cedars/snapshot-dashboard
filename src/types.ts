export interface Proposal {
  id: string;
  space: OnlyNameSpace; 
  votes: number;
  start: number;
  end: number;
}

export interface Space {
  id: string;
  votesCount: number;
  categories: string[];
}

export interface Voter {
  voter: string;
  space: OnlyNameSpace;
  proposal: OnlyIdProposal; 
}

export interface ListSpacesGqlValues {
  first: number; 
  skip: number;
}

export type OnlyNameSpace = Omit<Space, 'votesCount' | 'categories'>;
export type OnlyIdProposal = Omit<Proposal, 
  | 'space' | 'categories' | 'votes' | 'start' | 'end' 
  >;

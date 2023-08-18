export interface Proposal {
  id: string;
  space: OnlyNameSpace; 
  totalVotes: number;
  votesLoaded: boolean;
  votes: Vote[]; 
  start: number;
  end: number;
}

export interface Space {
  id: string;
  votesCount: number;
  categories: string[];
}

export interface Vote {
  proposal: OnlyIdProposal; 
  voter: string;
  created: number;
}

export interface TimeRange {
  startDate: number;
  endDate: number
}
export interface ProposalsInSpace {
  spaceId: string;
  proposals: Proposal[];
}

export interface VotersInSpace {
  SpaceId: string;
  votersIds: string[];
}


export interface ListSpacesGqlValues {
  first: number; 
  skip: number;
}

export type OnlyNameSpace = Omit<Space, 'votesCount' | 'categories'>;
export type OnlyIdProposal = Omit<Proposal, 
  | 'space' | 'categories' | 'votes' | 'start' | 'end' 
  >;

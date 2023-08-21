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
export interface UserInputState {
  urlData: string; 
  selectedSpaces: string[];
  startDate: number; 
  endDate: number; 
}

export interface ProposalsInSpace {
  spaceId: string;
  proposals: Proposal[];
}

export type Node = {
  id: number;
  name: string;
}

export type Link = {
  source: number; 
  target: number;
}

export type Notification = {
  id: string;
  message: string; 
  type: string;
}

export type UrlDataPayload= {
  data: string
  type: 'space' | 'startDate' | 'endDate'
}

export interface NetworkGraph {
  nodes: Node[];
  links: Link[];
}

export interface ListSpacesGqlValues {
  first: number; 
  skip: number;
}

export type OnlyNameSpace = Omit<Space, 'votesCount' | 'categories'>;
export type NotificationWithoutId = Omit<Notification, 'id' >;
export type OnlyIdProposal = Omit<Proposal, 
  | 'space' | 'categories' | 'votes' | 'start' | 'end' 
  >;

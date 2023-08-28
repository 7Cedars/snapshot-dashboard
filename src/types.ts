import * as d3 from 'd3';

export interface Proposal {
  id: string;
  space: OnlyNameSpace; 
  votes: number;
  votesLoaded: boolean;
  votesDetails: Vote[]; 
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
  selectedSpaces: string[];
  startDate: number; 
  endDate: number; 
  modal: 'about' | 'settings' | 'savedSearches' | 'none'; 
  settings: {
    darkMode: boolean | undefined; 
    developerMode: boolean | undefined; 
  }
}

export interface ProposalsInSpace {
  spaceId: string;
  proposals: Proposal[];
}

export interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
}

export interface Link extends d3.SimulationLinkDatum<Node> {
  source: Node | number | string; 
  target: Node | number | string; 
}

export type Notification = {
  id: string;
  message: string; 
  type: string;
}

export type Data = {
  nodes: Node[];
  links: Link[];
};

export type UrlDataPayload= {
  data: string;
  type: 'space' | 'startDate' | 'endDate';
}

// export interface NetworkGraph {
//   nodes: Node[];
//   links: Link[];
// }

export interface ListSpacesGqlValues {
  first: number; 
  skip: number;
}

export type OnlyNameSpace = Omit<Space, 'votesCount' | 'categories'>;
export type NotificationWithoutId = Omit<Notification, 'id' >;
export type OnlyIdProposal = Omit<Proposal, 
  | 'space' | 'categories' | 'votes' | 'start' | 'end' 
  >;

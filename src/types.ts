export interface Space {
  id: number;
  votesCount: number;
  categories: string[]
}

export interface ListSpacesGqlValues {
  first: number; 
  skip: number;
}
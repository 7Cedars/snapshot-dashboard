import { gql } from '@apollo/client'

const SPACE_DETAILS = gql`
  fragment SpaceDetails on Space {
    id
    votesCount
    categories
  }
`

export const LIST_SPACES = gql`
  query listSpaces($first: Int!, $skip:Int!){
    spaces(
      first: $first,
      skip: $skip,
      orderBy: "created",
      orderDirection: asc
    ) {
      ...SpaceDetails 
    }
  }
  ${SPACE_DETAILS}
`
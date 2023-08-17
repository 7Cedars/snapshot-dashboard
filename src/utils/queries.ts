import { gql } from '@apollo/client'

const SPACE_DETAILS = gql`
  fragment SpaceDetails on Space {
    id
    votesCount
    categories
  }
`

const PROPOSAL_DETAILS = gql`
  fragment ProposalDetails on Proposal {
    id
    space {
      id
    }
    votes
    start
    end
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

export const PROPOSALS_FROM_SPACE = gql`
  query proposalsFromSpace($first: Int!, $skip:Int!, $space:String!){
    proposals(
      first: $first,
      skip: $skip,
      where: {
        space: $space,
        state: "closed"
      },
      orderBy: "created",
      orderDirection: asc
    ) {
      ...ProposalDetails 
    }
  }
  ${PROPOSAL_DETAILS}
`

export const VOTERS_ON_PROPOSALS = gql`
  query votersOnProposals($first: Int!, $proposal_in:[String!]!){
    votes (
      first: $first, 
      where: {
        proposal_in: $proposal_in
      }
    ) {
      voter
      proposal {
        id
      }
      space {
        id
      }
    }
  }
`
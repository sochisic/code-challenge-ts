import { gql } from 'apollo-boost';

export interface UserData {
  user: {
    name: string;
    bio: string;
    avatarUrl: string;
    company: string;
    location: string;
    followers: {
      totalCount: number;
    },
    gists: {
      totalCount: number;
    }
    repositories: {
      totalCount: number;
    }
  }
}

export interface UserVariables {
  user: string;
}

export const GET_USER = gql`
  query user($user: String!) {
    user(login: $user) {
      name
      bio
      avatarUrl
      company
      location
      followers {
       totalCount
      }
      gists {
        totalCount
      }
      repositories {
        totalCount
      }
    }
  }
`
export type TextMatches = {
  fragment: string;
  property: string;
}

export type Matches = {
  textMatches: TextMatches[];
}

export interface UsersData {
  search: {
    userCount: Number;
    edges: Matches[]
  }
}

export interface UsersVariables {
  inputValue: string | null;
}

export const SEARCH_USERS = gql`
  query users($inputValue: String!) {
    search(first: 10, query: $inputValue, type: USER) {
      userCount
      edges {
        textMatches {
          fragment
          property
      }
    }
  }
  }
`

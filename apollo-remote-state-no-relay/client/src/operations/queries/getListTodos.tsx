import { gql } from "@apollo/client";

export const GET_LIST_TODOS = gql`
  query GetListTodos {
    todos(listId: "important") {
      id
      text
      completed
      listId
    }
  }
`;

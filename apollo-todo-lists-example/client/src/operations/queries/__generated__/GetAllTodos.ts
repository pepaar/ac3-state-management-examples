/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllTodos
// ====================================================

export interface GetAllTodos_todos {
  __typename: "Todo";
  id: number;
  text: string;
  completed: boolean;
  listId: string | null;
}

export interface GetAllTodos {
  todos: GetAllTodos_todos[];
}

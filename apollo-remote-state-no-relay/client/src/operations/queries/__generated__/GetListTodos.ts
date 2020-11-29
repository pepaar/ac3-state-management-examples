/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetListTodos
// ====================================================

export interface GetListTodos_todos {
  __typename: "Todo";
  id: number;
  text: string;
  completed: boolean;
  listId: string | null;
}

export interface GetListTodos {
  todos: GetListTodos_todos[];
}

import { gql, useMutation } from "@apollo/client";
import * as EditTodoTypes from "./__generated__/EditTodo";
import { GetListTodos } from "../queries/__generated__/GetListTodos";
import { GET_LIST_TODOS } from "../queries/getListTodos";

export const EDIT_TODO = gql`
  mutation EditTodo($id: Int!, $text: String!, $listId: String) {
    editTodo(id: $id, text: $text, listId: $listId) {
      success
      todo {
        id
        text
        completed
        listId
      }
      error {
        ... on TodoNotFoundError {
          message
        }
        ... on TodoValidationError {
          message
        }
      }
    }
  }
`;

export function useEditTodo() {
  const [mutate, { data, error }] = useMutation<EditTodoTypes.EditTodo, EditTodoTypes.EditTodoVariables>(EDIT_TODO, {
    update: (cache, response) => {
      // Add to important list if needed

      const updatedTodoFromResponse = response.data?.editTodo.todo;

      let existingImportantTodos: GetListTodos | null = null;
      try {
        existingImportantTodos = cache.readQuery<GetListTodos>({
          query: GET_LIST_TODOS,
        });
      } catch (error) {
        // no data in the cache
      }

      if (updatedTodoFromResponse && existingImportantTodos) {
        // Add only if it's important and not in the list
        if (
          updatedTodoFromResponse.listId === "important" &&
          existingImportantTodos.todos.every((todo) => todo.id !== updatedTodoFromResponse.id)
        ) {
          cache.writeQuery({
            query: GET_LIST_TODOS,
            data: {
              todos: [...existingImportantTodos.todos, updatedTodoFromResponse],
            },
          });
        }
      }
    },
  });

  return { mutate, data, error };
}

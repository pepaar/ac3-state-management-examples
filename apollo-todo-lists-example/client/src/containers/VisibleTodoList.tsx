import React from "react";
import { visibilityFilterVar } from "../cache";
import TodoList from "../components/TodoList";
import { VisibilityFilter, VisibilityFilters } from "../models/VisibilityFilter";
import { Todo, Todos } from "../models/Todos";
import { useQuery } from "@apollo/client";
import { GetAllTodos } from "../operations/queries/__generated__/GetAllTodos";
import { GET_ALL_TODOS } from "../operations/queries/getAllTodos";
import { useCompleteTodo } from "../operations/mutations/completeTodo";
import { useDeleteTodo } from "../operations/mutations/deleteTodo";
import { useEditTodo } from "../operations/mutations/editTodo";

function filterTodosByVisibility(visibilityFilter: VisibilityFilter, todos: Todos) {
  switch (visibilityFilter.id) {
    case VisibilityFilters.SHOW_ALL.id:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED.id:
      return todos.filter((t) => t.completed);
    case VisibilityFilters.SHOW_ACTIVE.id:
      return todos.filter((t) => !t.completed);
    default:
      throw new Error("Unknown filter: " + visibilityFilter);
  }
}

export default function VisibleTodoList() {
  const { mutate: completeTodo } = useCompleteTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: editTodo } = useEditTodo();

  const { loading: isTodosLoading, data, error: todosError } = useQuery<GetAllTodos>(GET_ALL_TODOS);

  if (isTodosLoading) return <div>Loading...</div>;
  if (todosError) return <div>An error occurred {JSON.stringify(todosError)}</div>;
  if (!data) return <div>None</div>;

  const filteredTodos = filterTodosByVisibility(visibilityFilterVar(), data.todos as Todos);

  return (
    <TodoList
      filteredTodos={filteredTodos}
      actions={{
        completeTodo: (id: number) => completeTodo({ variables: { id } }),
        deleteTodo: (todo: Todo) =>
          deleteTodo({
            variables: { id: todo.id },
            // Example of optimistic response
            optimisticResponse: {
              deleteTodo: {
                __typename: "DeleteTodoResult",
                todo: { ...todo },
                success: true,
                error: null,
              },
            },
          }),
        editTodo: (id: number, text: string, listId?: string) => editTodo({ variables: { id, text, listId } }),
      }}
    />
  );
}

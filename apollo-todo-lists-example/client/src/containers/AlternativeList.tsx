import React from "react";
import TodoList from "../components/TodoList";
import { useQuery } from "@apollo/client";
import { GetAllTodos } from "../operations/queries/__generated__/GetAllTodos";
import { GET_ALL_TODOS } from "../operations/queries/getAllTodos";
import { useCompleteTodo } from "../operations/mutations/completeTodo";
import { useDeleteTodo } from "../operations/mutations/deleteTodo";
import { useEditTodo } from "../operations/mutations/editTodo";
import { Todo } from "../models/Todos";

export default function AlternativeList() {
  const { mutate: completeTodo } = useCompleteTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: editTodo } = useEditTodo();

  const { loading: isTodosLoading, data, error: todosError } = useQuery<GetAllTodos>(GET_ALL_TODOS);

  if (isTodosLoading) return <div>Loading...</div>;
  if (todosError) return <div>An error occurred {JSON.stringify(todosError)}</div>;
  if (!data) return <div>None</div>;

  return (
    <>
      <div style={{ padding: 12, fontSize: 17 }}>Alternative list - Showing ALL</div>
      <TodoList
        filteredTodos={data.todos}
        actions={{
          completeTodo: (id: number) => completeTodo({ variables: { id } }),
          deleteTodo: (todo: Todo) => deleteTodo({ variables: { id: todo.id } }),
          editTodo: (id: number, text: string) => editTodo({ variables: { id, text } }),
        }}
      />
    </>
  );
}

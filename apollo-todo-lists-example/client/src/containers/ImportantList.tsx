import React from "react";
import TodoList from "../components/TodoList";
import { useQuery } from "@apollo/client";
import { useCompleteTodo } from "../operations/mutations/completeTodo";
import { useDeleteTodo } from "../operations/mutations/deleteTodo";
import { useEditTodo } from "../operations/mutations/editTodo";
import { GetListTodos } from "../operations/queries/__generated__/GetListTodos";
import { GET_LIST_TODOS } from "../operations/queries/getListTodos";
import { Todo } from "../models/Todos";

export default function ImportantList() {
  const { mutate: completeTodo } = useCompleteTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: editTodo } = useEditTodo();

  const { loading: isTodosLoading, data, error: todosError } = useQuery<GetListTodos>(GET_LIST_TODOS, {
    fetchPolicy: "cache-and-network",
  });

  return (
    <>
      <div style={{ padding: 12, fontSize: 17 }}>Important List</div>
      <TodoList
        filteredTodos={data?.todos ?? []}
        actions={{
          completeTodo: (id: number) => completeTodo({ variables: { id } }),
          deleteTodo: (todo: Todo) => deleteTodo({ variables: { id: todo.id } }),
          editTodo: (id: number, text: string) => editTodo({ variables: { id, text } }),
        }}
      />
      {isTodosLoading && <div>Loading...</div>}
      {todosError && <div>An error occurred {JSON.stringify(todosError)}</div>}
    </>
  );
}

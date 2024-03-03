"use client";

import React from "react";
import { TodoListItem } from "./todo-list-item";
import useTodoStore, { StatusTypes } from "@/stores/todos-store";

export const TodoList = ({ status }: { status: StatusTypes }) => {
  const todos = useTodoStore((state) => state.filteredTodos(status));
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);

  return (
    <>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          title={todo.title}
          completed={todo.completed}
          onToggle={() => toggleTodo(todo.id)}
          onUpdate={(value: string) => updateTodo(todo.id, value)}
        />
      ))}
    </>
  );
};

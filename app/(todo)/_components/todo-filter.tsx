"use client";
import useTodoStore, { StatusTypes } from "@/stores/todos-store";
import classNames from "classnames";
import Link from "next/link";
import React from "react";

export const TodoFilter = ({ status }: { status: StatusTypes }) => {
  const activeCount = useTodoStore((state) => state.activeCount());
  const todos = useTodoStore((state) => state.todos);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  return (
    <div className="flex justify-between items-center text-gray-500 px-4 py-2 text-">
      <div className="">
        {activeCount} item{activeCount !== 1 ? "s" : ""} left
      </div>
      <div className="space-x-2">
        <Link
          href="/"
          className={classNames({
            "font-semibold": status === "",
          })}
        >
          All
        </Link>
        <Link
          href="/active"
          className={classNames({
            "font-semibold": status === "active",
          })}
        >
          Active
        </Link>
        <Link
          href="/completed"
          className={classNames({
            "font-semibold": status === "completed",
          })}
        >
          Completed
        </Link>
      </div>
      <div>
        {todos.length > activeCount && (
          <span role="button" onClick={clearCompleted}>
            Clear Completed
          </span>
        )}
      </div>
    </div>
  );
};

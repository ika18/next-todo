import { StatusTypes } from "@/stores/todos-store";
import { NewTodo } from "../_components/new-todo";
import { TodoFilter } from "../_components/todo-filter";
import { TodoList } from "../_components/todo-list";

export default function Home({ params }: { params: { status: string[] } }) {
  const status = (params.status?.[0] || "") as StatusTypes;

  return (
    <main className="min-h-screen pt-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl uppercase mb-8">Todo</h1>

        <NewTodo />

        <div className="rounded-lg bg-white shadow-md divide-y divide-slate-200 mt-4">
          <TodoList status={status} />

          <TodoFilter status={status} />
        </div>
      </div>
    </main>
  );
}

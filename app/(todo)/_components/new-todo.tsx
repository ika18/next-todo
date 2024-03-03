"use client";

import useTodoStore from "@/stores/todos-store";

export const NewTodo = () => {
  const setNewTodo = useTodoStore((state) => state.setNewTodo);
  const addTodo = useTodoStore((state) => state.addTodo);
  const newTodo = useTodoStore((state) => state.newTodo);
  const toggleAll = useTodoStore((state) => state.toggleAll);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.code === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="bg-white rounded-lg px-4 py-2 shadow-md flex space-x-4">
      <input type="checkbox" onClick={toggleAll} />

      <input
        type="text"
        name="title"
        placeholder="Create a new todo..."
        value={newTodo}
        onChange={(evt) => setNewTodo(evt.target.value)}
        onKeyDown={handleKeyDown}
        className="outline-0 text-xl text-gray-500"
      />
    </div>
  );
};

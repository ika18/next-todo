import { nanoid } from "nanoid";
import { create } from "zustand";

export type StatusTypes = "" | "active" | "completed";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const updateTodo = (todos: Todo[], id: string, title: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    title: todo.id === id ? title : todo.title,
  }));

const toggleTodo = (todos: Todo[], id: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    completed: todo.id === id ? !todo.completed : todo.completed,
  }));

const removeTodo = (todos: Todo[], id: string): Todo[] =>
  todos.filter((todo) => todo.id !== id);

const addTodo = (todos: Todo[], title: string): Todo[] => [
  ...todos,
  {
    id: nanoid(),
    title,
    completed: false,
  },
];

const clearCompleted = (todos: Todo[]): Todo[] =>
  [...todos].filter((todo) => !todo.completed);

const toggleAll = (todos: Todo[]): Todo[] => {
  const isAllCompleted = todos.every((todo) => todo.completed);
  return todos.map((todo) => ({ ...todo, completed: !isAllCompleted }));
};

type TodoStore = {
  todos: Todo[];
  filteredTodos: (filter: StatusTypes) => Todo[];
  activeCount: () => number;
  newTodo: string;
  setTodos: (todos: Todo[]) => void;
  addTodo: () => void;
  updateTodo: (id: string, title: string) => void;
  toggleTodo: (id: string) => void;
  toggleAll: () => void;
  removeTodo: (id: string) => void;
  setNewTodo: (newTodo: string) => void;
  clearCompleted: () => void;
};

const useTodoStore = create<TodoStore>(
  (set, get): TodoStore => ({
    todos: [],
    filteredTodos: (filter: StatusTypes) => {
      const { todos } = get();
      if (filter) {
        return todos.filter((todo) => {
          if (filter === "completed") {
            return todo.completed;
          }

          if (filter === "active") {
            return !todo.completed;
          }
        });
      }

      return todos;
    },
    activeCount: () => get().todos.filter((todo) => !todo.completed).length,
    newTodo: "",
    setTodos: (todos: Todo[]) =>
      set((state) => ({
        ...state,
        todos,
      })),
    removeTodo: (id: string) =>
      set((state) => ({
        ...state,
        todos: removeTodo(state.todos, id),
      })),
    updateTodo: (id: string, title: string) =>
      set((state) => ({
        ...state,
        todos: updateTodo(state.todos, id, title),
      })),
    toggleTodo: (id: string) =>
      set((state) => ({
        ...state,
        todos: toggleTodo(state.todos, id),
      })),
    toggleAll: () =>
      set((state) => ({ ...state, todos: toggleAll(state.todos) })),
    setNewTodo: (newTodo: string) =>
      set((state) => ({
        ...state,
        newTodo,
      })),

    addTodo: () =>
      set((state) => ({
        ...state,
        todos: addTodo(state.todos, state.newTodo),
        newTodo: "",
      })),
    clearCompleted: () =>
      set((state) => ({
        ...state,
        todos: clearCompleted(state.todos),
      })),
  })
);

export default useTodoStore;

import classNames from "classnames";
import React from "react";

interface TodoLitItemProps {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onUpdate: (title: string) => void;
  onDelete: () => void;
}

export const TodoListItem = ({
  title,
  completed,
  onToggle,
  onUpdate,
  onDelete,
}: TodoLitItemProps) => {
  return (
    <div className="flex justify-start space-x-4 items-center px-4 py-2 group">
      <input type="radio" checked={completed} onClick={onToggle} />
      <input
        type="text"
        value={title}
        onChange={(e) => onUpdate(e.target.value)}
        className={classNames("text-lg outline-0 text-gray-500 grow", {
          "!text-gray-300 line-through": completed,
        })}
      />
      <a
        role="button"
        className="hidden text-gray-500/70 group-hover:block hover:text-gray-500"
        onClick={onDelete}
      >
        X
      </a>
    </div>
  );
};

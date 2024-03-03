import classNames from "classnames";
import React from "react";

interface TodoLitItemProps {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onUpdate: (title: string) => void;
}

export const TodoListItem = ({
  title,
  completed,
  onToggle,
  onUpdate,
}: TodoLitItemProps) => {
  return (
    <div className="flex justify-start space-x-4 items-center px-4 py-2">
      <input type="radio" checked={completed} onClick={onToggle} />
      <input
        type="text"
        value={title}
        onChange={(e) => onUpdate(e.target.value)}
        className={classNames("text-lg outline-0 text-gray-500", {
          "!text-gray-300 line-through": completed,
        })}
      />
    </div>
  );
};

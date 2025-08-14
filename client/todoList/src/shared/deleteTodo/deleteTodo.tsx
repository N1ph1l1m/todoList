import type { MouseEventHandler } from "react";

interface IDeleteTodo {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const DeleteTodo = ({ onClick }: IDeleteTodo) => {
  return (
    <div className="flex gap-2 text-gray-600">

      <button
        onClick={onClick}
        className="font-semibold text-xl text-red-700 hover:cursor-pointer"
      >
        <svg
        className="w-7 stroke-red-700"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
      </button>
    </div>
  );
};

export default DeleteTodo;

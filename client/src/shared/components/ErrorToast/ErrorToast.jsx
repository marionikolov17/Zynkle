/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";

export default function ErrorToast({ text }) {
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) return;

  return (
    <div className="fixed z-50 bottom-5">
      <div
        id="toast-danger"
        className="flex items-center w-full max-w-xs px-4 py-2 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
          <MdError />
          <span className="sr-only">Error icon</span>
        </div>
        <div className="mx-5 text-sm font-normal">{text}</div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-danger"
          aria-label="Close"
          onClick={() => setIsClosed(true)}
        >
          <span className="sr-only">Close</span>
          <IoCloseOutline />
        </button>
      </div>
    </div>
  );
}

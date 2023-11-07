import { createPortal } from "react-dom";
import { HiX } from "react-icons/hi";
import React from "react";

function Modal({ children, close }) {
  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-50 backdrop-filter backdrop-blur-md z-50 flex items-center justify-center">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-2 transition duration-500 overflow-scroll max-h-[700px]">
        <button
          onClick={close}
          className="absolute top-2 right-4 p-1 rounded-sm hover:bg-gray-100 transition duration-200"
        >
          <HiX className="w-6 h-6 text-gray-500" />
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;

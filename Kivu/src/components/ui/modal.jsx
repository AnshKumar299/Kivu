// Modal.jsx
import React from "react";

const Modal = ({ isOpen, onClose, children, title }) => {
  return (
    <div
      className={`inset-0 m-2 mt-4 mb-1 shadow-neutral-600 bg-yellow-50  border-1 rounded-3xl transition ease-linear delay-150 duration-300 ${
        !isOpen ? "hidden" : "block"
      } transition ease-linear delay-150 duration-300`}
    >
      <div className="">
        <div className="flex justify-between bg-red-200 rounded-t-3xl">
            <h1 className="pl-4 pt-2 font-bold font-quicksand text-red-800">
                {title}
            </h1>
          <button
            onClick={onClose}
            className=" bg-red-400 p-2 rounded-tr-3xl text-white hover:bg-red-600"
          >
            ⨉
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

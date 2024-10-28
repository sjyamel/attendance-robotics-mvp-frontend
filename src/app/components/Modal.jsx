"use client";

const Modal =({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed left-0 w-full inset-0 bg-black bg-opacity-50 flex justify-center items-center z-70">
      <div className="bg-white rounded-lg w-full m-10 p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        </div>
        <div className="mt-4">
          {children}
        </div>
        
      </div>
    </div>
  );
};

export default Modal;

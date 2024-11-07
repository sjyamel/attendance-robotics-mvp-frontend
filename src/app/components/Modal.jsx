"use client";

const Modal =({ isOpen, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed left-0 w-full inset-0 bg-black bg-opacity-50 flex justify-center items-center z-70">
      <div className="bg-white rounded-lg w-full m-10 p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold">{title}</h2>
          
        </div>
        <div className="mt-4">
          {children}
        </div>
        
      </div>
    </div>
  );
};

export default Modal;

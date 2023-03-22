import React from 'react';

const Modal = ({ isOpen, close, children }) => {
    const openModalClass = isOpen ? 'block' : 'hidden';
    return (
        <div className={`fixed z-10 inset-x-0 top-20 bottom-2 overflow-y-auto ${openModalClass}`}  >
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>
                <div className="relative z-10 w-full max-w-md p-6 bg-white rounded-lg flex-cols "  >
                    <button
                        className="text-black font-bold uppercase hover:text-red-700 mb-1 absolute top-2 right-4"
                        onClick={close}
                    >
                        X
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
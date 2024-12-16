import { relative } from 'path';
import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MatchDetailModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  // console.log(matchDetails);
  // console.log(pairing);
  
  return createPortal(
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
    <div className="bg-black bg-opacity-30 flex justify-center items-center z-50" style={{ position:'fixed',top: 0, left: 0, right: 0, bottom: 0 }}>

      <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl   w-full ">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-black-500 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default MatchDetailModal;


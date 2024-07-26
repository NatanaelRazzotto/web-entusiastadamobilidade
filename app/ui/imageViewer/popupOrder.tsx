import React from 'react';

export function PopupOrder({ titulo, message,message2,message3, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h5>{titulo}</h5>
        <p>{message}</p>
        <p>{message2}</p>
        <p>{message3}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Entendi
        </button>
      </div>
    </div>
  );
}

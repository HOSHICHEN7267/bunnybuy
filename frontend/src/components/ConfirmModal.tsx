// components/ConfirmModal.tsx
import React from "react";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <p className="text-gray-800 text-lg mb-4">{message}</p>
        <div className="flex justify-end space-x-3">
        <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            確定
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            取消
          </button>

        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

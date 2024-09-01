import { FC } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center relative">
            <span className="text-green-500 text-3xl font-bold">!</span>
            <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-2 text-center">
          Confirm your selection
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Are you sure you want to submit property selection to the Vivrestays?
          This action cannot be undone.
        </p>
        <div className="flex justify-around">
          <button
            onClick={onClose}
            className="px-12 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-12 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

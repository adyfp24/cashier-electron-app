import React from 'react';

function PopUpConfirm({ data, onConfirm, onCancel }) {
  return (
    <div
      id="info-popup"
      tabIndex="-1"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-50"
    >
      <div className="relative w-full h-full max-w-lg p-4 md:h-auto">
        <div className="relative p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
            <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              {data ? data.title : ""}
            </h3>
            <p>{data ? data.content : ""}</p>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Tidak
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              Ya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUpConfirm;

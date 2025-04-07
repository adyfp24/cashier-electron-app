import React, { useState } from 'react';

function ModalAppname({ isOpen, onClose, onSubmit }) {
    const [appName, setAppName] = useState('');

    if (!isOpen) return null;

    const handleSave = (e) => {
        e.preventDefault();
        console.log('Nama Aplikasi disimpan:', appName);
        const formData = new FormData();
        formData.append('nama', appName);
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        onSubmit(formData);
        onClose();
    };

    const handleCancel = () => {
        setAppName('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80">
            <div className="p-6 bg-white rounded-lg w-96">
                <h2 className="mb-4 text-xl font-semibold">Edit Nama Aplikasi</h2>

                <div className="mb-4">
                    <label htmlFor="appName" className="block text-sm font-medium text-gray-700">Nama Aplikasi</label>
                    <input
                        id="appName"
                        type="text"
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                        className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masukkan nama aplikasi baru"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalAppname;

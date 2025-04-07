import React, { useState } from 'react';

function ModalLogo({ isOpen, onClose, onSubmit }) {
    const [logo, setLogo] = useState(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];  
        if (file) {
            setLogo(file); 
        }
    };

    const handleSave = () => {
        console.log('Logo baru disimpan:', logo);
        const formData = new FormData();    
        formData.append('logo', logo);
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        onSubmit(formData);
        onClose(); 
    };

    const handleCancel = () => {
        setLogo(null); 
        onClose(); 
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80">
            <div className="p-6 bg-white rounded-lg w-96">
                <h2 className="mb-4 text-xl font-semibold">Edit Logo Aplikasi</h2>
                
                <div className="mb-4">
                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Logo Aplikasi</label>
                    <input
                        id="logo"
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full mt-1 text-sm text-gray-900 border border-gray-300 rounded-lg file:border-0 file:bg-gray-50 file:text-sm file:font-medium file:text-blue-700 file:hover:bg-gray-100"
                    />
                </div>

                {logo && (
                    <div className="mb-4">
                        <img src={logo} alt="Logo Preview" className="object-contain h-48 max-w-full" />
                    </div>
                )}

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

export default ModalLogo;

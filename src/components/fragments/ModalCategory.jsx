import React, { useEffect, useState } from 'react'

function CategoryModal({ isOpen, onSubmit, onClose }) {

    const [formData, setFormdata] = useState({
        nama_kategori: '',
    });

    useEffect(() => {
        if (isOpen) {
            setFormdata({ nama_kategori: '' });
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormdata({ nama_kategori: '' });
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80">
                    <div className="relative w-1/3 p-4 bg-white rounded-lg shadow-lg">
                        <div className="flex items-center justify-between pb-4 mb-4 border-b rounded-t">
                            <h3 className="text-lg font-semibold text-gray-900">Tambah Kategori</h3>
                            <button type="button" className="text-gray-400" onClick={() => {
                                    setFormdata({
                                        nama_kategori: ''
                                    });
                                    onClose();
                                }}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4">
                                <div className='w-full'>
                                    <label htmlFor="nama_kategori" className="block mb-2 text-sm font-medium text-gray-900">Nama Kategori</label>
                                    <input type="text" name="nama_kategori" id="nama_kategori" value={formData.nama_kategori} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="masukkan nama kategori baru" required />
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-900 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4">
                                Tambah Kategori
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default CategoryModal
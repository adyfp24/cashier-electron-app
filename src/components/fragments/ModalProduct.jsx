import React, { useState } from 'react';

function ProductModal({ isOpen, onClose, onSubmit, productData = null }) {
    const [formData, setFormData] = useState({
        nama: '',
        stok: 0,
        harga: 0,
        jenis_produk: '',
    });

    React.useEffect(() => {
        if (productData) {
            setFormData({
                nama: productData.nama || '',
                stok: productData.stok || 0,
                harga: productData.harga || 0,
                jenis_produk: productData.jenis_produk || '1',
            });
        }
    }, [productData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = (name === 'stok' || name === 'harga' || name === 'jenis_produk') ? parseInt(value, 10) : value
        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose(); 
    };

    return (
        <>
            {isOpen && (
                <div className="flex justify-center m-5">
                    <div id="defaultModal" className="fixed top-0 bottom-0 left-0 z-50 items-center justify-center w-full h-full bg-gray-900 bg-opacity-80">
                        <div className="relative w-full max-w-2xl p-4">
                            <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                                <div className="flex items-center justify-between pb-4 mb-4 border-b rounded-t">
                                    <h3 className="text-lg font-semibold text-gray-900">{productData ? 'Edit Produk' : 'Tambah Produk'}</h3>
                                    <button type="button" className="text-gray-400" onClick={onClose}>
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nama Produk</label>
                                            <input type="text" name="nama" id="nama" value={formData.nama} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type product name" required />
                                        </div>
                                        <div>
                                            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900">Stok</label>
                                            <input type="number" name="stok" id="stok" value={formData.stok} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product stock" required />
                                        </div>
                                        <div>
                                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Harga</label>
                                            <input type="number" name="harga" id="harga" value={formData.harga} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="$2999" required />
                                        </div>
                                        <div>
                                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Kategori Produk</label>
                                            <select id="jenis_produk" name="jenis_produk" value={formData.jenis_produk} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                                <option value="1">Oli</option>
                                                <option value="2">Mesin</option>
                                                <option value="3">Velg</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" className="text-white inline-flex items-center bg-blue-900 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                         <svg className="w-6 h-6 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg> 
                                        {productData ? 'Edit Produk' : 'Tambah Produk'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductModal;

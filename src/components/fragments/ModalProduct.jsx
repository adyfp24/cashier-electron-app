import React, { useState } from 'react';

function ProductModal({ isOpen, onClose, onSubmit, productData = null }) {
    const [formData, setFormData] = useState({
        nama: '',
        stok: 0,
        harga: 0,
        jenis_produk: '',
        gambar: null
    });

    React.useEffect(() => {
        if (productData) {
            setFormData({
                nama: productData.nama || '',
                stok: productData.stok || 0,
                harga: productData.harga || 0,
                jenis_produk: productData.jenis_produk || '1',
                gambar: null
            });
        }
    }, [productData]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const newValue =
            name === 'stok' || name === 'harga' 
                ? parseInt(value, 10)
                : name === 'gambar'
                ? files[0]
                : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('nama', formData.nama);
        data.append('stok', formData.stok);
        data.append('harga', formData.harga);
        data.append('jenis_produk', formData.jenis_produk);
        if (formData.gambar) {
            data.append('gambar', formData.gambar);
        }

        onSubmit(data); 
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80">
                    <div className="relative w-full max-w-2xl p-4 bg-white rounded-lg shadow-lg">
                        <div className="flex items-center justify-between pb-4 mb-4 border-b rounded-t">
                            <h3 className="text-lg font-semibold text-gray-900">{productData ? 'Edit Produk' : 'Tambah Produk'}</h3>
                            <button type="button" className="text-gray-400" onClick={onClose}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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
                                    <input type="number" name="harga" id="harga" value={formData.harga} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Harga produk" required />
                                </div>
                                <div>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Kategori Produk</label>
                                    <select id="jenis_produk" name="jenis_produk" value={formData.jenis_produk} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                        <option value="1">Oli</option>
                                        <option value="2">Mesin</option>
                                        <option value="3">Velg</option>
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="gambar" className="block mb-2 text-sm font-medium text-gray-900">
                                        Gambar Produk
                                    </label>
                                    <input
                                        type="file"
                                        name="gambar"
                                        id="gambar"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-900 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4">
                                {productData ? 'Edit Produk' : 'Tambah Produk'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductModal;

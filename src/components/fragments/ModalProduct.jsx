import React, { useState, useContext } from 'react';
import { ProductContext } from '../../context/productContext';

function ProductModal({ isOpen, onClose, onSubmit, productData = null }) {
    const { categories = [], getCategories } = useContext(ProductContext);

    const [formData, setFormData] = useState({
        nama: '',
        kode: '',
        stok: 0,
        merk: '',
        harga: 0,
        hargaBeli: 0,
        jenis_produk: '',
        gambar: null
    });

    React.useEffect(() => {
        if (isOpen) {
            getCategories && getCategories();
            
            if (productData) {
                let categoryId = '';
                if (productData.jenisProduk && typeof productData.jenisProduk === 'object' && productData.jenisProduk.id) {
                    categoryId = productData.jenisProduk.id.toString();
                } else if (productData.jenisProdukId) {
                    categoryId = productData.jenisProdukId.toString();
                } else if (productData.jenis_produk) {
                    categoryId = productData.jenis_produk.toString();
                } else if (productData.jenisProduk && categories.length > 0) {
                    const matchingCategory = categories.find(cat => 
                        (cat.name && cat.name === productData.jenisProduk) || 
                        (cat.nama && cat.nama === productData.jenisProduk)
                    );
                    if (matchingCategory) {
                        categoryId = matchingCategory.id.toString();
                    }
                }
                
                console.log("Selected Category ID:", categoryId);
                
                setFormData({
                    nama: productData.nama || '',
                    kode: productData.kode || '',
                    merk: productData.merk || '',
                    stok: productData.stok || 0,
                    harga: productData.harga || 0,
                    hargaBeli: productData.hargaBeli || 0,
                    jenis_produk: categoryId,
                    gambar: null
                });
            } else {
                setFormData({
                    nama: '',
                    kode: '',
                    stok: 0,
                    merk: '',
                    harga: 0,
                    hargaBeli: 0,
                    jenis_produk: '', 
                    gambar: null
                });
            }
        }
    }, [productData, isOpen, getCategories, categories]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const newValue =
            name === 'stok' || name === 'harga' || name === 'harga_beli'
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
        if (formData.nama) data.append('nama', formData.nama);
        if (formData.kode) data.append('kode', formData.kode);
        if (formData.stok !== undefined) data.append('stok', formData.stok);
        if (formData.harga !== undefined) data.append('harga', formData.harga);
        if (formData.hargaBeli !== undefined) data.append('hargaBeli', formData.hargaBeli);
        if (formData.merk) data.append('merk', formData.merk);
        if (formData.jenis_produk) data.append('jenis_produk', formData.jenis_produk);
        if (formData.gambar) data.append('gambar', formData.gambar);
        onSubmit(data); 
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80">
                    <div className="relative w-full max-w-2xl p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <div className="flex items-center justify-between pb-4 mb-4 border-b rounded-t">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">{productData ? 'Edit Produk' : 'Tambah Produk'}</h3>
                            <button type="button" className="text-gray-400" onClick={onClose}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Nama Produk</label>
                                    <input type="text" name="nama" id="nama" value={formData.nama} onChange={handleChange} className="bg-gray-50 border dark:bg-gray-700 dark:border-gray-600 border-gray-300 text-gray-900 dark:text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="masukkan nama" required />
                                </div>
                                <div>
                                    <label htmlFor="kode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Kode Produk</label>
                                    <input type="text" name="kode" id="kode" value={formData.kode} onChange={handleChange} className="bg-gray-50 border dark:bg-gray-700 dark:border-gray-600 border-gray-300 text-gray-900 dark:text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="masukkan kode" required />
                                </div>
                                <div>
                                    <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Stok</label>
                                    <input type="number" name="stok" id="stok" value={formData.stok} onChange={handleChange} className="bg-gray-50 border dark:bg-gray-700 dark:border-gray-600 border-gray-300 dark:text-gray-400 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="masukkan stok" required />
                                </div>
                                <div>
                                    <label htmlFor="merk" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Merk</label>
                                    <input type="text" name="merk" id="merk" value={formData.merk} onChange={handleChange} className="bg-gray-50 border dark:bg-gray-700 dark:border-gray-600 border-gray-300 text-gray-900 dark:text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="masukkan merk" required />
                                </div>
                                <div>
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Harga Jual</label>
                                    <input type="number" name="harga" id="harga" value={formData.harga} onChange={handleChange} className="bg-gray-50 border dark:bg-gray-700 dark:border-gray-600 border-gray-300 text-gray-900 dark:text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="masukkan harga jual" required />
                                </div>
                                <div>
                                    <label htmlFor="hargaBeli" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Harga Beli</label>
                                    <input type="number" name="hargaBeli" id="hargaBeli" value={formData.hargaBeli} onChange={handleChange} className="bg-gray-50 border dark:bg-gray-700 dark:border-gray-600 border-gray-300 text-gray-900 dark:text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="masukkan harga beli" required />
                                </div>
                                <div>
                                    <label htmlFor="jenis_produk" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Kategori Produk</label>
                                    <select 
                                        id="jenis_produk" 
                                        name="jenis_produk" 
                                        value={formData.jenis_produk} 
                                        onChange={handleChange} 
                                        className="relative bg-gray-50 border border-gray-300 text-gray-900 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 z-50"
                                    >
                                        <option value="">Kategori Produk</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name || category.nama}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="gambar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                                        Gambar Produk
                                    </label>
                                    <input
                                        type="file"
                                        name="gambar"
                                        id="gambar"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
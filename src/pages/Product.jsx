import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ProductContext } from '../context/productContext'
import Navbar from '../components/layouts/Navbar';
import Sidebar from '../components/layouts/Sidebar';
import ProductModal from '../components/fragments/ModalProduct';
import Pagination from '../components/fragments/Pagination';
import CategoryModal from '../components/fragments/ModalCategory';
import CommonToast from '../components/elements/CommonToast';

function Product() {
    const { products, error, loading, addProduct, addCategory,
        deleteProduct, updateProduct, pagination, getAllProduct, getAllCategories, categories } = useContext(ProductContext);

    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [dropdownDirection, setDropdownDirection] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalCategoryOpen, setModalCategoryOpen] = useState(false);

    const [isCommonToastOpen, setIsCommonToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState({
        type: 'success',
        message: ''
    });

    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        getAllCategories();
    }, []);

    const handleAddProduct = () => {
        setSelectedProduct(null)
        setModalOpen(true)
    }

    const handleAddCategory = () => {
        setModalCategoryOpen(true)
    }

    const handleSubmitCategory = async (data) => {
        try {
            await addCategory(data);
            getAllCategories();
            setIsCommonToastOpen(true);
            setToastMessage({
                type: 'success',
                message: 'Kategori berhasil ditambahkan',
            });
        } catch (error) {
            setIsCommonToastOpen(true);
            setToastMessage({
                type: 'error',
                message: error.message || 'Terjadi kesalahan saat menambahkan kategori',
            });
            console.log(error.message);
        }
    }

    const handleEditProduct = (product) => {
        console.log("Editing product: ", product);
        setSelectedProduct(product)
        setModalOpen(true)
    }

    const handleDeleteProduct = async (productId) => {
        try {
            await deleteProduct(productId);
            setIsCommonToastOpen(true);
            setToastMessage({
                type: 'success',
                message: 'Produk berhasil dihapus',
            });
        } catch (error) {
            setIsCommonToastOpen(true);
            setToastMessage({
                type: 'error',
                message: error.response?.data?.message || 'Produk tidak dapat dihapus karena sudah tercatat pada transaksi',
            });
        }
    };

    const handleSubmit = async (data) => {
        try {
            if (selectedProduct) {
                await updateProduct(selectedProduct.id, data);
                setIsCommonToastOpen(true);
                setToastMessage({
                    type: 'success',
                    message: 'Produk berhasil diperbarui',
                });
            } else {
                await addProduct(data);
                setIsCommonToastOpen(true);
                setToastMessage({
                    type: 'success',
                    message: 'Produk berhasil ditambahkan',
                });
            }
            setSelectedProduct(null);
            await getAllProduct(pagination.page);
            setModalOpen(false);
        } catch (error) {
            setIsCommonToastOpen(true);
            setToastMessage({
                type: 'error',
                message: error.message || 'Terjadi kesalahan',
            });
            console.log(error.message);
        }
    }

    const toggleDropdown = (productId, event) => {
        if (productId === dropdownOpen) {
            setDropdownOpen(null);
        } else {
            setDropdownOpen(productId);

            // Calculate whether dropdown should open upward
            if (event) {
                const buttonPosition = event.target.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const spaceBelow = viewportHeight - buttonPosition.bottom;

                // If less than 100px below, open upward
                setDropdownDirection(prev => ({
                    ...prev,
                    [productId]: spaceBelow < 100
                }));
            }
        }
    };

    const toggleFilterDropdown = () => {
        setIsFilterDropdownOpen(prev => !prev);
    };

    const handleCategoryFilter = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category.name) ? prev.filter(c => c !== category.name) : [...prev, category.name]
        );
    };

    const clearFilter = () => {
        setSelectedCategories([]);
    };

    const setPage = (page) => {
        getAllProduct(page)
    }

    useEffect(() => {
        let filtered = products || [];

        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.jenisProduk?.name?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product =>
                selectedCategories.includes(product.jenisProduk?.name)
            );
        }

        setFilteredProducts(filtered);
    }, [searchQuery, selectedCategories, products]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            <Navbar />

            <Sidebar />

            <CommonToast
                isOpen={isCommonToastOpen}
                onClose={() => setIsCommonToastOpen(false)}
                message={toastMessage.message}
                type={toastMessage.type}
            ></CommonToast>

            <section className="min-h-screen p-3 pt-20 bg-gray-50 dark:bg-gray-900 sm:p-5 md:ml-64">
                <div className="max-w-screen-xl px-4 mx-auto lg:px-12">
                    <div className="relative mt-20 overflow-visible bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input
                                            onChange={handleSearchChange}
                                            type="text"
                                            value={searchQuery}
                                            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Search"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                                <button
                                    onClick={handleAddCategory}
                                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    <svg className="h-3.5 w-3.5 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Tambah Kategori
                                </button>

                                <button
                                    onClick={handleAddProduct}
                                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                    </svg>
                                    Tambah Produk
                                </button>
                                <div className="relative w-full md:w-auto">
                                    <button
                                        onClick={toggleFilterDropdown}
                                        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                        </svg>
                                        Filter Kategori
                                        {selectedCategories.length > 0 && (
                                            <span className="ml-2 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-blue-500 rounded-full">
                                                {selectedCategories.length}
                                            </span>
                                        )}
                                    </button>
                                    {isFilterDropdownOpen && (
                                        <div className="absolute right-0 z-50 bg-white divide-y divide-gray-100 rounded shadow w-48 dark:bg-gray-700 dark:divide-gray-600 max-h-60 overflow-y-auto">
                                            {categories && categories.length > 0 ? (
                                                categories.map(category => (
                                                    <label key={category.id} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        <input
                                                            type="checkbox"
                                                            className="mr-2"
                                                            checked={selectedCategories.includes(category.name)}
                                                            onChange={() => handleCategoryFilter(category)}
                                                        />
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">{category.name}</span>
                                                    </label>
                                                ))
                                            ) : (
                                                <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">Tidak ada kategori tersedia</div>
                                            )}
                                            {selectedCategories.length > 0 && (
                                                <button
                                                    onClick={clearFilter}
                                                    className="w-full py-2 text-sm font-medium text-center text-red-500 hover:bg-red-100 dark:hover:bg-red-700"
                                                >
                                                    Hapus Filter
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full mb-16 text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Nama Produk</th>
                                        <th scope="col" className="px-4 py-3">Kode</th>
                                        <th scope="col" className="px-4 py-3">Kategori</th>
                                        <th scope="col" className="px-4 py-3">Merk</th>
                                        <th scope="col" className="px-4 py-3">Stok</th>
                                        <th scope="col" className="px-4 py-3">Harga Jual</th>
                                        <th scope="col" className="px-4 py-3">Harga Beli</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((product) => (
                                            <tr key={product.id} className="border-b dark:border-gray-700">
                                                <td className="flex items-center px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <img className='w-8 h-8 rounded-full' src={product?.gambar || ''} alt="" />
                                                    <p className='ml-2'>{product.nama}</p>
                                                </td>
                                                <td className="px-4 py-3">{product.kode}</td>
                                                <td className="px-4 py-3">{product.jenisProduk?.name || ''}</td>
                                                <td className="px-4 py-3">{product.merk}</td>
                                                <td className="px-4 py-3">{product.stok}</td>
                                                <td className="px-4 py-3">{product.harga}</td>
                                                <td className="px-4 py-3">{product.hargaBeli}</td>
                                                <td className="px-4 py-3">
                                                    <div className="relative flex justify-end">
                                                        <button
                                                            onClick={(e) => toggleDropdown(product.id, e)}
                                                            className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                                            type="button"
                                                        >
                                                            {dropdownOpen !== product.id ? (
                                                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                </svg>) : (

                                                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>

                                                            )}
                                                        </button>
                                                        {dropdownOpen === product.id && (
                                                            <div className={`absolute right-0 z-50 bg-white divide-y divide-gray-100 rounded shadow w-28 dark:bg-gray-700 dark:divide-gray-600 ${dropdownDirection[product.id] ? 'bottom-full mb-1' : 'top-full mt-1'}`}>
                                                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                                                    <li onClick={() => handleEditProduct(product)} className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                        Edit
                                                                    </li>
                                                                    <li onClick={() => handleDeleteProduct(product.id)} className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                        Hapus
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                                                {loading ? 'Loading...' : 'Tidak ada produk tersedia'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="relative">
                            <Pagination
                                limit={pagination.limit}
                                totalPage={pagination.totalPage}
                                page={pagination.page}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => {
                    setModalOpen(false)
                    setSelectedProduct(null)
                }}
                productData={selectedProduct}
                onSubmit={handleSubmit}
            ></ProductModal>

            <CategoryModal
                isOpen={isModalCategoryOpen}
                onClose={() => {
                    setModalCategoryOpen(false)
                }}
                onCategoryAdded={getAllCategories}
                onSubmit={handleSubmitCategory}
            ></CategoryModal>
        </>
    )
}

export default Product
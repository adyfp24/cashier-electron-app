import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layouts/Navbar';
import Sidebar from '../components/layouts/Sidebar';
import { ProductContext } from '../context/productContext';

function Payment() {
    const { products } = useContext(ProductContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter(product =>
                    product.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.jenisProduk.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, products]);

    useEffect(() => {
        const newTotal = cart.reduce((sum, item) => sum + item.harga * item.quantity, 0);
        setTotal(newTotal);
    }, [cart]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        setCart(cart.map(item =>
            item.id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
        ));
    };

    return (
        <>
            <Navbar />
            <Sidebar />
            <section className="h-full p-3 pt-20 bg-gray-50 dark:bg-gray-900 sm:p-5 md:ml-64">
                <div className="max-w-screen-xl px-4 mx-auto lg:px-12">

                    <div className="relative overflow-hidden bg-white shadow-md mt-28 dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-4">
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Daftar Pembelian</h2>
                            {cart.length !== 0 ? cart.map((item) => (
                                <div key={item.id} className="flex items-center justify-between mb-2">
                                    <span className="text-gray-700 dark:text-gray-300">{item.nama}</span>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-2 py-1 bg-gray-200 rounded-l dark:bg-gray-600"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                            className="w-16 text-center border-t border-b border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-2 py-1 bg-gray-200 rounded-r dark:bg-gray-600"
                                        >
                                            +
                                        </button>
                                        <span className="ml-4 text-gray-700 dark:text-gray-300">
                                            Rp. {(item.harga * item.quantity).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="ml-4 text-red-600 dark:text-red-400 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            )) : 
                                <div>
                                   <h6 className='font-thin text-white'>Belum ada produk yang ditambahkan</h6>
                                </div>
                            }
                            <div className="mt-4 text-right">
                                <p className="text-xl font-bold text-gray-900 dark:text-white">
                                    Total: Rp {total.toFixed(2)}
                                </p>
                            </div>
                            <div className="mt-4">
                                <button onClick={() => {
                                    console.log(cart);
                                    alert('test bayar sukses');
                                }} className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700">
                                    Selesaikan Transaksi
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="relative mt-10 overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
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
                                            id="simple-search"
                                            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Cari Produk atau kategori"
                                            required=""
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Nama Produk</th>
                                        <th scope="col" className="px-4 py-3">Kategori</th>
                                        <th scope="col" className="px-4 py-3">Stok</th>
                                        <th scope="col" className="px-4 py-3">Harga</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Tambah</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="border-b dark:border-gray-700">
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.nama}</th>
                                            <td className="px-4 py-3">{product.jenisProduk.name}</td>
                                            <td className="px-4 py-3">{product.stok}</td>
                                            <td className="px-4 py-3">{product.harga}</td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    onClick={() => addToCart(product)}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                >
                                                    Tambah
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Payment
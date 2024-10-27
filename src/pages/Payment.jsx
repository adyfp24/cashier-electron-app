import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layouts/Navbar';
import Sidebar from '../components/layouts/Sidebar';
import { ProductContext } from '../context/productContext';
import PopUpConfirm from '../components/fragments/PopUpConfirm';

function Payment() {
    const { products } = useContext(ProductContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [popUpConfirm, setPopUpConfirm] = useState(false);

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

    const showPopUpConfirm = () => {
        setPopUpConfirm(true)
    }

    const confirmTransaction = () => {
        console.log(cart)

    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <section className="py-8 pt-20 antialiased bg-white dark:bg-gray-900 md:py-16 md:ml-64">
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">List Pembelian</h2>

                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <div className="flex-none w-2/3 mx-auto lg:max-w-2xl xl:max-w-4xl">
                            <div className="space-y-6">

                                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                        <a href="#" className="shrink-0 md:order-1">
                                            <img className="w-20 h-20 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-light.svg" alt="imac image" />
                                            <img className="hidden w-20 h-20 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-dark.svg" alt="imac image" />
                                        </a>

                                        <label for="counter-input" className="sr-only">Choose quantity:</label>
                                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                                            <div className="flex items-center">
                                                <button type="button" id="decrement-button-3" data-input-counter-decrement="counter-input-3" className="inline-flex items-center justify-center w-5 h-5 bg-gray-100 border border-gray-300 rounded-md shrink-0 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                                    <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                                    </svg>
                                                </button>
                                                <input type="text" id="counter-input-3" data-input-counter className="w-10 text-sm font-medium text-center text-gray-900 bg-transparent border-0 shrink-0 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value="1" required />
                                                <button type="button" id="increment-button-3" data-input-counter-increment="counter-input-3" className="inline-flex items-center justify-center w-5 h-5 bg-gray-100 border border-gray-300 rounded-md shrink-0 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                                    <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="text-end md:order-4 md:w-32">
                                                <p className="text-base font-bold text-gray-900 dark:text-white">$1,799</p>
                                            </div>
                                        </div>

                                        <div className="flex-1 w-full min-w-0 space-y-4 md:order-2 md:max-w-md">
                                            <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">Apple - MacBook Pro 16" Laptop, M3 Pro chip, 36GB Memory, 18-core GPU, 512GB SSD, Space Black</a>

                                            <div className="flex items-center gap-4">

                                                <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                    </svg>
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="hidden xl:mt-8 xl:block">
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Pilih Item Pembelian</h3>
                                <div className="grid grid-cols-3 gap-4 mt-6 sm:mt-8">
                                    {products ? products.map((product) => (
                                        <div key={product.id} className="p-6 space-y-6 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                            <a href="#" className="overflow-hidden rounded">
                                                <img className="mx-auto h-28 w-28 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                                <img className="hidden mx-auto h-28 w-28 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                                            </a>
                                            <div>
                                                <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{product.nama}</a>
                                                <p className="mt-2 text-sm font-normal text-gray-500 dark:text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
                                            </div>
                                            <div>
                                                <p className='text-sm font-normal text-gray-500'>{product.stok} Unit</p>
                                                <p className="text-lg font-bold leading-tight ">Rp. {product.harga}</p>
                                            </div>
                                            <div className="mt-6 flex items-center gap-2.5">
                                                
                                                <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                    <svg className="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                                    </svg>
                                                    Tambahkan
                                                </button>
                                            </div>
                                        </div>
                                    )) : <p>Belum ada data produk tersedia</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 max-w-4xl mx-auto mt-6 space-y-6 lg:mt-0 lg:w-full">
                            <div className="p-4 space-y-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">$7,592.00</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                            <dd className="text-base font-medium text-green-600">-$299.00</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">$799</dd>
                                        </dl>
                                    </div>

                                    <dl className="flex items-center justify-between gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                                        <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                        <dd className="text-base font-bold text-gray-900 dark:text-white">$8,191.00</dd>
                                    </dl>
                                </div>

                                <a href="#" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</a>

                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                                    <a href="#" title="" className="inline-flex items-center gap-2 text-sm font-medium underline text-primary-700 hover:no-underline dark:text-primary-500">
                                        Continue Shopping
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Payment
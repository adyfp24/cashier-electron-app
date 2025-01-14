import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layouts/Navbar';
import Sidebar from '../components/layouts/Sidebar';
import { ProductContext } from '../context/productContext';
import { PaymentContext } from '../context/paymentContext';
import PopUpConfirm from '../components/fragments/PopUpConfirm';
import PopUpError from '../components/fragments/PopUpError';

function Payment() {
    const { products } = useContext(ProductContext);
    const { createPayment, loading, error } = useContext(PaymentContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [popUpConfirm, setPopUpConfirm] = useState(false);
    const [popUpError, setPopUpError] = useState({ visible: false, message: "" });
    const navigate = useNavigate();

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
        const existingItem = cart.find(item => item.productId === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.productId === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, {...product, productId: product.id, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.productId !== productId));
    };

    const incrementQuantity = (productId) => {
        setCart(cart.map(item =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decrementQuantity = (productId) => {
        setCart(cart.map(item =>
            item.productId === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        ));
    };

    const showPopUpConfirm = () => {
        setPopUpConfirm(true);
    };

    const confirmTransaction = async () => {
        console.log(cart);
        setPopUpConfirm(false);
        try {
            await createPayment(cart);
            navigate('/receipt');
            setCart([]);
            setTotal(0);
        } catch (err) {
            setPopUpError({
                visible: true,
                message: err || "Terjadi kesalahan saat membuat transaksi.",
            });
        }
    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <section className="py-8 pt-20 antialiased bg-white dark:bg-gray-900 md:py-16 md:ml-64">
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">List Pembelian</h2>

                    <div className="mt-4 sm:mt-4 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <div className="flex-none w-2/3 mx-auto lg:max-w-2xl xl:max-w-4xl">
                            <div className="space-y-6">
                                <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-3">
                                    {cart.length !== 0 ? cart.map((item) => (
                                        <div key={item.productId} className="mb-2 space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                            <a href="#" className="overflow-hidden rounded">
                                                <img className="w-10 h-10 mx-auto" src={item.gambar} alt="product image" />
                                            </a>
                                            <div className="flex items-center justify-between space-x-8 md:order-3 md:justify-end">
                                                <div className="flex items-center">
                                                    <button onClick={() => decrementQuantity(item.productId)} className="inline-flex items-center justify-center w-5 h-5 bg-gray-100 border border-gray-300 rounded-md shrink-0">
                                                        -
                                                    </button>
                                                    <input type="text" className="w-10 text-center" value={item.quantity} readOnly />
                                                    <button onClick={() => incrementQuantity(item.productId)} className="inline-flex items-center justify-center w-5 h-5 bg-gray-100 border border-gray-300 rounded-md shrink-0">
                                                        +
                                                    </button>
                                                </div>
                                                <div>
                                                    <button onClick={() => removeFromCart(item.productId)} className="font-medium text-red-600 text-end">
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex-1 w-full min-w-0 md:order-2 md:max-w-md">
                                                <p className="text-base font-medium">{item.nama}</p>
                                                <p className="text-base font-normal text-gray-500">Rp. {item.harga}</p>
                                            </div>
                                        </div>

                                    )) : <p className="text-center text-gray-500">Belum ada item yang ditambahkan</p>}
                                </div>
                            </div>
                            <h3 className="mt-4 text-2xl font-semibold">Pilih Item Pembelian</h3>
                            <input onChange={handleSearchChange} type="text" placeholder="Search" className="w-full p-2 mt-4 border rounded-md" />
                            <div className="grid grid-cols-3 gap-4 mt-6">
                                {filteredProducts.length ? filteredProducts.map((product) => (
                                    <div key={product.id} className="p-6 bg-white border rounded-lg">
                                        <a href="#" className="overflow-hidden rounded">
                                            <img className="mx-auto h-28 w-28" src={product.gambar} alt="product image" />
                                        </a>
                                        <p className="mt-3 text-lg font-semibold">{product.nama}</p>
                                        <p className="text-sm text-gray-500">{product.stok} Unit</p>
                                        <p className="text-base font-semibold text-gray-500">Rp. {product.harga}</p>
                                        <div className="mt-5 flex items-center gap-2.5">
                                            <button onClick={() => addToCart(product)} type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                <svg className="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                                </svg>
                                                Tambahkan
                                            </button>
                                        </div>
                                    </div>
                                )) : <p className="text-center text-gray-500">Belum ada data produk tersedia</p>}
                            </div>
                        </div>
                        <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                            <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                <p class="text-xl text-center font-bold text-gray-900 dark:text-white pb-6">Ringkasan Pembelian</p>

                                <div class="space-y-4">
                                    {cart.length > 0 && <dt class="text-base font-bold text-gray-900 dark:text-white">Sub Total</dt>}
                                    {cart.map((item) => (
                                        <div key={item.productId} class="space-y-2">
                                            <dl class="flex items-center justify-between gap-4">
                                                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">{item.nama}</dt>
                                                <dd class="text-base font-medium text-gray-900 dark:text-white">Rp. {item.harga * item.quantity}</dd>
                                            </dl>
                                        </div>
                                    ))}

                                    <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                        <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                        <dd class="text-base font-bold text-gray-900 dark:text-white">Rp. {total}</dd>
                                    </dl>
                                </div>

                                <div class="flex items-center justify-center pt-6">
                                    <button onClick={() => showPopUpConfirm()} type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        <svg className="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                        </svg>
                                        Selesaikan Pembelian
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section >
            
            {popUpConfirm && <PopUpConfirm
                data={{
                    'title': 'Konfirmasi Pembayaran',
                    'content': 'Transaksi akan dicatat dan struct akan dicetak ketika Anda menekan tombol penyelesaian, pastikan item telah sesuai'
                }}
                onConfirm={confirmTransaction}
                onCancel={() => setPopUpConfirm(false)} />
            }

            {popUpError?.visible && (
                <PopUpError
                    data={{
                        title: 'Transaksi Gagal',
                        content: popUpError.message,
                    }}
                    onClose={() => setPopUpError({ visible: false, message: "" })}
                />
            )}
        </>
    );

}
export default Payment;

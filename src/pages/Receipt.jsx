import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layouts/Navbar'
import Sidebar from '../components/layouts/Sidebar'
import { formatRupiah } from '../utils/function'
import { useLocation } from 'react-router-dom'

function Receipt() {

    const location = useLocation();
    const { cartItems, total } = location.state || {};

    const printReceipt = () => {
        window.print()
    }

    return (
        <>
            <div className='w-full h-full'>
                <Navbar />
                <Sidebar />
                <section className='min-h-screen p-3 pt-24 bg-gray-50 dark:bg-gray-900 sm:p-5 md:ml-64'>
                    <div className="p-8">
                        <h2 className="mt-4 mb-4 text-2xl font-semibold dark:text-gray-200">Transaksi Berhasil</h2>

                        {/* Display the purchase summary */}
                        <div className="p-6 bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <h3 className="mb-4 text-xl font-medium dark:text-gray-200">Ringkasan</h3>

                            <div>
                                {cartItems?.map((item, index) => (
                                    <div key={index} className="flex justify-between py-2 border-b">
                                        <span className='text-gray-400 dark:text-gray-200'>x{item.quantity} - {item.nama}</span>
                                        <span className='text-gray-400'>{formatRupiah(item.harga * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Total Price */}
                            <div className="flex justify-between py-4 font-semibold">
                                <span className='dark:text-gray-200'>Total</span>
                                <span className='dark:text-gray-200'>{formatRupiah(total)}</span>
                            </div>

                            {/* Print and back buttons */}
                            <div className="flex justify-end mt-6">
                                <Link to="/dashboard" className="px-6 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 me-3">
                                    Kembali
                                </Link>
                                <button
                                    onClick={printReceipt}
                                    className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                >
                                    Cetak Struk
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Receipt

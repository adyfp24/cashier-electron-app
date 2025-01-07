import React from 'react'

function ModalDetailHistory({ isOpen, transaction, onClose }) {
    if (!isOpen || !transaction) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="p-6 bg-white rounded-lg w-96">
                <div className='flex justify-center'>
                <h3 className="mb-6 text-xl font-semibold">Detail Riwayat Pembelian</h3>    
                </div>
                <div>
                    <h5 className="font-semibold">Tanggal Transaksi: <span className='font-medium text-gray-400'>{new Date(transaction.tanggal).toLocaleString()}</span></h5>
                    <h5 className="font-semibold">Total: <span className='font-medium text-gray-400'> Rp. {transaction.total}</span></h5>
                </div>
                <div className="mt-4">
                    <h5 className="font-semibold">Products:</h5>
                    <ul className="space-y-2">
                        {transaction.details.map((detail) => (
                            <li key={detail.id}>
                                <div className="flex justify-between">
                                    <span className='font-medium text-gray-400'>{detail.product.nama}</span>
                                    <span className='font-medium text-gray-400'>{detail.quantity} x Rp. {detail.product.harga} = Rp. {detail.subtotal}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="right-0 flex justify-end mt-6">
                    <button onClick={onClose} className="px-4 py-2 font-semibold text-gray-900 border border-2 border-gray-200 rounded rounded-lg">Close</button>
                </div>
            </div>
        </div>
    );
}

export default ModalDetailHistory
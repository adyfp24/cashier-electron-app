import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/layouts/Navbar';
import Sidebar from '../components/layouts/Sidebar';
import { TransactionContext } from '../context/transactionContext';
import ModalDetailHistory from '../components/fragments/ModalDetailHistory';

function TransactionHistory() {
    const {loading, error, transactions} = useContext(TransactionContext);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filterPeriod, setFilterPeriod] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    
    const handleDetailClick = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };

    useEffect(() => {
        setFilteredTransactions(transactions);
    }, [transactions]);

    const filterTransactions = (period) => {
        setFilterPeriod(period);
        const currentDate = new Date();
        let filteredData = [];
    
        const normalizeDate = (date) => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            return d;
        };
    
        const normalizedCurrentDate = normalizeDate(currentDate);
    
        switch (period) {
            case 'daily':
                filteredData = transactions.filter(transaction => 
                    normalizeDate(transaction.tanggal).getTime() === normalizedCurrentDate.getTime()
                );
                break;
            case 'weekly':
                const oneWeekAgo = new Date(normalizedCurrentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
                filteredData = transactions.filter(transaction => 
                    normalizeDate(transaction.tanggal).getTime() >= oneWeekAgo.getTime()
                );
                break;
            case 'monthly':
                filteredData = transactions.filter(transaction => {
                    const transactionDate = normalizeDate(transaction.tanggal);
                    return transactionDate.getMonth() === normalizedCurrentDate.getMonth() &&
                        transactionDate.getFullYear() === normalizedCurrentDate.getFullYear();
                });
                break;
            default:
                filteredData = transactions;
        }
    
        setFilteredTransactions(filteredData);
    };

    const exportReport = () => {
        console.log('Exporting report...');
    };

    return (
        <>
            <Navbar />
            <Sidebar />
            <section className="h-full p-3 pt-20 bg-gray-50 dark:bg-gray-900 sm:p-5 md:ml-64">
                <div className="max-w-screen-xl px-4 mx-auto lg:px-12">
                    <div className="relative mt-20 overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                            <div className="flex flex-col items-stretch flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                                <button 
                                    onClick={() => filterTransactions('all')} 
                                    className={`flex items-center border-2 justify-center bg-primary-700 hover:bg-primary-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 ${filterPeriod === 'all' ? 'bg-primary-800' : ''}`}
                                >
                                    Semua Waktu
                                </button>
                                <button 
                                    onClick={() => filterTransactions('daily')} 
                                    className={`flex items-center border-2 justify-center bg-primary-700 hover:bg-primary-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 ${filterPeriod === 'daily' ? 'bg-primary-800' : ''}`}
                                >
                                    Harian
                                </button>
                                <button 
                                    onClick={() => filterTransactions('weekly')} 
                                    className={`flex items-center border-2 justify-center bg-primary-700 hover:bg-primary-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 ${filterPeriod === 'weekly' ? 'bg-primary-800' : ''}`}
                                >
                                    Mingguan
                                </button>
                                <button 
                                    onClick={() => filterTransactions('monthly')} 
                                    className={`flex items-center border-2 justify-center bg-primary-700 hover:bg-primary-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 ${filterPeriod === 'monthly' ? 'bg-primary-800' : ''}`}
                                >
                                    Bulanan
                                </button>
                            </div>
                            <div className="flex flex-col items-stretch flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                                <button 
                                    onClick={exportReport} 
                                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                >
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Export Laporan
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col " className="px-4 py-3">No</th>
                                        <th scope="col" className="w-1/4 px-4 py-3">Tanggal</th>
                                        <th scope="col" className="px-4 py-3">Total</th>
                                        <th scope="col" className="px-4 py-3">Detail Pembelian</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTransactions.map((transaction, index) => (
                                        <tr key={transaction.id} className="border-b dark:border-gray-700">
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3">{transaction.tanggal}</td>
                                            <td className="px-4 py-3">Rp. {transaction.total.toFixed(2)}</td>
                                            <td className="px-4 py-3">
                                                <button onClick={() => handleDetailClick(transaction)} className="px-4 py-2 font-semibold text-gray-900 border border-2 border-gray-200 rounded rounded-lg">Detail</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                            </span>
                            <ul className="inline-flex items-stretch -space-x-px">
                                <li>
                                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Previous</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Next</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>

            <ModalDetailHistory
                isOpen={isModalOpen}
                transaction={selectedTransaction}
                onClose={closeModal}
            />
        </>
    );
}

export default TransactionHistory;
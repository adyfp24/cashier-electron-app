import React, { useRef, useEffect, useContext } from 'react';
import Navbar from '../components/layouts/Navbar';
import Sidebar from '../components/layouts/Sidebar';
import { Chart, registerables } from 'chart.js';
import { DashboardContext } from '../context/dashboardContext';
import { formatRupiah } from '../utils/function';

Chart.register(...registerables);

function LandingPage() {
    const { loading, error, allRecapData, getAllRecapData, availableYears, getAvailableYears } = useContext(DashboardContext);
    const chartRef = useRef(null);
    const [selectedMonth, setSelectedMonth] = useState(null); // null = all months
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        getAllRecapData({ month: selectedMonth, year: selectedYear });
    }, [selectedMonth, selectedYear]);  
    
    useEffect(() => {
        getAvailableYears();
    }, []);

    useEffect(() => {
        if (!chartRef.current || !allRecapData?.monthlyData) return;
    
        const ctx = chartRef.current.getContext('2d');
    
        const monthlyLabels = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
    
        const monthlyMap = Array(12).fill(null).map((_, index) => {
            const monthData = allRecapData.monthlyData.find(item => item.month === index + 1);
            return {
                totalProduct: monthData?.totalProduct ?? 0,
                totalProductSold: monthData?.totalProductSold ?? 0,
                totalTransaction: monthData?.totalTransaction ?? 0,
                totalIncome: monthData?.totalIncome ?? 0,
            };
        });
    
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: monthlyLabels,
                datasets: [
                    {
                        label: 'Total Produk',
                        data: monthlyMap.map(m => m.totalProduct),
                        borderColor: 'rgba(59, 130, 246, 0.7)',
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        fill: true,
                    },
                    {
                        label: 'Produk Terjual',
                        data: monthlyMap.map(m => m.totalProductSold),
                        borderColor: 'rgba(34, 197, 94, 0.7)',
                        backgroundColor: 'rgba(34, 197, 94, 0.2)',
                        fill: true,
                    },
                    {
                        label: 'Total Transaksi',
                        data: monthlyMap.map(m => m.totalTransaction),
                        borderColor: 'rgba(234, 179, 8, 0.7)',
                        backgroundColor: 'rgba(234, 179, 8, 0.2)',
                        fill: true,
                    },
                    {
                        label: 'Total Pendapatan (Rp)',
                        data: monthlyMap.map(m => m.totalIncome),
                        borderColor: 'rgba(239, 68, 68, 0.7)',
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { mode: 'index', intersect: false },
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false,
                },
                scales: {
                    x: { title: { display: true, text: 'Month' } },
                    y: { title: { display: true, text: 'Values' } },
                },
            },
        });
    
        return () => {
            myChart.destroy();
        };
    }, [allRecapData]);    

    return (
        <>
            <div className='w-full h-full'>
                <Navbar />
                <Sidebar />
                <main className="min-h-screen p-4 pt-20 bg-white md:ml-64 dark:bg-gray-900">
                    <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-3 lg:grid-cols-4">
                        <div className="flex items-center p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                            <div className="p-3 bg-blue-500 bg-opacity-75 rounded-full">
                                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a1 1 0 001 1h16a1 1 0 001-1V7M5 3h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Produk</h3>
                                <p className="text-lg font-bold dark:text-white">{allRecapData.totalProduct ?? 0}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                            <div className="p-3 bg-green-500 bg-opacity-75 rounded-full">
                                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2a2 2 0 012-2h6a2 2 0 012 2v2m-6-2v-6m0 0L9 7m3 2v6" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Produk Terjual</h3>
                                <p className="text-lg font-bold dark:text-white">{allRecapData.totalProductSold ?? 0}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                            <div className="p-3 bg-yellow-500 bg-opacity-75 rounded-full">
                                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-4-4m0 0l4-4m-4 4h12" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Transaksi</h3>
                                <p className="text-lg font-bold dark:text-white">{allRecapData.totalTransaction ?? 0}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                            <div className="p-3 bg-red-500 bg-opacity-75 rounded-full">
                                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8M13 13h8m-8-4h8m-8-4h8M4 20l4-16m-4 0h16" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Pendapatan</h3>
                                <p className="text-lg font-bold dark:text-white">{formatRupiah(allRecapData.totalIncome) ?? 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">Grafik Penjualan</h3>

                        <div className="flex flex-wrap gap-4 mb-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Tahun</label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                    className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                                >
                                    {availableYears?.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Bulan</label>
                                <select
                                    value={selectedMonth ?? ''}
                                    onChange={(e) => setSelectedMonth(e.target.value ? parseInt(e.target.value) : null)}
                                    className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="">Semua Bulan</option>
                                    {[
                                        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                                        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
                                    ].map((monthName, index) => (
                                        <option key={index + 1} value={index + 1}>{monthName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <canvas ref={chartRef} className="h-64"></canvas>
                    </div>
                </main>
            </div>
        </>
    );
}

export default LandingPage;

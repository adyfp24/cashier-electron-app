import React, { useRef, useEffect} from 'react';
import Navbar from '../components/layouts/Navbar';
import Sidebar from '../components/layouts/Sidebar';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function LandingPage() {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Total Produk',
                        data: [1000, 2000, 1500, 3000, 2000, 4000, 3500, 3000, 4500, 5000, 5200, 6000],
                        borderColor: 'rgba(59, 130, 246, 0.7)', // Blue
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        fill: true,
                    },
                    {
                        label: 'Produk Terjual',
                        data: [500, 1000, 750, 1500, 1000, 2000, 1800, 1500, 2200, 2500, 2600, 3000],
                        borderColor: 'rgba(34, 197, 94, 0.7)', // Green
                        backgroundColor: 'rgba(34, 197, 94, 0.2)',
                        fill: true,
                    },
                    {
                        label: 'Total Transaksi',
                        data: [200, 400, 300, 600, 400, 800, 700, 600, 900, 1000, 1040, 1200],
                        borderColor: 'rgba(234, 179, 8, 0.7)', // Yellow
                        backgroundColor: 'rgba(234, 179, 8, 0.2)',
                        fill: true,
                    },
                    {
                        label: 'Total Pendapatan ($)',
                        data: [5000, 10000, 7500, 15000, 10000, 20000, 18000, 15000, 22000, 25000, 26000, 30000],
                        borderColor: 'rgba(239, 68, 68, 0.7)', // Red
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false,
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Month',
                        },
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Values',
                        },
                    },
                },
            },
        });

        return () => {
            myChart.destroy(); 
        };
    }, []);
    
    return (
        <>
            <Navbar />
            <Sidebar />
            <main className="h-auto p-4 pt-20 md:ml-64">
                <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-3 lg:grid-cols-4">
                    <div className="flex items-center p-4 bg-white rounded-lg shadow">
                        <div className="p-3 bg-blue-500 bg-opacity-75 rounded-full">
                            <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a1 1 0 001 1h16a1 1 0 001-1V7M5 3h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-700">Total Produk</h3>
                            <p className="text-2xl font-bold">1,234</p>
                        </div>
                    </div>

                    <div className="flex items-center p-4 bg-white rounded-lg shadow">
                        <div className="p-3 bg-green-500 bg-opacity-75 rounded-full">
                            <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2a2 2 0 012-2h6a2 2 0 012 2v2m-6-2v-6m0 0L9 7m3 2v6" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-700">Produk Terjual</h3>
                            <p className="text-2xl font-bold">567</p>
                        </div>
                    </div>

                    <div className="flex items-center p-4 bg-white rounded-lg shadow">
                        <div className="p-3 bg-yellow-500 bg-opacity-75 rounded-full">
                            <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-4-4m0 0l4-4m-4 4h12" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-700">Total Transaksi</h3>
                            <p className="text-2xl font-bold">89</p>
                        </div>
                    </div>

                    <div className="flex items-center p-4 bg-white rounded-lg shadow">
                        <div className="p-3 bg-red-500 bg-opacity-75 rounded-full">
                            <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8M13 13h8m-8-4h8m-8-4h8M4 20l4-16m-4 0h16" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-700">Total Pendapatan</h3>
                            <p className="text-2xl font-bold">$12,345</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-white rounded-lg shadow">
                    <h3 className="mb-4 text-lg font-semibold text-gray-700">Grafik Penjualan</h3>
                    <canvas ref={chartRef} className="h-64"></canvas>
                </div>
            </main>
        </>
    );
}

export default LandingPage;

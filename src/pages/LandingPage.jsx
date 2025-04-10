import React, { useRef, useEffect, useContext, useState } from 'react';
import Navbar from '../components/layouts/Navbar';
import Sidebar from '../components/layouts/Sidebar';
import { Chart, registerables } from 'chart.js';
import { DashboardContext } from '../context/dashboardContext';
import { formatRupiah } from '../utils/function';

Chart.register(...registerables);

function LandingPage() {
    const { loading, error, allRecapData, getAllRecapData, availableYears, getAvailableYears } = useContext(DashboardContext);
    const chartRef = useRef(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        getAllRecapData({ month: selectedMonth, year: selectedYear });
    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        getAvailableYears();
    }, []);

    useEffect(() => {
        if (!chartRef.current || !allRecapData?.monthList) return;

        const ctx = chartRef.current.getContext('2d');

        const monthlyLabels = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const monthlyMap = Array.from({ length: 12 }, (_, index) => {
            const found = allRecapData.monthList.find(m => parseInt(m.month) === index + 1);
            return {
                totalTransaction: found?.totalTransaction ?? 0,
                totalIncome: found?.totalIncome ?? 0,
            };
        });

        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: monthlyLabels,
                datasets: [
                    {
                        label: 'Total Transaksi',
                        data: monthlyMap.map((m) => m.totalTransaction),
                        borderColor: 'rgba(234, 179, 8, 0.7)',
                        backgroundColor: 'rgba(234, 179, 8, 0.2)',
                        fill: true,
                        yAxisID: 'y-transactions',
                    },
                    {
                        label: 'Total Pendapatan (Rp)',
                        data: monthlyMap.map((m) => m.totalIncome),
                        borderColor: 'rgba(239, 68, 68, 0.7)',
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        fill: true,
                        yAxisID: 'y-income',
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.dataset.label === 'Total Pendapatan (Rp)') {
                                    label += formatRupiah(context.raw);
                                } else {
                                    label += context.raw;
                                }
                                return label;
                            }
                        }
                    },
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false,
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Bulan' }
                    },
                    'y-transactions': {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Total Transaksi'
                        },
                        grid: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                    },
                    'y-income': {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Total Pendapatan (Rp)'
                        },
                        // grid line settings
                        grid: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                    },
                },
            },
        });

        return () => {
            myChart.destroy();
        };
    }, [allRecapData]);

    return (
        <div className='w-full h-full'>
            <Navbar />
            <Sidebar />
            <main className="min-h-screen p-4 pt-20 bg-white md:ml-64 dark:bg-gray-900">
                <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-3 lg:grid-cols-4">
                    <StatCard label="Total Produk" value={allRecapData?.totalProduct ?? 0} color="blue" iconPath="M3 7v10a1 1 0 001 1h16a1 1 0 001-1V7M5 3h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                    <StatCard label="Produk Terjual" value={allRecapData?.totalProductSold ?? 0} color="green" iconPath="M9 17v-2a2 2 0 012-2h6a2 2 0 012 2v2m-6-2v-6m0 0L9 7m3 2v6" />
                    <StatCard label="Total Transaksi" value={allRecapData?.totalTransaction ?? 0} color="yellow" iconPath="M11 17l-4-4m0 0l4-4m-4 4h12" />
                    <StatCard label="Total Pendapatan" value={formatRupiah(allRecapData?.totalIncome) ?? 0} color="red" iconPath="M13 17h8M13 13h8m-8-4h8m-8-4h8M4 20l4-16m-4 0h16" />
                </div>

                <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">Grafik Penjualan</h3>

                    <div className="flex flex-wrap gap-4 mb-4">
                        <Dropdown
                            label="Tahun"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                            options={availableYears}
                        />
                        <Dropdown
                            label="Bulan"
                            value={selectedMonth ?? ''}
                            onChange={(e) => setSelectedMonth(e.target.value ? parseInt(e.target.value) : null)}
                            options={['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']}
                            allowAll
                        />
                    </div>

                    <canvas ref={chartRef} className="h-64"></canvas>
                </div>
            </main>
        </div>
    );
}


function StatCard({ label, value, color, iconPath }) {
    return (
        <div className="flex items-center p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <div className={`p-3 bg-${color}-500 bg-opacity-75 rounded-full`}>
                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
                </svg>
            </div>
            <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{label}</h3>
                <p className="text-lg font-bold dark:text-white">{value}</p>
            </div>
        </div>
    );
}

function Dropdown({ label, value, onChange, options, allowAll }) {
    return (
        <div>
            {/* <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label> */}
            <select
                value={value}
                onChange={onChange}
                className="p-2 border-2 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
            >
                {allowAll && <option value="">Semua Bulan</option>}
                {options.map((opt, idx) => (
                    <option key={idx} value={allowAll ? idx + 1 : opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default LandingPage;

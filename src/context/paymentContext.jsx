import React, { createContext, useEffect, useState } from "react";
import paymentService from '../services/paymentService';

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {

    const [purchasedItems, setPurchasedItems] = useState({
        id: 0,
        items: [],
        total: 0,
        tanggal: "",
    },);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const createPayment = async (newPayment) => {
        setLoading(true);
        try {
            const paymentData = await paymentService.createPayment(newPayment);
            setPurchasedItems({
                id: paymentData.id,
                items: paymentData.detailTransaksi.map((item) => ({
                    produk: item.produk,
                    jumlah: item.jumlahProduk,
                    harga: item.harga
                })),
                total: paymentData.total,
                tanggal: paymentData.tanggal
            });
        } catch (error) {
            setError(error)
        }
        setLoading(false);
    };

    const createReceipt = (data) => {
        setLoading(true);
        try {

        } catch (error) {
            setError(error)
        }
        setLoading(false);
    }

    return (
        <PaymentContext.Provider value={{
            loading,
            error,
            purchasedItems,
            createPayment,
            createReceipt
        }}>
            {children}
        </PaymentContext.Provider>
    )
}
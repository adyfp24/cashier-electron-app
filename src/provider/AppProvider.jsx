import React from "react";
import { ProductProvider } from "../context/productContext";
import { PaymentProvider } from "../context/paymentContext";
import { TransactionProvider } from "../context/transactionContext";
import { AuthProvider } from "../context/authContext";


export const AppProviders = ({ children }) => {
    return (
        <AuthProvider>
            <TransactionProvider>
                <PaymentProvider>
                    <ProductProvider>
                        {children}
                    </ProductProvider>
                </PaymentProvider>
            </TransactionProvider>
        </AuthProvider>
    )
}
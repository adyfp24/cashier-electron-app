import React from "react";
import { ProductProvider } from "../context/productContext";
import { PaymentProvider } from "../context/paymentContext";
import { TransactionProvider } from "../context/transactionContext";
import { AuthProvider } from "../context/authContext";
import { DashboardProvider } from "../context/dashboardContext";


export const AppProviders = ({ children }) => {
    return (
        <AuthProvider>
            <DashboardProvider>
                <TransactionProvider>
                    <PaymentProvider>
                        <ProductProvider>
                            {children}
                        </ProductProvider>
                    </PaymentProvider>
                </TransactionProvider>
            </DashboardProvider>
        </AuthProvider>
    )
}
import React from "react";
import { ProductProvider } from "../context/productContext";
import { PaymentProvider } from "../context/paymentContext";
import { TransactionProvider } from "../context/transactionContext";
import { AuthProvider } from "../context/authContext";
import { DashboardProvider } from "../context/dashboardContext";
import { SettingProvider } from "../context/settingContext";


export const AppProviders = ({ children }) => {
    return (
        <AuthProvider>
            <DashboardProvider>
                <TransactionProvider>
                    <PaymentProvider>
                        <ProductProvider>
                            <SettingProvider>
                                {children}
                            </SettingProvider>
                        </ProductProvider>
                    </PaymentProvider>
                </TransactionProvider>
            </DashboardProvider>
        </AuthProvider>
    )
}
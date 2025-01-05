import React from "react";
import { ProductProvider } from "../context/productContext";
import { PaymentProvider } from "../context/paymentContext";

export const AppProviders = ({ children }) => {
    return (
        <PaymentProvider>
            <ProductProvider>
                {children}
            </ProductProvider>
        </PaymentProvider>
    )
}
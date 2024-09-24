import React from "react";
import { ProductProvider } from "../context/productContext";

export const AppProviders = ({children}) => {
    return(
        <ProductProvider>
            {children}
        </ProductProvider>
    )
}
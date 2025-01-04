import React, { createContext, useEffect, useState } from "react"

export const TransactionContext = createContext();

export const PaymentProvider = ({ children }) => {

    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const createPayment = (newPayment) => {
        setLoading(true);
        try {
            
        } catch (error) {
            setError(error.message)
        }
        setLoading(false);
    };
    
    return (
        <PaymentContext.Provider value={{

        }}>
            {children}
        </PaymentContext.Provider>
    )
}
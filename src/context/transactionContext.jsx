import React, {createcontext, useState, useEffect} from 'react'
const transactionService = require('../services/transactionService');

export const TransactionContext = createcontext();

export const TransactionProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [transaction, setTransaction] = useState({});

    const getAllTransaction = async () => {
        setLoading(true);
        try {
            const allData = await transactionService.getAllTransaction();
            setTransactions(allData);
        } catch (error) {
            setError(error.message)
        }
        setLoading(false);
    }

    const getTransactionById = async (transactionId) => {
        setLoading(true);
        try {
            const data = await transactionService.getTransactionById(transactionId);
            setTransaction(data);
        } catch (error) {
            setError(error.message)
        }
        setLoading(false);
    }

    useEffect(() => {
        getAllTransaction();
    }, []);

    return (
        <TransactionContext.Provider value={{
            loading,
            error,
            transactions,
            transaction,
            getAllTransaction,
            getTransactionById
        }}>
            {children}
        </TransactionContext.Provider>
    )
}
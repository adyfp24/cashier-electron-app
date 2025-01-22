import React, {createContext, useState, useEffect} from 'react'
import transactionService from '../services/transactionService';

export const TransactionContext = createContext();

export const TransactionProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [transaction, setTransaction] = useState({});
    const [pagination, setPagination] = useState({});

    const getAllTransaction = async () => {
        setLoading(true);
        try {
            const allData = await transactionService.getAllTransaction();
            console.log(allData);
            setTransactions(allData.transactions);
            setPagination(allData.pagination);
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
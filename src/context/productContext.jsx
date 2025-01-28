import React, { createContext, useEffect, useState } from 'react';
import productService from '../services/productService'; // Mengimpor productService
import { useLocation } from 'react-router-dom';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const location = useLocation();

    const getAllProduct = async (page = 1) => {
        setLoading(true);
        try {
            const allProducts = await productService.getAll(page);
            setProducts(allProducts.products);
            setPagination(allProducts.pagination);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    const getProductById = async (id) => {
        setLoading(true);
        try {
            const fetchedProduct = await productService.getById(id);
            setProduct(fetchedProduct);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    const addProduct = async (newData) => {
        setLoading(true);
        try {
            const addedProduct = await productService.addProduct(newData);
            setProducts([...products, addedProduct]);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    const addCategory = async (newData) => {
        setLoading(true);
        try {
            await productService.addCategory(newData);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await productService.deleteProduct(id);
            setProducts(products.filter(product => product.id !== id)); 
            setError(null);
        } catch (err) {
            console.log(err);
            console.log(err.message || '')
            setError(err.message);
        }
        setLoading(false);
    };

    const updateProduct = async (id, updatedData) => {
        setLoading(true);
        try {
            const updatedProduct = await productService.updateProduct(id, updatedData);
            setProducts(products.map(product => (product.id === id ? updatedProduct : product))); 
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        getAllProduct();
    }, [location.pathname]);

    return (
        <ProductContext.Provider
            value={{
                product,
                products,
                error,
                loading,
                pagination,
                addProduct,
                addCategory,
                deleteProduct,
                updateProduct,
                getAllProduct,
                getProductById,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

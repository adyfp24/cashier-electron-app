import React, { createContext, useEffect, useState } from 'react';
import productService from '../services/productService'; // Mengimpor productService

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch all products
    const getAllProduct = async () => {
        setLoading(true);
        try {
            const allProducts = await productService.getAll();
            setProducts(allProducts);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    // Fetch product by ID
    const getProductById = async (id) => {
        setLoading(true);
        try {
            const fetchedProduct = await productService.getById(id);
            setProduct(fetchedProduct);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    // Add a new product
    const addProduct = async (newData) => {
        setLoading(true);
        try {
            const addedProduct = await productService.addProduct(newData);
            setProducts([...products, addedProduct]); // Menambahkan produk baru ke state products
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    // Delete a product
    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await productService.deleteProduct(id);
            setProducts(products.filter(product => product.id !== id)); // Menghapus produk dari state products
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    // Update a product
    const updateProduct = async (id, updatedData) => {
        setLoading(true);
        try {
            const updatedProduct = await productService.updateProduct(id, updatedData);
            setProducts(products.map(product => (product.id === id ? updatedProduct : product))); // Memperbarui produk di state products
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    // Fetch all products on component mount
    useEffect(() => {
        getAllProduct();
    }, []);

    return (
        <ProductContext.Provider
            value={{
                product,
                products,
                error,
                loading,
                addProduct,
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

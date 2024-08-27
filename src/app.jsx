import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Product from './pages/Product'
import ProductDetail from './pages/ProductDetail'
import Payment from './pages/Payment'
import Receipt from './pages/Receipt'

function App() {
    return (
        <Routes>
            <Route path='/' element={<LandingPage />}></Route>
            <Route path='/product' element={<Product />}></Route>
            <Route path='/product/:id' element={<ProductDetail />}></Route>
            <Route path='/payment' element={<Payment />}></Route>
            <Route path='/receipt' element={<Receipt />}></Route>
        </Routes>
    )
}

export default App
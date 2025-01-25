import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Product from './pages/Product'
import ProductDetail from './pages/ProductDetail'
import Payment from './pages/Payment'
import Receipt from './pages/Receipt'
import AuthPage from './pages/AuthPage'
import TransactionHistory from './pages/TransactionHistory'
import Setting from './pages/Setting'

function App() {
    return (
        <Routes>
            <Route path='/' element={<AuthPage />}></Route>
            <Route path='/dashboard' element={<LandingPage />}></Route>
            <Route path='/product' element={<Product />}></Route>
            <Route path='/product/:id' element={<ProductDetail />}></Route>
            <Route path='/payment' element={<Payment />}></Route>
            <Route path='/receipt' element={<Receipt />}></Route>
            <Route path='/history' element={<TransactionHistory />}></Route>
            <Route path='/setting' element={<Setting />}></Route>
        </Routes>
    )
}

export default App
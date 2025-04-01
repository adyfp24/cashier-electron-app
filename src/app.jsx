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
import Protected from './pages/Protected'

function App() {
    return (
        <Routes>
            {/* public route */}
            <Route path='/' element={<AuthPage />}></Route>

            {/* protected route */}
            <Route element={<Protected />}>
                <Route path='/dashboard' element={<LandingPage />}></Route>
                <Route path='/product' element={<Product />}></Route>
                <Route path='/payment' element={<Payment />}></Route>
                <Route path='/receipt' element={<Receipt />}></Route>
                <Route path='/history' element={<TransactionHistory />}></Route>
                <Route path='/setting' element={<Setting />}></Route>
            </Route>
        </Routes>
    )
}

export default App
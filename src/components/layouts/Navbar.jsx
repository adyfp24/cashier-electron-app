import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <>
            <h1>Navbar</h1>
            <ul>
                <Link to='/product'>
                    <li> daftar product</li>
                </Link>
                <Link to='/product/:id'>
                    <li>detail product</li>
                </Link>
                <Link to='/payment'>
                    <li>halaman transaksi</li>
                </Link>
                <Link to='/receipt'>
                    <li>nota pembayaran</li>
                </Link>
            </ul>
        </>
    )
}

export default Navbar
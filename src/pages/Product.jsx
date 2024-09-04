import React from 'react'
import { Link } from 'react-router-dom'

function Product() {
    return (
        <>
            <div>Product</div>
            <br />
            <Link to='/dashboard'>
                <h1>kembali ke dashboard</h1>
            </Link>
        </>
    )
}

export default Product
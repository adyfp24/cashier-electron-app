import React from 'react'
import { Link } from 'react-router-dom'

function ProductDetail() {
    return (
        <>
            <div>Product detail</div>
            <br />
            <Link to='/'>
                <h1>kembali ke dashboard</h1>
            </Link>
        </>
    )
}

export default ProductDetail
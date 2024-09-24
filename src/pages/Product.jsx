import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductContext } from '../context/productContext'

function Product() {
    const { products, error, loading } = useContext(ProductContext)

    if (loading) {
        return <div>loading ...</div>
    }

    if (loading) {
        return <div>an error occured</div>
    }

    return (
        <>
            <div>Product</div>

            {products.length > 0 ? (
                <ul>
                    {products.map(product => (
                        <li>
                            <p>{product.nama}</p>
                            <p>{product.harga}</p>
                            <p>{product.kategori}</p>
                            <p>{product.keterangan}</p>
                        </li>
                    ))

                    }
                </ul>
            ) : (
                <div className="div">data produk kosong</div>
            )

            }

            <br />
            <Link to='/dashboard'>
                <h1>kembali ke dashboard</h1>
            </Link>
        </>
    )
}

export default Product
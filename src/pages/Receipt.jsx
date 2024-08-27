import React from 'react'
import { Link } from 'react-router-dom'

function Receipt() {
    return (
        <>
            <div>Receipt</div>
            <br />
            <Link to='/'>
                <h1>kembali ke dashboard</h1>
            </Link>
        </>
    )
}

export default Receipt
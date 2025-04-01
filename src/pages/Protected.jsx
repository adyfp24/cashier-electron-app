import react, { useContext } from 'react'
import { AuthContext } from '../context/authContext';
import { Outlet, Navigate } from 'react-router-dom';

function Protected() {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) return <p>Loading...</p>;

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default Protected
import React from 'react'
import {Navigate} from 'react-router-dom'

function ProtectedRoute({ children }) {
    return localStorage.getItem('accessToken') ? children : <Navigate to="/" />;
}

export default ProtectedRoute

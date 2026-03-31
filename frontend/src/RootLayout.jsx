import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from './components/layout/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './components/layout/Footer'
import apiClient from './services/apiClient'
import { setCart } from './store/slices/cartSlice.js'
import { initializeAuth } from './store/actions'

const RootLayout = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    useEffect(() => {
        if (user?.id) {
            apiClient.get('/cart')
                .then(cart => {
                    dispatch(setCart(cart));
                })
                .catch(err => console.error('Cart load error:', err));
        }
    }, [user?.id, dispatch]);

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default RootLayout

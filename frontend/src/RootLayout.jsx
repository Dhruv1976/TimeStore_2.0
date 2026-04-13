import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from './components/layout/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './components/layout/Footer'
import { initializeAuth, fetchCart } from './store/actions'

const RootLayout = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchCart());
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

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import "./app.css"
import RootLayout from './RootLayout'
import Products from './pages/Products'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import { Provider } from 'react-redux'
import store from './store/store'
import ProductPage from './pages/ProductPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ReturnPolicy from './pages/ReturnPolicy'
import Auth from './pages/Auth'
import Checkout from './pages/Checkout'
import Admin from './pages/Admin'
import MyOrders from './pages/MyOrders'
import AdminOrders from './pages/AdminOrders'
import { PrivateRoute, AdminRoute, AuthRoute } from './components/features/auth/ProtectedRoute'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} >
        <Route index element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/return-policy' element={<ReturnPolicy />} />
        <Route path='/auth' element={<AuthRoute><Auth /></AuthRoute>} />
        <Route path='/checkout' element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path='/admin' element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path='/admin/orders' element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path='/my-orders' element={<PrivateRoute><MyOrders /></PrivateRoute>} />
        <Route path='*' element={<h1 className='text-center mt-20 text-3xl'>404 - Page Not Found</h1>} />
      </Route>
    )
  )

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App

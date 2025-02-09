import { Route, Routes } from 'react-router-dom'
import AdminLayout from './components/admin-view/layout'
import AuthLayout from './components/auth/layout'
import ShoppingLayout from './components/shopping-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminFeatures from './pages/admin-view/features'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/products'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import NotFound from './pages/not-found'

import { Skeleton } from "@/components/ui/skeleton"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckAuth from './components/common/check-auth'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/lisiting'
import PaymentSuccessPage from './pages/shopping-view/payment-success'
import PaypalReturnPage from './pages/shopping-view/paypal-return'
import UnauthPage from './pages/unauth-page'
import { checkAuth } from './store/auth-slice'


function App() {

    const {isAuthenticated,user,isLoading} = useSelector(state =>state.auth)
    const dispatch = useDispatch();

  useEffect(() => {  
    dispatch(checkAuth())
  }, [dispatch])
  
  if (isLoading) {
    return (
      <Skeleton className="w-[800px] bg-black h-[600px] " />
    )
  }

  return (
    <>
      <div className='flex flex-col overflow-hidden bg-white '>
        <Routes>
          {/* login and register routes */}
          <Route path='/auth' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          } >
            <Route path='login' element={<AuthLogin />} />
            <Route path='register' element={<AuthRegister />} />
          </Route>
          {/* admin routes */}
          <Route path='/admin' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }>
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='products' element=
              {<AdminProducts />} />
            <Route path='orders' element={<AdminOrders />} />
            <Route path='features' element={<AdminFeatures />} />
          </Route>
          {/* shop  routes*/}
          <Route path='/shop' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }>
            <Route path='home' element={<ShoppingHome />} />
            <Route path='listing' element={<ShoppingListing />} />
            <Route path='checkout' element={<ShoppingCheckout />} />  
            <Route path='account' element={<ShoppingAccount />} />
            <Route path='paypal-return' element={<PaypalReturnPage />} />
            <Route path='payment-success' element={<PaymentSuccessPage />} />
            <Route />
          </Route>
          <Route path='/unauth-page' element={<UnauthPage />} />
          {/* page not found route */}
          <Route path='*' element={<NotFound />} />

        </Routes>
      </div>
    </>
  )
}

export default App


// 2:54:21
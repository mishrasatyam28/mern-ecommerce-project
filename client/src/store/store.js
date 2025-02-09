import { configureStore } from "@reduxjs/toolkit"
import adminOrderSlice from './admin/order-slice/index'
import adminProductsSlice from './admin/product-slice/index'
import authReducer from './auth-slice/index'
import shopAddressSlice from './shop/address-slice/index'
import shopCartSlice from './shop/cart-slice/index'
import shopOrderSlice from './shop/order-slice'
import shopProductsSlice from './shop/product-slice/index'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        adminOrder: adminOrderSlice,
        shopProducts: shopProductsSlice,
        shopCart: shopCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder:shopOrderSlice
    }
})

export default store;
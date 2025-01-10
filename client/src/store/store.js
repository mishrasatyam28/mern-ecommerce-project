import { configureStore } from "@reduxjs/toolkit"
import adminProductsSlice from './admin/product-slice/index'
import authReducer from './auth-slice/index'
import shopCartSlice from './shop/cart-slice/index'
import shopProductsSlice from './shop/product-slice/index'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        shopProducts: shopProductsSlice,
        shopCart:shopCartSlice,
    }
})

export default store;
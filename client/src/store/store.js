import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice/index'
import adminProductsSlice from './admin/product-slice/index'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
    }
})

export default store;
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    isLoading: false,
    productList:[],
}

// Add new Product
export const addNewProduct = createAsyncThunk('/products/addnewproduct',
    async(formData) => {
        const result = await axios.post("http://localhost:5000/api/admin/products/add",
            formData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return result?.data;
    }
)

// fetch all products from database
export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts',
    async () => {
        const result =await axios.get("http://localhost:5000/api/admin/products/get",
        )
        return result?.data;
    }
)

// edit existing product from id
export const editProduct = createAsyncThunk('/products/editProduct',
    async ({ formData, id }) => {
        const result = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        return result?.data;
    }
);

// delete product using id
export const deleteProduct = createAsyncThunk('/product/deleteProduct',
    async ( id ) => {
       const result = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`) 
    }
)

const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true;

        })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
            console.log("Admin fetchproduct ", action.payload)

            state.isLoading = false;
            state.productList = action.payload.data;
        })
            .addCase(fetchAllProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.productList = []
        })
    }
})

export default AdminProductsSlice.reducer;

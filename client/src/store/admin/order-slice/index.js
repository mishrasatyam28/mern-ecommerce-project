import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderList: [],
    orderDetails:null,
}

export const getAllOrderForAdmin = createAsyncThunk('/order/getAllOrderForAdmin',
    async () => {
        const response = await axios.get('https://localhost:5000/api/admin/orders/get'
        )

        return response.data;
    }
)
export const getOrderDetailsForAdmin = createAsyncThunk('/order/getOrderDetailsForAdmin',
    async ({id}) => {
        const response = await axios.get(`https://localhost:5000/api/admin/orders/details/${id}`
        )

        return response.data;
    }
)


const adminOrderSlice = createSlice({
    name: 'adminOrderSlice',
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.orderDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrderForAdmin.pending, (state) => {
                    state.isLoading = true
                }).addCase(getAllOrderForAdmin.fulfilled, (state) => {
                    state.isLoading = false,
                    state.orderList = action.payload.data
                }).addCase(getAllOrderForAdmin.rejected, (state) => {
                    state.isLoading = false,
                    state.orderList = []
                }).addCase(getOrderDetailsForAdmin.pending, (state) => {
                    state.isLoading = true
                }).addCase(getOrderDetailsForAdmin.fulfilled, (state) => {
                    state.isLoading = false,
                    state.orderDetails = action.payload.data
                }).addCase(getOrderDetailsForAdmin.rejected, (state) => {
                    state.isLoading = false,
                        state.orderDetails = null;
                })
    }
})

export const {resetOrderDetails} = adminOrderSlice.actions

export default adminOrderSlice.reducer;

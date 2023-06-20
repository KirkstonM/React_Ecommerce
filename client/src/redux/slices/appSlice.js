import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    shopItems: [],
    isLoading: false,
    error: false
};

export const fetchProducts = createAsyncThunk('commerce/fetch', async (thunkAPI) => {
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json();
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const categoryProducts = createAsyncThunk('commerce/catefetch', async (query, thunkAPI) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${query}`)
        const data = await response.json()
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})

const appSlice = createSlice({
    name: 'commerce',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.cart.push(action.payload)
            }
        },
        clearCart: (state) => {
            state.cart = []
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = false
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.shopItems = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(categoryProducts.pending, (state) => {
                state.isLoading = true;
                state.error = false
            })
            .addCase(categoryProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.shopItems = action.payload;
            })
            .addCase(categoryProducts.rejected, (state, action) => {
                state.error = action.payload;
            })

    }

});

export const { addToCart, clearCart, removeItem } = appSlice.actions;
export default appSlice.reducer;



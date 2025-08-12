import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDocs, deleteDoc, updateDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";

const initialState = {
    products: [],
    productStatus: "idle",
}

export const getProducts = createAsyncThunk("products/getProducts", async () => {
    const response = await getDocs(collection(db, "products"));
    return response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const updateProduct = createAsyncThunk("products/updateProduct", async (product) => {
    const productRef = doc(db, "products", product.id);
    await updateDoc(productRef, product);
    return product;
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (productId) => {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
    return productId;
});

const ProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.productStatus = "loading";
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.productStatus = "succeeded";
            })
            .addCase(getProducts.rejected, (state) => {
                state.productStatus = "failed";
            })
            .addCase(updateProduct.pending, (state) => {
                state.productStatus = "loading";
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                state.productStatus = "succeeded";
            })
            .addCase(updateProduct.rejected, (state) => {
                state.productStatus = "failed";
            })
            .addCase(deleteProduct.pending, (state) => {
                state.productStatus = "loading";
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product.id !== action.payload);
                state.productStatus = "succeeded";
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.productStatus = "failed";
            });
    }
});

export const { setProducts } = ProductsSlice.actions;
export default ProductsSlice.reducer;

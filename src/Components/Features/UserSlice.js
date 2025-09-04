import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setDoc, getDoc, doc, getDocs, collection } from "firebase/firestore";
import { auth, db } from "../../Firebase/Firebase.js";
import { updateDoc } from "firebase/firestore";

const initialState = {
  userInfo: null,
  status: "idle",
};

export const getUserDoc = createAsyncThunk(
  "user/getUserDoc",
  async (userId = auth.currentUser.uid) => {
    const docRef = doc(db, "users", userId);
    const response = await getDoc(docRef);
    if (response.exists()) {
      return response.data();
    } else {
      throw new Error("No such document!");
    }
  }
);

export const getAllOrders = createAsyncThunk('user/getAllOrders', async () => {
  const response = await getDocs(collection(db, "orders"));
  return response?.docs?.map(doc => doc.data()) || [];
});

export const getUserOrders = createAsyncThunk('user/getUserOrders', async (userId = auth.currentUser.uid) => {
  const docRef = doc(db, "orders", userId);
  const response = await getDoc(docRef);
  if (response.exists()) {
    return {orders: response.data().orders || [], paymentInfo: response.data().paymentInfo || {}};
  } else {
    throw new Error("No such document!");
  }
});

export const updateUserOrder = createAsyncThunk('user/updateUserOrder', async ({ userId = auth.currentUser.uid, orderId, updatedData }) => {
  const docRef = doc(db, "orders", userId);
  const userSnap = await getDoc(docRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    const orders = [...(userData.orders || [])];
    const orderIndex = orders.findIndex((order) => order.OrderId === orderId);

    if (orderIndex !== -1) {
      orders[orderIndex] = { ...orders[orderIndex], ...updatedData };
      await updateDoc(docRef, { orders });
      return orders;
    } else {
      throw new Error("Order not found");
    }
  } else {
    throw new Error("User doc not found");
  }
});

export const deleteUserOrder = createAsyncThunk('user/deleteUserOrder', async ({userId = auth.currentUser.uid, orderId})=> {
  const docRef = doc(db, "orders", userId);
  const userSnap = await getDoc(docRef);

  if (userSnap.exists()) {
    
    const userData = userSnap.data()
    const orders = [...(userData.orders || [])]
    const orderIndex = orders.findIndex((order)=> order.OrderId === orderId);
    if (orderIndex !== -1) {
      
      const newOrders = orders.filter((order) => order.OrderId !== orderId);
      await updateDoc(docRef, { orders: newOrders });
      return newOrders;
    } else {
      throw new Error('Order not found')
    }
    
  } else {
    throw new Error('User doc not found');
  }
})


export const addUserDoc = createAsyncThunk(
  "user/addUserDoc",
  async (userData) => {
    const docRef = doc(db, "users", userData.uid);
    await setDoc(docRef, userData);
    return userData;
  }
);

export const updateCartQuantity = createAsyncThunk('user/updateCartQuantity', async ({cartId, quantity}) => {
  const userId = auth.currentUser.uid;
  const docRef = doc(db, "users", userId);
  const userSnap = await getDoc(docRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    let cart = [...(userData.cart || [])];

    // Find the item to update
    const itemToUpdate = cart.find((item) => item.id === cartId);
    if (itemToUpdate) {
      itemToUpdate.quantity = quantity;
      await updateDoc(docRef, { cart });
      return cart;
    } else {
      throw new Error("Cart item not found");
    }
  } else {
    throw new Error("User doc not found");
  }
});

export const updateUserCart = createAsyncThunk(
  "user/updateUserCart",
  async ({ userId, cartItem}) => {
    const docRef = doc(db, "users", userId);
    const userSnap = await getDoc(docRef);

    if (userSnap.exists()) {

      const userData = userSnap.data();
      let cart = [...(userData.cart || [])];

      const alreadyExists = cart.some((item) => item.id === cartItem.id);

      let newCart;
      if (alreadyExists) {
        newCart = cart; // same cart return, no change
      } else {
        newCart = [...cart, cartItem];
        await updateDoc(docRef, { cart: newCart });
      }

      return newCart;
    } else {
      throw new Error("User doc not found");
    }
  }
);

export const clearCart = createAsyncThunk(
  "user/clearCart",
  async (userId) => {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, { cart: [] });
    return [];
  }
);

export const deleteCart = createAsyncThunk(
  "user/deleteCart",
  async ({ userId, delItem }) => {
    const docRef = doc(db, "users", userId);
    const userSnap = await getDoc(docRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const newCart = userData.cart.filter((item) => item.id !== delItem.id);

      await updateDoc(docRef, { cart: newCart });
      return newCart;
    } else {
      throw new Error("User doc not found");
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserDoc.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserDoc.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLoggedIn = true;
        state.status = "succeeded";
      })
      .addCase(getUserDoc.rejected, (state) => {
        state.userInfo = null;
        state.status = "failed";
      })
      .addCase(addUserDoc.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUserDoc.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLoggedIn = true;
        state.status = "succeeded";
      })
      .addCase(addUserDoc.rejected, (state) => {
        state.userInfo = null;
        state.status = "failed";
      })
      .addCase(updateUserCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserCart.fulfilled, (state, action) => {
        state.userInfo.cart = action.payload;

        state.status = "succeeded";
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.userInfo.cart = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.userInfo.cart = action.payload;
      })
      .addCase(deleteCart.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getUserOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userInfo.orders = action.payload.orders;
        state.userInfo.paymentInfo = action.payload.paymentInfo;
        state.status = "succeeded";
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(clearCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.userInfo.cart = action.payload;
        state.status = "succeeded";
      })
      .addCase(clearCart.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.userInfo.allOrders = action.payload;
        state.status = "succeeded";
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateUserOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserOrder.fulfilled, (state, action) => {
        state.userInfo.orders = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateUserOrder.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteUserOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserOrder.fulfilled, (state, action) => {
        state.userInfo.orders = action.payload;
        state.status = "succeeded";
      })
      .addCase(deleteUserOrder.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setUser, logout } = UserSlice.actions;
export default UserSlice.reducer;

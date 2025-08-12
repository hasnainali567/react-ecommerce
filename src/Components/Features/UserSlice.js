import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setDoc, getDoc, doc, } from "firebase/firestore";
import { auth, db } from '../../Firebase/Firebase.js'
import { updateDoc, arrayUnion } from "firebase/firestore";
import { u } from "motion/react-client";


const initialState = {
  userInfo: null,
  status: 'idle',
};

export const getUserDoc = createAsyncThunk("user/getUserDoc", async (userId = auth.currentUser.uid) => {
  const docRef = doc(db, 'users', userId);
  const response = await getDoc(docRef);
  if (response.exists()) {
    return response.data();
  } else {
    throw new Error('No such document!');
  }
});

export const addUserDoc = createAsyncThunk("user/addUserDoc", async (userData) => {
  const docRef = doc(db, 'users', userData.uid);
  await setDoc(docRef, userData);
  return userData;
});

export const updateUserCart = createAsyncThunk(
  'user/updateUserCart',
  async ({ userId, cartItem }) => {   // dono params as object le lo
    const docRef = doc(db, 'users', userId);
    const userSnap = await getDoc(docRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      let updatedCart = [...(userData.cart || [])];

      const existingIndex = updatedCart.findIndex(item => item.id === cartItem.id);

      if (existingIndex !== -1) {
        updatedCart[existingIndex].quantity += cartItem.quantity;
      } else {
        updatedCart.push(cartItem);
      }

      await updateDoc(docRef, { cart: updatedCart });

      return updatedCart;
    } else {
      throw new Error('User doc not found');
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
        state.status = 'loading';
      })
      .addCase(getUserDoc.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLoggedIn = true;
        state.status = 'succeeded';
      })
      .addCase(getUserDoc.rejected, (state) => {
        state.userInfo = null;
        state.status = 'failed';
      })
      .addCase(addUserDoc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUserDoc.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLoggedIn = true;
        state.status = 'succeeded';
      })
      .addCase(addUserDoc.rejected, (state) => {
        state.userInfo = null;
        state.status = 'failed';
      })
      .addCase(updateUserCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserCart.fulfilled, (state, action) => {

        state.userInfo.cart = action.payload;

        state.status = 'succeeded';
      })

      .addCase(updateUserCart.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const { setUser, logout } = UserSlice.actions;
export default UserSlice.reducer;

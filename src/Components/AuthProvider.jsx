// AuthProvider.jsx
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./Features/UserSlice.js";
import { getUserDoc } from "./Features/UserSlice.js";
import { useNavigate } from "react-router-dom";
import { getProducts } from "./Features/ProductsSlice.js";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products?.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docSnap = await dispatch(getUserDoc(currentUser.uid)).unwrap();

        if (docSnap) {
          dispatch(setUser(docSnap));
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return children;
}

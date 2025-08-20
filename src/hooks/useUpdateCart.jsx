import { useSelector, useDispatch } from "react-redux";
import { updateUserCart } from "../Components/Features/UserSlice.js";
import { useCallback } from "react";

const useUpdateCart = () => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.user.status);

    const addToCart = useCallback(async (data) => {
        try {
            console.log("Adding to cart:", data);
            await dispatch(updateUserCart(data)).unwrap();
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    }, [dispatch]);

    return { addToCart, status };
};

export default useUpdateCart;

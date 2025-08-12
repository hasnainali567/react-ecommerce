import { useSelector, useDispatch } from "react-redux";
import { updateUserCart } from "../Components/Features/UserSlice.js";

const useUpdateCart = () => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.user.status);

    const addToCart = async (data) => {
        try {
            await dispatch(updateUserCart(data)).unwrap();
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    return { addToCart, status };
};

export default useUpdateCart;

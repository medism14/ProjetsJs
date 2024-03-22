import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const NotFound = () => {

    const { isLoggedIn } = useSelector((state) => state.user);
    const navigateTo = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigateTo('/produits');
        } else {
            navigateTo('/');
        }
    }, [])

}

export default NotFound;
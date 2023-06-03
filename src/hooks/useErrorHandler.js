import {LOGIN_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";
import {deleteToken} from "../utils/storage";
import {useDispatch} from "react-redux";
import {setUser} from "../store/reducers/auth/authSlice";

export function useErrorHandler() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return useCallback((e) => {
        if (e.response && e.response.data.message) {
            alert(e.response.data.message);
            if (e.response.status === 401) {
                deleteToken();
                dispatch(setUser(null));
                navigate(LOGIN_ROUTE);
            }
        } else {
            alert(e.message);
        }
    }, [navigate]);
}
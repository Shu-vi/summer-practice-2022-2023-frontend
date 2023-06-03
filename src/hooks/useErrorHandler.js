import {LOGIN_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";
import {deleteToken} from "../utils/storage";

export function useErrorHandler() {
    const navigate = useNavigate();

    return useCallback((e) => {
        if (e.response && e.response.data.message) {
            alert(e.response.data.message);
            if (e.response.status === 401) {
                deleteToken();
                navigate(LOGIN_ROUTE);
            }
        } else {
            alert(e.message);
        }
    }, [navigate]);
}
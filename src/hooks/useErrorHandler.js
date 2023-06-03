import {LOGIN_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

export function UseErrorHandler() {
    const navigate = useNavigate();
    return function errorHandler(e) {
        if (e.response.data.message) {
            alert(e.response.data.message);
            if (e.response.status === 401) {
                navigate(LOGIN_ROUTE);
            }
        } else {
            alert(e.message);
        }
    }
}
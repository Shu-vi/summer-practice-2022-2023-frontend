import {fetchUser, loginUser} from "../../../api/UserApi";
import {deleteToken, saveToken} from "../../../utils/storage";
import {loginUserError, loginUserLoading, loginUserSuccess, setUser} from "./authSlice";

export const actionLoginUser = ({username, password}) => async (dispatch) => {
    try {
        dispatch(loginUserLoading())
        const token = await loginUser({username, password});
        saveToken(token);
        const user = await fetchUser(username);
        dispatch(loginUserSuccess(user));
        return user;
    } catch (e) {
        dispatch(loginUserError(e.message));
    }
}

export const actionLogout = () => async (dispatch) => {
    deleteToken();
    dispatch(setUser(null));
}
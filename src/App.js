import AppRouter from "./components/AppRouter";
import NavigationBar from "./components/NavigationBar";
import {useEffect} from "react";
import {getUsername} from "./utils/storage";
import {fetchUser} from "./api/UserApi";
import {useDispatch} from "react-redux";
import {setUser} from "./store/reducers/auth/authSlice";
import {useErrorHandler} from "./hooks/useErrorHandler";

function App() {
    const dispatch = useDispatch();
    const errorHandler = useErrorHandler();
    useEffect(() => {
        const username = getUsername();
        if (username) {
            fetchUser(username)
                .then(user => {
                    dispatch(setUser(user));
                })
                .catch(e => errorHandler(e));
        }
    }, []);
    return (
        <>
            <NavigationBar/>
            <AppRouter/>
        </>
    );
}

export default App;

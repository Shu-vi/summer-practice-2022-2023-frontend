import AppRouter from "./components/AppRouter";
import NavigationBar from "./components/NavigationBar";
import {useEffect} from "react";
import {getUsername} from "./utils/storage";
import {fetchUser} from "./api/UserApi";
import {useDispatch} from "react-redux";
import {setUser} from "./store/reducers/auth/authSlice";
import {useErrorHandler} from "./hooks/useErrorHandler";
import {fetchGameByUsername} from "./api/GameApi";
import {useNavigate} from "react-router-dom";
import {GAME_ROUTE} from "./utils/consts";

function App() {
    const dispatch = useDispatch();
    const errorHandler = useErrorHandler();
    const navigate = useNavigate();
    useEffect(() => {
        const username = getUsername();
        if (username) {
            fetchUser(username)
                .then(user => {
                    dispatch(setUser(user));
                })
                .then(() => {
                    return fetchGameByUsername(username);
                })
                .then(game => {
                    if (game){
                        navigate(GAME_ROUTE + '/' + game.id);
                    }
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

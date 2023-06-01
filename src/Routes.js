import {ADMIN_ROUTE, GAME_ROUTE, GAMES_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Admin from "./pages/Admin";
import Games from "./pages/Games";
import Auth from "./pages/Auth";
import Game from "./pages/Game";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
];


export const publicRoutes = [
    {
        path: GAMES_ROUTE,
        Component: Games
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: GAME_ROUTE + '/:id',
        Component: Game
    }
];
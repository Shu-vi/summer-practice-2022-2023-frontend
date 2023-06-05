import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {ANY_ROUTE, GAMES_ROUTE} from "../utils/consts";
import {authRoutes, publicRoutes} from "../Routes";
import {useSelector} from "react-redux";

const AppRouter = () => {
    const user = useSelector(state => state.auth.user);
    return (
        <Routes>
            {(user && user.role === 'ADMIN') && authRoutes.map(({path, Component}) => {
                return (
                    <Route key={path} path={path} element={<Component/>}/>
                );
            })}
            {publicRoutes.map(({path, Component}) => {
                return (
                    <Route key={path} path={path} element={<Component/>}/>
                );
            })}
            <Route path={ANY_ROUTE} element={<Navigate replace to={GAMES_ROUTE}/>}/>

        </Routes>
    );
};

export default AppRouter;
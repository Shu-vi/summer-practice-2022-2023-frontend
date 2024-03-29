import {$authHost, $host} from "./index";

export const fetchUser = async (username) => {
    const {data} = await $authHost.get('api/user/' + username);
    return data;
};

export const createUser = async ({firstName, lastName, username, password, city, district}) => {
    const {data} = await $host.post('api/user', {firstName, lastName, username, password, city, district});
    return data;
}

export const updateUser = async ({firstName, lastName, username, password, city, district, role}) => {
    const {data} = await $authHost.put('api/user/', {firstName, lastName, username, password, city, district, role});
    return data;
}

export const loginUser = async ({username, password}) => {
    const {data} = await $authHost.post('api/user/login', {username, password});
    return data;
}

export const getUsersByGameId = async (gameId) => {
    const {data} = await $authHost.post('api/user/by-game-id', {gameId});
    return data;
}

export const getAllUsers = async () => {
    const {data} = await $authHost.get('api/user/');
    return data;
}
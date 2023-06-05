import {$authHost, $host} from "./index";

export const fetchAll = async () => {
    const {data} = await $host.get('api/game/');
    return data;
};

export const createGame = async ({maxPlayers, owner, title}) => {
    const {data} = await $authHost.post('api/game', {maxPlayers, owner, title});
    return data;
};

export const fetchGameById = async (id) => {
    const {data} = await $authHost.get('api/game/' + id);
    return data;
};

export const fetchGameByUsername = async (username) => {
    const {data} = await $authHost.get('api/game/by-username/' + username);
    return data;
};

export const connectToGame = async (username, gameId) => {
    const {data} = await $authHost.post('api/game/connect/' + gameId, {username});
    return data;
};

export const disconnectFromGame = async (username, gameId) => {
    const {data} = await $authHost.post('api/game/disconnect/' + gameId, {username});
    return data;
};

export const countingConnectionByGameId = async (gameId) => {
    const {data} = await $authHost.get('api/game/count/' + gameId);
    return data;
};

export const searchGames = async (criterion) => {
    const {data} = await $host.post('api/game/search', {criterion});
    return data;
};
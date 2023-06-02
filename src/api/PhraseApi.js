import {$authHost} from "./index";

export const fetchPhrasesByGameId = async (id) => {
    const {data} = await $authHost.get('api/phrase/' + id);
    return data;
};

export const createPhrase = async ({gameId, username, text}) => {
    const {data} = await $authHost.post('api/game', {gameId, username, text});
    return data;
};
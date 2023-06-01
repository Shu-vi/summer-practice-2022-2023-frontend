import {$authHost, $host} from "./index";

export const fetchUser = async (username) => {
    const {data} = await $host.get('api/user/' + username);
    return data;
};

export const createUser = async ({ firstName, lastName, username, password, city, district }) => {
    const {data} = await $host.post('api/user', { firstName, lastName, username, password, city, district });
    return data;
}

export const updateUser = async ({firstName, lastName, username, password, city, district}) => {
    const {data} = await $authHost.put('api/user/', {firstName, lastName, username, password, city, district});
    return data;
}

export const loginUser = async ({username, password}) => {
    const {data} = await $authHost.post('api/user/login', {username, password});
    return data;
}
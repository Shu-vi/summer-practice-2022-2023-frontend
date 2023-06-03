import jwtDecode from "jwt-decode";

export function getUsername() {
    let token = localStorage.getItem('token');
    try {
        if (token) {
            const data = jwtDecode(JSON.parse(token).token);
            return data.username;
        } else {
            return null;
        }
    } catch (e) {
        console.error(e.message);
    }
}

export function deleteToken() {
    localStorage.removeItem('token');
}

export function saveToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
}
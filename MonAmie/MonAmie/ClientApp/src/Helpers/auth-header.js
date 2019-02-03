// returns an authorization header with jwt token
export function authHeader() {
    var user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    }
    else {
        return {};
    }
}
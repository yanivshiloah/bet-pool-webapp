export const loginUser = (credentials) => {
    return fetch('http://localhost:3000/api/auth/login', creds, {headers: {'Content-Type': 'application/json'}})
}
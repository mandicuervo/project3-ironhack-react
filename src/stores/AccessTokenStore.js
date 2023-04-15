const JWT_TOKEN_kEY = 'accessToken';

let _accesToken = localStorage.getItem(JWT_TOKEN_kEY) || '';

export const setAccessToken = (token) => {
    localStorage.setItem(JWT_TOKEN_kEY, token)
    _accesToken = token
}

export const getAccessToken = () => {
    return _accesToken
}

export const logout = () => {
    localStorage.removeItem(JWT_TOKEN_kEY)
    localStorage.removeItem('cart')
    window.location.assign('/login')
}
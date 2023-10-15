import ApiService from "@/api/_api"

const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN = 'refresh_token'

const tokenService = {

    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },

    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token)
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY)
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN)
    },

    setRefreshToken(refreshToken) {
        localStorage.setItem(REFRESH_TOKEN, refreshToken)
    },

    removeRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN)
    },
}

const userStorage = {
    save(id, name = null, username = null) {
        localStorage.setItem('user_id', id)
    }
}


export default tokenService
export { tokenService, userStorage }
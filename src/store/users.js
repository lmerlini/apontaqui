import ApiService from "@/api/_api";
import tokenService from "@/services/_token";


const state = {
    user: {},
    token: null,
    refreshToken: null
}

const getters = {
    user: state => state.user,
    token: state => state.token,
}

const actions = {
    async fetchUser({ commit, state }) {
        try {
            if (tokenService.getToken() && !state.user) {
                const response = await ApiService.get('/users/me');
                commit('SET_USER', response.data);
            }
        } catch (error) {

            commit('CLEAR_TOKEN');
            commit('CLEAR_REFRESH_TOKEN');
            ApiService.removeHeader();
            console.error('Error fetching user:', error);
        }
    },

    async login({ commit, dispatch }, credentials) {
        try {
            const { data } = await ApiService.post('/auth/login', credentials);
            // Salvando tokens
            commit('SET_TOKEN', data.token);
            commit('SET_REFRESH_TOKEN', data.refreshToken);

            ApiService.setHeader(data.token);
            dispatch('fetchUser');

        } catch (error) {
            console.error('Error during login:', error);
            throw error
        }
    },

    async logout({ commit }) {
        try {
            await ApiService.post('/auth/logout');
            commit('CLEAR_TOKEN');
            commit('CLEAR_REFRESH_TOKEN');
            ApiService.removeHeader();

        } catch (error) {
            console.error('Error during logout:', error);
            throw error
        }
    },

    async refreshToken({ commit }) {
        try {
            const response = await ApiService.post('/refresh-token', {
                refreshToken: tokenService.getRefreshToken()
            });

            tokenService.setToken(response.data.token);
            tokenService.setRefreshToken(response.data.refreshToken);
            ApiService.setHeader();
            return Promise.resolve(response.data.token);
        } catch (error) {
            tokenService.removeToken();
            tokenService.removeRefreshToken();
            ApiService.removeHeader();
            // redirecionar o usuário para a página de login ou mostrar um pop-up

            return Promise.reject(error);
        }
    }

}

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
    SET_TOKEN(state, token) {
        state.token = token;
        tokenService.setToken(token);
    },
    SET_REFRESH_TOKEN(state, refreshToken) {
        state.refreshToken = refreshToken;
        tokenService.setRefreshToken(refreshToken);
    },
    CLEAR_TOKEN(state) {
        state.token = null;
        tokenService.removeToken();
    },
    CLEAR_REFRESH_TOKEN(state) {
        state.refreshToken = null;
        tokenService.removeRefreshToken();
    }
}

const users = {
    namespaced: true, state, getters, actions, mutations
}

export default users
export { users }
const state = {
    currentTheme: localStorage.getItem("app-theme") || ''
}

const getters = {
    getCurrentTheme: state => state.currentTheme,
}

const mutations = {
    SET_THEME(state, theme) {
        state.currentTheme = theme;
    },
}

const actions = {
    toggleTheme({ commit, state }) {
        const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
        commit('SET_THEME', newTheme);
        localStorage.setItem("app-theme", newTheme);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}

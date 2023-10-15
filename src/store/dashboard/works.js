import ApiService from "@/api/_api";

const URL = 'workentries'

const state = {
    works: [],
    workByClientId: null,
}

const getters = {
    works: state => state.works,
}

const actions = {
    async fetchWork({ commit }) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ApiService.get(`/${URL}/list`);
                commit('SET_WORK', response.data);
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    },

    async fetchWorkByClientId({ commit }, client_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ApiService.get(`/${URL}/list/${client_id}`);
                commit('SET_WORK_BY_CLIENT_ID', response.data);
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    },

    async addWork({ commit }, workData) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ApiService.post(`/${URL}/`, workData);
                commit('ADD_NEW_WORK', response.data);
                resolve()
            } catch (error) {
                reject(error)
            }
        })

    },


    async deleteWork({ commit }, data) {
        return new Promise(async (resolve, reject) => {
            try {
                await ApiService.delete(`/${URL}`, data);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },
}

const mutations = {

    SET_WORK(state, works) {
        state.works = works;
    },
    SET_WORK_BY_CLIENT_ID(state, client) {
        state.workByClientId = client;
    },
    ADD_NEW_WORK(state, work) {
        state.works.push(work);
    },


}

const works = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

export default works;
export { works };

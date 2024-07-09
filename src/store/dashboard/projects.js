import ApiService from "@/api/_api";

const URL = 'projects'

const state = {
    projects: [],
}

const getters = {
    projects: state => state.projects,
}

const actions = {
    async fetchProjects({ commit }) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ApiService.get(`/${URL}/list`);
                commit('SET_PROJECT', response.data);
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    },

    async addProject({ commit }, projectData) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ApiService.post(`/${URL}/create`, projectData);
                commit('ADD_NEW_PROJECT', response.data);
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    },

    async updateProject({ commit }, projectData) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ApiService.put(`/${URL}/update`, projectData);
                commit('UPDATE_PROJECT', response.data);
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    },

    async deleteProject({ commit }, data) {
        return new Promise(async (resolve, reject) => {
            try {
                await ApiService.delete(`/${URL}/delete`, data);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },
}

const mutations = {
    SET_PROJECT(state, projects) {
        state.projects = projects;
    },

    ADD_NEW_PROJECT(state, project) {
        state.projects.push(project);
    },

    UPDATE_PROJECT(state, project) {
        const index = state.projects.findIndex(p => p.id === project.id);
        if (index !== -1) {
            state.projects.splice(index, 1, project);
        }
    }
}

const projects = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

export default projects;
export { projects };

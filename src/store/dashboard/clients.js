import ApiService from "@/api/_api";

const URL = 'clients'

const state = {
    clients: [],
    currentClient: null,

}

const getters = {
    clients: state => state.clients,
    currentClient: state => state.currentClient,
}

const actions = {
    async fetchClients({ commit }) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ApiService.get(`/${URL}/`);
                commit('SET_CLIENTS', response.data);
                resolve()
            } catch (error) {
                console.error('Error fetching clients:', error);
                reject(error)
            }
        })
    },

    async fetchClientById({ commit }, id) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ApiService.get(`/${URL}/${id}`);
                commit('SET_CURRENT_CLIENT', response.data);
                resolve()
            } catch (error) {
                console.error('Error fetch client:', error);
                reject(error)
            }
        })
    },

    async addClient({ commit }, clientData) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ApiService.post(`/${URL}/`, clientData);
                commit('ADD_CLIENT', response.data);
                resolve()
            } catch (error) {
                console.error('Error create client:', error);
                reject(error)
            }
        })

    },

    async updateClient({ commit }, clientData) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ApiService.put(`/${URL}/${clientData.id}`, clientData);
                commit('UPDATE_CLIENT', response.data);
                resolve();
            } catch (error) {
                console.error('Error updating client:', error);
                reject(error);
            }
        });
    },

    async deleteClient({ commit }, id) {
        return new Promise(async (resolve, reject) => {
            try {
                await ApiService.delete(`/${URL}/${id}`);
                commit('DELETE_CLIENT', id);
                resolve();
            } catch (error) {
                console.error('Error deleting client:', error);
                reject(error);
            }
        });
    },

    async softDeleteClients({ commit }, id) {

        console.log(id);
        return new Promise(async (resolve, reject) => {
            try {
                await ApiService.delete(`/${URL}/softdelete`, { data: id });
                commit('DELETE_CLIENT', id);
                resolve();
            } catch (error) {
                console.error('Error deleting client:', error);
                reject(error);
            }
        });
    },
}

const mutations = {

    SET_CLIENTS(state, clients) {
        state.clients = clients;
    },
    SET_CURRENT_CLIENT(state, client) {
        state.currentClient = client;
    },
    ADD_CLIENT(state, client) {
        state.clients.push(client);
    },
    UPDATE_CLIENT(state, updatedClient) {
        const index = state.clients.findIndex(client => client.id === updatedClient.id);
        if (index !== -1) {
            state.clients.splice(index, 1, updatedClient);
        }
    },
    DELETE_CLIENT(state, id) {
        state.clients = state.clients.filter(client => client.id !== id);
    }

}

const clients = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

export default clients;
export { clients };

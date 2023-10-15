<template>
    <FormDefault title="Listagem de Clientes">
        <template #content>

            <v-data-table :headers="headers" 
            :loading="isLoading"
            :items="clients" :sort-by="[{ key: 'name', order: 'asc' }]"
                class="elevation-1">
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>Clientes</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>

                        <v-spacer></v-spacer>

                        <v-dialog v-model="dialog" max-width="90%">
                            <template #activator="{ props }">
                                <v-btn class="mb-2" v-bind="props">
                                    Novo Cliente
                                </v-btn>
                            </template>
                            <v-card :loading="isLoading">
                                <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="12" md="6">
                                                <v-text-field v-model="editedItem.name" label="Nome Cliente"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="12" md="6">
                                                <v-text-field v-model="editedItem.responsible"
                                                    label="Responsável"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="12" md="6">
                                                <v-text-field v-model="editedItem.email"
                                                    label="E-mail para contato"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="12" md="6">
                                                <v-text-field v-model="editedItem.phone"
                                                    label="Telefone (99)99999-9999"></v-text-field>
                                            </v-col>

                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text" @click="close">
                                        Cancelar
                                    </v-btn>
                                    <v-btn color="blue-darken-1" variant="text" @click.prevent="save">
                                        Salvar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                    </v-toolbar>
                </template>

                <template #item.actions="{ item }">
                    <v-icon size="small" class="me-2" @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon size="small" @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </template>
                <template #no-data>
                    <v-btn color="primary" @click="initializeTable">
                        Atualizar Planilha
                    </v-btn>
                </template>
            </v-data-table>
        </template>
    </FormDefault>
</template>
  

<script>

// TODO : refatorar código abstrair components
// TODO : refatorar toda a comunicação de alertas
// TODO : refatorar a comunicação de crud

import { VDataTable } from 'vuetify/labs/VDataTable'
import FormDefault from '@/components/FormDefault.vue'

export default {
    components: {
        VDataTable,
        FormDefault
    },
    async created() {
        await this.initializeTable()
    },

    data: () => ({
        clients: [],
        isLoading: false,
        dialog: false,
        dialogDelete: false,
        headers: [
            { title: 'Cliente', key: 'name', },
            { title: 'Responsável', key: 'responsible' },
            { title: 'E-mail', key: 'email' },
            { title: 'Telefone', key: 'phone' },
            { title: 'Actions', key: 'actions', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            name: '',
            responsible: '',
            email: '',
            phone: ''
        },
        defaultItem: {
            name: '',
            responsible: '',
            email: '',
            phone: ''
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Novo Cliente' : 'Editar'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        }
    },

    methods: {
        async initializeTable() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('clients/fetchClients');
                this.clients = this.$store.getters['clients/clients'];
            } catch (error) {
                console.error('Erro ao atualizar o cliente no componente:', error);
                this.$swal('Oops!', 'Ocorreu um erro ao buscar clientes, tente novamente mais tarde!!', 'error');
            }
            this.isLoading = false;
        },



        editItem(item) {
            this.editedIndex = this.clients.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.clients.indexOf(item)
            this.editedItem = Object.assign({}, item)

            this.$swal.fire({
                title: 'Você tem certeza?',
                text: "Você não poderá reverter isso!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, delete!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteItemConfirm()
                }
            })

        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },


        async updateClient() {
            try {
                await this.$store.dispatch('clients/updateClient', this.editedItem);
                this.$swal('Atualizado', 'Cliente atualizado com sucesso!', 'success');
            } catch (error) {
                this.$swal('Oops!', 'Ocorreu um erro ao atualizar o cliente.', 'error');
            }
        },

        async createClient() {
            try {
                await this.$store.dispatch('clients/addClient', this.editedItem);
                this.$swal('Cadastrado', 'Cliente Cadastrado com sucesso!', 'success');
            } catch (error) {
                this.$swal('Oops!', 'Ocorreu um erro ao cadastrar o cliente.', 'error');
            }
        },

        async save() {
            this.isLoading = true;

            if (this.editedIndex > -1) {
                this.updateClient()
            } else {
                this.createClient()
            }

            this.close();
            await this.initializeTable();

            this.isLoading = false;
        },

        async deleteItemConfirm() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('clients/deleteClient', this.editedItem.id);
                this.$swal('Deletado!', 'Cliente deletado com sucesso.', 'success');
                await this.initializeTable();
            } catch (error) {
                this.$swal('Oops!', 'Ocorreu um erro ao deletar o cliente.', 'error');
            }

            this.isLoading = false;
        }
    },
}
</script>

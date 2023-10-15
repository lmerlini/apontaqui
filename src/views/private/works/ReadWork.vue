<template>
    <FormDefault title="Listagem de Apontamentos">

        <template #header>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisa Inteligente" single-line
                hide-details></v-text-field>
        </template>
        <template #content>
            <v-data-table :headers="headers" :items="dataWorks" hide-actions class="elevation-1" select-all
                :loading="loading" :search="search">
            
            
            </v-data-table>
        </template>
    </FormDefault>
</template>

<script>
import FormDefault from '@/components/FormDefault.vue'
import { mapActions, mapGetters } from 'vuex'
import { formatDateBR } from '@/utils'

export default {
    name: 'ReadWork',
    components: {
        FormDefault
    },
    async created() {
        this.loading = true
        await this.fetchData()
        this.loading = false

    },
    data() {
        return {
            search: '',
            loading: false,
            dataWorks: [],
            headers: [
                { title: 'Cliente', key: 'name', },
                { title: 'Data Trabalho', key: 'service_date' },
                { title: 'Inicio Jornada', key: 'start_time' },
                { title: 'Fim Jornada', key: 'end_time' },
                { title: 'Refeição', key: 'break_duration' },
                { title: 'Total Trabalhado', key: 'daily_total' }
            ],
        }
    },
    computed: {
        ...mapGetters({
            storeWorks: 'works/works',
            storeClients: 'clients/clients'
        }),
    },
    methods: {
        ...mapActions('works', ['fetchWork']),
        ...mapActions('clients', ['fetchClients']),


        async fetchData() {
            try {
                await Promise.all([
                    this.fetchWork(),
                    this.fetchClients()
                ])
                this.handleTable()
            } catch (error) {
                alert(error)
            }
        },

        handleTable() {

            console.log(this.storeWorks);
            const mappedData = this.storeWorks.map(work => {
                const client = this.storeClients.find(client => client.id === work.client_id);
                return {
                    name: client ? client.name : '',
                    service_date: formatDateBR(work.service_date),
                    start_time: work.start_time,
                    end_time: work.end_time,
                    break_duration: work.break_duration,
                    daily_total: work.daily_total
                };
            });

            this.dataWorks = mappedData;
        }
    }
}
</script>
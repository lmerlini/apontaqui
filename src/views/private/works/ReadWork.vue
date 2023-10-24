<template>
    <FormDefault title="Listagem de Apontamentos">

        <template #header>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisa Inteligente" single-line
                hide-details></v-text-field>
        </template>
        <template #content>
            <v-data-table v-model="expanded" :headers="headers" :items="dataWorks" :loading="loading" :search="search"
                item-value="service_date" hide-actions class="elevation-1" show-expand>

                <template v-slot:item.daily_total="{ value }">
                    <v-chip :color="getColor(value)">
                        {{ value }}
                    </v-chip>
                </template>


                <template v-slot:expanded-row="{ item, columns }">
                    <tr>
                        <td :colspan="columns.length">
                            <v-container grid-list-xs>
                                <v-card height="100">
                                    {{ item.agenda_description }}
                                </v-card>
                            </v-container>

                        </td>
                    </tr>
                </template>

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
            mobileBreakpoint: 600,
            expanded: [],
            search: '',
            loading: false,
            dataWorks: [],
            headers: [
                { title: '', key: 'data-table-expand' },
                { title: 'Cliente', key: 'name', },
                { title: 'Data Trabalho', key: 'service_date' },
                { title: 'Inicio Jornada', key: 'start_time' },
                { title: 'Fim Jornada', key: 'end_time' },
                { title: 'Refeição', key: 'break_duration', align: 'center' },
                { title: 'Total Trabalhado', key: 'daily_total' },
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

        getColor(timeStr) {
            const parts = timeStr.split(':');
            const seconds = (+parts[0]) * 3600 + (+parts[1]) * 60 + (+parts[2]);

            if (seconds < 18000)
                return 'error';
            else
                return 'success';
        },
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
                    agenda_description: work.agenda_description,
                    daily_total: work.daily_total
                };
            });

            this.dataWorks = mappedData;
        }
    }
}
</script>
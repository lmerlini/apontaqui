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
                { title: 'Projeto', key: 'name', },
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
        }),
    },
    methods: {
        ...mapActions('works', ['fetchWork']),
        async fetchData() {
            try {
                await Promise.all([
                    this.fetchWork(),
                ])
                this.handleTable()
            } catch (error) {
                alert(error)
            }
        },

        handleTable() {
            console.log(this.storeWorks);

            this.dataWorks = this.storeWorks.map(w => {
                return {
                    name: w.project.name,
                    service_date: formatDateBR(w.service_date),
                    start_time: w.start_time,
                    end_time: w.end_time,
                    break_duration: w.break_time,
                    daily_total: w.daily_total
                }
            })
            
        }
    }
}
</script>
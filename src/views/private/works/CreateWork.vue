<template>
    <form-default title="Registro de Atividades" variant="tonal" prepend-icon="mdi-cash-register">
        <template #content>
            <v-form ref="form">
                <v-row class="mb-5">
                    <!-- Nome CLiente -->
                    <v-col cols="12" md="6">
                        <v-select :rules="[rules.required]" clearable label="Cliente" v-model="apontamento.client_id"
                            item-title="text" item-value="value" :items="clientOptions">

                        </v-select>

                    </v-col>
                    <!-- Inicio do trabalho -->
                    <v-col cols="12" md="6">
                        <v-text-field :rules="[rules.required, rules.validDate]" type="date" clearable
                            v-model="apontamento.service_date" label="Data de Serviço" />
                    </v-col>
                    <!-- horário inicio -->
                    <v-col cols="12" md="4">
                        <v-text-field :rules="[rules.required]" type="time" clearable v-model="apontamento.start_time"
                            label="Início Expediente" />
                    </v-col>
                    <!-- refeição -->
                    <v-col cols="12" md="2">
                        <v-text-field :rules="[rules.required]" type="number" v-model="apontamento.break_duration"
                            label="Pausa em Minutos" />
                    </v-col>
                    <!-- horário final -->
                    <v-col cols="12" md="4">
                        <v-text-field :rules="[rules.required]" type="time" clearable v-model="apontamento.end_time"
                            label="Final Expediente" />
                    </v-col>
                    <v-col cols="6" md="1" class="d-flex align-center justify-end ">
                        =
                    </v-col>
                    <v-col cols="6" md="1">
                        <v-btn stacked variant="plain" color="success" prepend-icon="mdi-timer">
                            {{ totalHours }}
                        </v-btn>
                    </v-col>
                    <v-col cols="12" md="12" class="quill">
                        <QuillEditor theme="snow" v-model:content="apontamento.agenda_description" content-type="html" />
                    </v-col>
                </v-row>

            </v-form>
        </template>

        <template #footer>
            <v-row>
                <v-col cols="12" md="6">
                    <v-btn block color="primary" @click="handleForm" dark>SALVAR REGISTRO</v-btn>
                </v-col>
                <v-col cols="12" md="6">
                    <v-btn block color="error" dark>LIMPAR</v-btn>
                </v-col>
            </v-row>
        </template>
    </form-default>
</template>

    
<script>
import { mapGetters, mapActions } from 'vuex';
import FormDefault from '@/components/FormDefault.vue'
import { addCurrentTimeToDate } from '@/utils'

export default {
    components: {
        FormDefault,
    },
    data: () => ({
        clientOptions: [],
        apontamento: {
            client_id: null,
            service_date: '',
            start_time: '',
            break_duration: 0,
            end_time: '',
            agenda_description: ''
        },
        rules: {
            required: value => !!value || 'Este campo é obrigatório.',
            validDate: value => /^\d{4}-\d{2}-\d{2}$/.test(value) || 'Data inválida.',
        }
    }),
    computed: {
        ...mapGetters('clients', ['clients']),
        ...mapGetters('works', ['works']),

        totalHours() {
            if (this.apontamento.start_time && this.apontamento.end_time) {
                const [startHour, startMinute] = this.apontamento.start_time.split(':').map(Number);
                const [endHour, endMinute] = this.apontamento.end_time.split(':').map(Number);

                const startDate = new Date(0, 0, 0, startHour, startMinute);
                const endDate = new Date(0, 0, 0, endHour, endMinute);

                const differenceMs = endDate - startDate;
                const breakMs = this.apontamento.break_duration * 60 * 1000; // Convertendo pausa em minutos para milissegundos

                const totalMs = differenceMs - breakMs;
                const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
                const totalMinutes = (totalMs % (1000 * 60 * 60)) / (1000 * 60);

                return `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}`;
            }

            return '00:00';
        }
    },
    async created() {
        try {
            await this.fetchClients();
            this.handleClients();
        } catch (error) {
            this.$swal('Oops!', 'Ocorreu um erro ao carregar dados de clientes, tente novamente mais tarde!!', 'error');
        }
    },
    methods: {
        ...mapActions('clients', ['fetchClients']),
        ...mapActions('works', ['fetchWork', 'addWork']),

        handleClients() {
            this.clientOptions = this.clients.map(c => ({ value: c.id, text: c.name }));
        },

        async handleForm() {
            const { valid } = await this.$refs.form.validate();
            if (valid) {
                if (!this.apontamento.agenda_description && !this.apontamento.agenda_description.trim().length > 0) {
                    this.$swal('Ação Proibida!', 'Não é possível salvar atividade sem Descrição!', 'error');
                    return
                }
                this.apontamento.service_date = addCurrentTimeToDate(this.apontamento.service_date)
                try {
                    await this.addWork(this.apontamento);
                    this.$swal('Sucesso!', 'Atividade inserida com sucesso.', 'success');
                    this.resetForm()

                } catch (error) {
                    this.$swal('Erro!', 'Oops, ocorreu um erro ao salvar atividade.', 'error');
                }

            } else {
                this.$swal('Atenção!', 'Por favor, verifique os campos e tente novamente.', 'warning');
            }
        },

        resetForm() {
            this.apontamento = {
                client_id: null,
                service_date: '',
                start_time: '',
                break_duration: 0,
                end_time: '',
                agenda_description: ''
            };
        },
    }
};
</script>
  
<style scoped>
.quill {
    height: 23rem !important;
}
</style>
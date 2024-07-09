<template>
    <pre>
        {{ projects }}
    </pre>
</template>


<script>
export default {

    async created() {
        await this.initializeTable()
    },

    data: () => ({
        projects: []
    }),

    methods: {
        async initializeTable() {            
            try {
                await this.$store.dispatch('projects/fetchProjects');
                this.projects = this.$store.getters['projects/projects'];
            } catch (error) {
                console.error('Erro ao atualizar o cliente no componente:', error);
                this.$swal('Oops!', 'Ocorreu um erro ao buscar clientes, tente novamente mais tarde!!', 'error');
            }

        },
    },
}
</script>

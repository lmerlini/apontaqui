<template>
    <v-list nav>
        <v-list-item :to="{ name: 'Clientes' }" prepend-icon="mdi-account-multiple" title="Clientes" value="myfiles" />
        <v-list-item :to="{ name: 'Usuários' }" prepend-icon="mdi-account" title="Usuários" value="shared"></v-list-item>
        <!-- <v-list-item :to="{ name: 'Apontamentos' }" prepend-icon="mdi-star" title="Apontamentos"
            value="Apontamentos"></v-list-item> -->

        <v-list-group value="Create">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi-hand-pointing-right" title="Apontamentos"></v-list-item>
            </template>

            <v-list-item v-for="([title, icon], i) in cruds" :to="{ name: title }" :key="i" :title="title"
                :prepend-icon="icon" :value="title">

            </v-list-item>
        </v-list-group>
    </v-list>
</template>

<script>
export default {
    data: () => ({
        open: ['Users'],

        cruds: [
            ['Apontar', 'mdi-plus-outline',],
            ['Listar', 'mdi-file-outline',],
            ['Atualizar', 'mdi-update',],
            ['Deletar', 'mdi-delete',],
        ],
    }),
}
</script>


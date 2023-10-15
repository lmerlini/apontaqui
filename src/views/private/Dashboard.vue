<script setup>

import { ref, computed } from 'vue'
import { useTheme } from "vuetify";
import { useStore } from "vuex";
import Navigation from '@/components/Navigation.vue';
import { useRouter } from 'vue-router';

const drawer = ref(null)
const rail = ref(null)
const store = useStore();
const theme = useTheme();
const router = useRouter();
let currentTheme = computed(() => store.getters['theme/getCurrentTheme']);

const toggleTheme = () => {
    store.dispatch('theme/toggleTheme');
    theme.global.name.value = currentTheme.value;
};


</script>

<template>
    <v-card>
        <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" style="cursor: pointer;">
            <v-list-item prepend-avatar=" https://randomuser.me/api/portraits/lego/8.jpg" title="John Leider" nav>
                <template v-slot:append>
                    <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
                </template>
            </v-list-item>

            <navigation />

        </v-navigation-drawer>

    </v-card>

    <v-app-bar>

        <v-app-bar-title>
            <v-btn :to="{ name: 'Aponta aqui' }" class="hand">
                Apontaí
            </v-btn>
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn @click="toggleTheme">
            <v-icon>
                {{ currentTheme === "dark" ? "mdi-lightbulb-off" : "mdi-lightbulb" }}
            </v-icon>
        </v-btn>
        <v-btn @click="logout">
            <v-icon>
                mdi-logout
            </v-icon>
        </v-btn>


    </v-app-bar>

    <v-main @click="rail = true">
        <v-container>            
            <router-view />
        </v-container>
    </v-main>
</template>

<style scoped>
.hand {
    cursor: url('@/assets/img/hand-32x-32x.png'), auto;
}
</style>
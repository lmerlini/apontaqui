<script setup>
import { computed } from "vue";
import { useTheme } from "vuetify";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const theme = useTheme();
const router = useRouter();
let currentTheme = computed(() => store.getters["theme/getCurrentTheme"]);

const toggleTheme = () => {
  store.dispatch("theme/toggleTheme");
  theme.global.name.value = currentTheme.value;
};

const logout = async (e) => {
  console.log(e);
  await store.dispatch("users/logout");
  router.push({ name: "Login" });
};
</script>

<template>
  <v-app-bar>
    <v-app-bar-title>
      <v-btn :to="{ name: 'Aponta aqui' }" class="hand"> Apontaí </v-btn>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn @click="toggleTheme">
      <v-icon>
        {{ currentTheme === "dark" ? "mdi-lightbulb-off" : "mdi-lightbulb" }}
      </v-icon>
    </v-btn>
    <v-btn @click="logout">
      <v-icon> mdi-logout </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<style scoped>
.hand:hover {
  cursor: url("@/assets/img/hand-32x-32x.png"), auto;
}
</style>
<script>
import { computed } from "vue";
import { useTheme } from "vuetify";
import { useStore } from "vuex";


export default {
  setup() {
    const theme = useTheme();
    const store = useStore();
    const currentTheme = computed(() => store.getters['theme/getCurrentTheme']);
   
    const toggleTheme = () => {
      store.dispatch('theme/toggleTheme');
      theme.global.name.value = currentTheme.value;
    };

    return {
      currentTheme,
      toggleTheme
    };
  },
};
</script>


<template>
  <!-- Header -->
  <v-app-bar>
    <div class="image-container" @click="goHome">
      <span>Apontai</span>
      <img src="@/assets/img/apontai.svg" />
    </div>

    <v-spacer></v-spacer>

    <!-- Botões no canto direito -->
    <v-btn to="/">Home</v-btn>
    <v-btn to="/login">Login</v-btn>
    <v-btn @click="toggleTheme">
      <v-icon>
        {{ currentTheme === "dark" ? "mdi-lightbulb" : "mdi-lightbulb-off" }}
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>


<style scoped>
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1.2rem;
  cursor: pointer;
}

.image-container span {
  font-weight: 600;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  margin-right: 4px;
}

.image-container img {
  height: 80px;
  width: 100px;
  overflow: hidden;
}
</style>
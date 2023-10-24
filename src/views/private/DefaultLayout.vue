
<script setup>
import { computed, ref } from "vue";
import Navigation from "@/components/Navigation.vue";
import AppBar from "@/components/AppBar.vue";

import { useRoute } from "vue-router";
import DashboardVue from "./Dashboard.vue";
const route = useRoute();

const isDash = computed(() => {
  console.log(route);
  if (route.path === "/dashboard") {
    return route.path === "/dashboard";
  }
  return false;
});

const drawer = ref(null);
const rail = ref(null);
</script>


<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      style="cursor: pointer"
    >
      <v-list-item
        prepend-avatar=" https://randomuser.me/api/portraits/lego/8.jpg"
        title="John Leider"
        nav
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>
      <navigation />
    </v-navigation-drawer>
  </v-card>

  <AppBar />
  <v-main @click="rail = true">
    <v-container>
      <DashboardVue v-if="isDash" />
      <router-view />
    </v-container>
  </v-main>
</template>

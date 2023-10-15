<script setup>
import Header from "@/components/Header.vue";
</script>

<template>
  <Header />
  <v-main>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="6" sm="8" md="6">
          <h1>Bem-vindo ao nosso site</h1>
          <p>Texto de apresentação.</p>
        </v-col>

        <v-col cols="6" sm="8" md="6" class="hidden-sm-and-down">
          imagem
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
  
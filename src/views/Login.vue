<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-alert
        v-if="hasError"
        color="error"
        icon="$error"
        title="ERRO INTERNO"
        closable
        text="Ocorreu um erro ao tentar efetuar login, tente novamente mais tarde!"
        class="mb-5"
      ></v-alert>
      <v-form fast-fail @submit.prevent="login">
        <v-text-field
          variant="outlined"
          v-model="username"
          label="User Name"
          required
        ></v-text-field>
        <v-text-field
          variant="outlined"
          v-model="password"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <!-- <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a> -->

        <v-btn type="submit" color="primary" block class="mt-2"> ENTRAR </v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import ApiService from "@/api/_api";

export default {
  setup(_, context) {
    const username = ref("");
    const password = ref("");
    const store = useStore();
    const router = useRouter();
    const hasError = ref(null);

    onMounted(async () => {
      if (await ApiService.verifyToken()) {
        router.push("/dashboard");
      }
    });

    const login = async () => {
      if (username.value && password.value) {
        try {
          hasError.value = null;
          await store.dispatch("users/login", {
            username: username.value,
            password: password.value,
          });
          router.push("/dashboard");
        } catch (error) {
          hasError.value = error;
        }
      }
    };

    return {
      username,
      password,
      login,
      hasError,
    };
  },
};
</script>


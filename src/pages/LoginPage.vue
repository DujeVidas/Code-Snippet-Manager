<template>
  <q-card class="q-pa-md shadow-2 my_card" bordered>
    <q-card-section class="text-center">
      <div class="text-grey-9 text-h5 text-weight-bold">Log in</div>
      <div class="text-grey-8">Log in below to access your account</div>
    </q-card-section>
    <q-card-section>
      <q-form ref="form" class="q-gutter-md" @submit="submit">
        <q-input v-model="user.email" label="Email" name="Email" />

        <q-input
          v-model="user.password"
          label="Password"
          name="password"
          type="password"
        />

        <div>
          <q-btn
            class="full-width fredoka"
            color="dark"
            label="Login"
            rounded
            type="submit"
          ></q-btn>
        </div>
      </q-form>
    </q-card-section>
    <q-card-section class="text-center q-pt-none">
      <div class="text-grey-8">
        Don't have an account yet?
        <router-link class="text-primary" to="/register">Register</router-link>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
import login from 'src/firebase/firebase-login';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = reactive({
  email: null,
  password: null,
});

const form = ref(null);

const submit = async () => {
  if (form.value.validate()) {
    try {
      await login(user);
      router.push('/app');
    } catch (err) {}
  }
};
</script>

<style scoped>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  font-family: 'Rubix';
}
</style>

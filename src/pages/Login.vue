<template>
  <q-page class="row flex flex-center bg-primary">
    <div class="col-10 col-md-6 q-gutter-y-md">
      <q-card class="q-pa-md text-center">
        <div class="text-h4 q-pb-md">Welcome to RMH CNS Manager</div>
        <form class="q-gutter-md" @submit.prevent.stop="onSubmit()">
          <Input
            ref="email"
            v-model="user.email"
            type="email"
            label="Email address"
            next-input="password"
          />
          <Input
            ref="password"
            v-model="user.password"
            type="password"
            label="Password"
            next-input="firstName"
          />
          <div class="row justify-center">
            <Button class="q-ma-xs" label="Login" type="submit" />
            <Button class="q-ma-xs" label="Join as an CNS" @click="onJoin" />
          </div>
        </form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Login',
  data() {
    return {
      tab: 'login',
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async onSubmit() {
      await this.makeRequest();
    },
    async onJoin() {
      await this.makeRequest(true);
    },
    async makeRequest(signup) {
      this.$validateFields('email', 'password');
      this.$router.push({ name: 'Dashboard' });
    },
  },
});
</script>

<template>
  <q-page class="row flex flex-center bg-primary">
    <div class="col-10 col-md-6 q-gutter-y-md">
      <q-card class="q-pa-md text-center">
        <div class="text-h4 q-pb-md q-my-lg">
          Welcome to RMH CNS Development Portal
        </div>
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
          />
          <div class="row justify-center">
            <Button class="q-ma-xs" label="Login" type="submit" />
            <Button class="q-ma-xs" label="Join as an ANUM" @click="onJoin" />
          </div>
        </form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Login",
  data() {
    return {
      tab: "login",
      user: {
        email: "",
        password: "",
      },
    };
  },
  updated() {
    this.checkRoute();
  },
  mounted() {
    this.checkRoute();
  },
  methods: {
    async onSubmit() {
      if (this.checkRoute()) {
        return;
      }
      this.$validateFields("email", "password");
      await this.$resolve(
        this.$ParseUser.logIn(this.user.email, this.user.password)
      );
      this.$router.push({ name: "Dashboard" });
    },
    async onJoin() {
      this.$validateFields("email", "password");
      const user = new this.$Parse.User();
      user.set("email", this.user.email.toLowerCase());
      user.set("username", this.user.email.toLowerCase());
      user.set("password", this.user.password);
      await this.$resolve(user.save());
      this.$router.push({ name: "Dashboard" });
    },
    checkRoute() {
      if (this.$Parse.User.current()) {
        this.$router.push({ name: "Dashboard" });
        return true;
      }
    },
  },
});
</script>

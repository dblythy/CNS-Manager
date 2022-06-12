<template>
  <div
    :class="`bg-white full-width full-height row justify-center q-pa-md ${
      $q.screen.lt.md ? 'q-pt-xl' : 'q-pt-lg'
    }`"
  >
    <div class="column full-width full-height" style="max-width: 600px">
      <div class="column col scroll-y no-wrap items-center q-pb-xl">
        <div class="text-h2">Profile</div>
        <Input
          v-model="_user.name"
          class="q-mt-none full-width q-mt-md"
          label="Name"
          @update:model-value="updateText"
        />
      </div>
      <div class="bottom row full-width">
        <q-space />
        <Button go class="q-my-lg q-ml-sm col" label="Logout" @click="logout" />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Profile",
  props: ["user"],
  emits: ["update:user"],
  computed: {
    _user: {
      get() {
        return this.user;
      },
      set(value) {
        this.$emit("update:user", value);
      },
    },
  },
  methods: {
    updateText() {
      if (this.interval) {
        clearTimeout(this.interval);
      }
      this.interval = setTimeout(() => {
        this._user.save();
      }, 2000);
    },
    async logout() {
      await this.$resolve(this.$ParseUser.logOut());
      await this.$router.push({
        name: "Login",
      });
    },
  },
});
</script>

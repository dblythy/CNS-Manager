<template>
  <div></div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  mounted() {
    this.$router.push({ name: "Login" });
  },
});
</script>

<template>
  <!-- q-mx-md q-my-lg  -->
  <q-btn
    v-if="back !== undefined"
    class="absolute-top-left"
    flat
    square
    icon="arrow_back_ios"
    @click="$emit('click')"
  />
  <q-btn
    v-else
    :class="`q-pa-sm button-border ${bottom === undefined ? '' : 'bottom'}`"
    :color="color || 'primary'"
    :label="label"
    unelevated
    no-caps
    :icon-right="`${go === undefined ? '' : 'arrow_forward_ios'}`"
    align="center"
    :text-color="getColor"
    :style="(color ?? '').includes('#') ? `background: ${color}` : ''"
    @click="$emit('click')"
  />
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Button",
  props: ["go", "back", "bottom", "label", "color", "textColor"],
  emits: ["click"],
  computed: {
    getColor() {
      if (this.textColor) {
        return this.textColor;
      }
      if (!this.color) {
        return "white";
      }
      if (this.$contrast(this.color)) {
        return this.$contrast(this.color);
      }
      if (!this.color.includes("#")) {
        return "white";
      }
      return parseInt(this.color.replace("#", ""), 16) > 0xffffff / 2
        ? "black"
        : "white";
    },
  },
});
</script>
<style>
.on-right {
  position: absolute;
  right: 10px;
}
.button-border {
  border-radius: 8px;
}
</style>

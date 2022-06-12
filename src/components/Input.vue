<template>
  <div :class="`bg-${backgroundColor ?? 'white'} text-white`">
    <q-input
      ref="input"
      v-model="_value"
      class="col-12 q-my-sm q-pa-none"
      outlined
      :color="color ?? 'Promotion'"
      bg-color="white"
      :label="label"
      :type="
        type === 'password' ? (!isPwd ? 'password' : 'text') : type ?? 'text'
      "
      :readonly="readonly !== undefined"
      :rules="
        required === false || search !== undefined
          ? undefined
          : [(val) => !!val || '']
      "
      :prefix="prefix"
      :suffix="suffix"
      input-style="scroll-margin-top: 80px;"
      @update:model-value="(value) => $emit('update:modelValue', value)"
      @keydown.enter="enterPressed"
      @focus="focused"
      @blur="blurred"
    >
      <template v-if="$slots.append || type === 'password'" #append>
        <q-icon
          v-if="type === 'password'"
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
        <slot v-else name="append" />
      </template>
      <template v-else-if="action === true" #append>
        <q-btn class="text-red" round dense flat icon="error" />
      </template>
      <template v-else-if="go !== undefined" #append>
        <q-btn round dense flat icon="arrow_forward_ios" @click="$emit('go')" />
      </template>
      <template v-else-if="search !== undefined" #append>
        <q-icon v-if="!_value" name="search" @click="$refs.input.focus()" />
        <q-icon
          v-else
          name="clear"
          class="cursor-pointer"
          @click="_value = ''"
        />
      </template>
    </q-input>
    <div class="splitter" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Input",
  props: [
    "backgroundColor",
    "modelValue",
    "nextInput",
    "color",
    "label",
    "type",
    "readonly",
    "heavyTop",
    "required",
    "prefix",
    "suffix",
    "go",
    "text",
    "action",
    "search",
  ],
  emits: ["update:modelValue", "enter", "go"],
  data() {
    return {
      isPwd: false,
    };
  },
  computed: {
    _value: {
      get() {
        return this.modelValue?.toString() || this.text;
      },
      set(value) {
        if (this.type === "number") {
          this.$emit("update:modelValue", Number(value));
        } else {
          this.$emit("update:modelValue", value);
        }
      },
    },
  },
  methods: {
    validate() {
      this.hasError = !this.$refs.input.validate();
    },
    enterPressed(e) {
      if (this.type === "textarea") {
        return;
      }
      this.$next(e, this.nextInput);
      this.validate();
      if (!this.hasError) {
        this.$emit("enter");
      }
    },
    blurred() {
      // if (document.activeElement.nodeName === 'INPUT' || document.activeElement.nodeName === 'SPAN') {
      //   return;
      // }
      // const target = this.$refs.input.$el;
      // let parent = target.parentNode;
      // while (parent.className && !parent.className.includes("scroll-y")) {
      //   parent = parent.parentNode;
      // }
      // parent.style.paddingBottom = `20px`;
    },
    focused() {
      // setTimeout(() => {
      //   const target = this.$refs.input.$el;
      //   let parent = target.parentNode;
      //   while (parent.className && !parent.className.includes("scroll-y")) {
      //     parent = parent.parentNode;
      //   }
      //   parent.style.paddingBottom = this.$keyboardHeight();
      //   target.scrollIntoView({ behavior: "smooth", block: "center" });
      // }, 5);
    },
  },
});
</script>
<style>
.q-field--outlined.q-field--readonly .q-field__control:before {
  border-style: solid !important;
}
</style>

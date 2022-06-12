<template>
  <div class="q-gutter-md">
    <div class="text-h3 text-weight-bold q-mr-md">
      CNS {{ payload.title }} Criteria
    </div>
    <p class="text-grey-6 q-mt-sm">In order of priority</p>
    <ul>
      <li v-for="(item, index) of payload.criteria" :key="`criteria${index}`">
        {{ item }}
      </li>
    </ul>
    <div class="text-h3 text-weight-bold q-mr-md q-mt-lg">
      Actions to Address Developmental Need
    </div>
    <ul>
      <li v-for="(item, index) of payload.actions" :key="`actions${index}`">
        {{ item }}
      </li>
    </ul>
    <div class="row q-mr-md q-mt-lg items-center">
      <div class="text-h3 text-weight-bold col">Feedback and Examples</div>
      <q-space />
      <q-btn
        icon="add"
        class="bg-primary text-white"
        flat
        round
        @click="feedback.isOpen = true"
      />
    </div>
    <div v-if="feedback.isOpen">
      <div class="row items-center">
        <div class="text-weight-bold">
          Feedback for {{ _plan.nurseName }} on {{ payload.title }}
        </div>
        <q-space />
        <Button
          label="Cancel"
          class="q-mr-sm"
          @click="feedback = { isOpen: false, val: '' }"
        />
        <Button label="Save" @click="saveFeedback" />
      </div>
      <Input
        ref="feedback"
        v-model="feedback.val"
        type="textarea"
        class="q-mt-md"
        label="Feedback and Examples"
      />
    </div>
    <div v-for="(response, index) in responses" :key="`feedback${index}`">
      <div class="text-grey-8">
        {{ response.from }}
        {{ date.formatDate(response.date, "Do MMM YY - h:mm a") }}
      </div>
      <div>{{ response.feedback }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import data from "./CreateDetails.js";
import { date } from "quasar";
export default defineComponent({
  name: "CreateSegment",
  props: ["plan", "step"],
  emits: ["update:plan"],
  data() {
    return {
      feedback: {
        isOpen: false,
        val: "",
      },
      date,
      responses: [],
    };
  },
  computed: {
    payload() {
      return data[this.step];
    },
    _plan: {
      get() {
        return this.plan;
      },
      set(value) {
        this.$emit("update:plan", value);
      },
    },
  },
  watch: {
    plan() {
      this.getResponses();
    },
  },
  mounted() {
    this.getResponses();
  },
  methods: {
    async saveFeedback() {
      this.$validateFields("feedback");
      const user = this.$Parse.User.current();
      if (!user || !user.name) {
        this.$showError("Please enter your name");
      }
      this._plan.addUnique(this.payload.key, {
        date: new Date(),
        from: user.name,
        feedback: this.feedback.val,
      });
      await this.$resolve(this._plan.save());
      this.feedback = { isOpen: false, val: "" };
      this.getResponses();
    },
    getResponses() {
      this.responses = this.plan?.get(this.payload.key);
    },
  },
});
</script>

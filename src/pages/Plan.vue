<template>
  <div class="window-width window-height bg-grey-1 scroll-y">
    <div class="row justify-center q-py-md q-px-xl bg-white">
      <div v-if="!mobile" class="col-2 q-px-xs">
        <div
          class="full-width full-height"
          :style="`
    background-image: url('logo.png') !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    `"
        />
      </div>
      <div class="col text-center">
        <div class="text-weight-bold text-h4">Intensive Care Unit</div>
        <div class="text-h6">
          Development Plan for CCRNs working towards Clinical Nurse Specialist
        </div>
      </div>
      <div v-if="!mobile" class="col-2 q-px-xs">
        <div
          class="full-width full-height"
          :style="`
    background-image: url('mHealthLogo.jpeg') !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    `"
        />
      </div>
    </div>
    <div
      v-if="plan.id"
      class="bg-white q-ma-lg q-pa-xl shadow-2 rounded-borders"
    >
      <div class="row items-center q-mb-sm">
        <div class="q-mt-xs text-h2 q-mb-xs">
          {{ plan.nurseName }}'s Development Plan
        </div>
        <q-space />
        <div class="text-grey-8">
          Last updated:
          {{ date.formatDate(plan.updatedAt, "Do MMM YY - h:mm a") }}
          <q-btn flat round icon="print" />
        </div>
      </div>
      <div><b>Mentor:</b> {{ plan.mentor }}</div>
      <div><b>ANUMs:</b> {{ plan.anums.join(",") }}</div>
      <q-separator class="q-mt-sm" />

      <q-expansion-item
        label="Development plan"
        header-class="text-h6 text-weight-bold q-mt-md q-pa-none"
        default-opened
      >
        <ul>
          <li v-for="(item, index) in data[0]" :key="index">
            {{ item }}
          </li>
        </ul>
      </q-expansion-item>

      <q-expansion-item
        label="Key dates"
        header-class="text-h6 text-weight-bold q-pa-none"
      >
        <div class="q-mt-none">
          CNS Plan created:
          <b>{{ ` ${date.formatDate(plan.createdAt, "Do MMM YYYY")}` }}</b>
        </div>
        <div
          v-for="(label, index) in ['Initial', '2nd', '3rd', '4th']"
          :key="`dateReview${index}`"
          class="q-mt-none"
        >
          {{ label }} meeting with NUM to discuss development plan:
          <b>{{ dates[index] ? ` ${dates[index]}` : ` Pending` }}</b>
        </div>
        <div class="q-pa-sm" />
      </q-expansion-item>

      <q-expansion-item
        v-for="({ title, field }, index) in [
          {
            title: 'Clinical Skill',
            field: 'clinicalSkill',
          },
          {
            title: 'Professional Behaviour',
            field: 'professionalBehaviour',
          },
          {
            title: 'Professional Development',
            field: 'professionalDevelopment',
          },
        ]"
        :key="`segment${index}`"
        :label="title"
        :caption="`${plan[field]?.length ?? 0} example${
          plan[field]?.length === 1 ? '' : 's'
        } provided`"
        header-class="text-h6 text-weight-bold q-pa-none q-mb-md"
      >
        <div class="text-weight-bold q-mr-md">{{ title }} Criteria</div>
        <p class="text-grey-6 q-mt-sm">In order of priority</p>
        <ul>
          <li
            v-for="(item, criteriaIndex) of data[index + 1].criteria"
            :key="`criteria${index}-${criteriaIndex}`"
          >
            {{ item }}
          </li>
        </ul>
        <div class="text-weight-bold q-mr-md q-mt-lg">
          Actions to Address Developmental Need
        </div>
        <ul>
          <li
            v-for="(item, actionIndex) of data[index + 1].actions"
            :key="`actions${index}-${actionIndex}`"
          >
            {{ item }}
          </li>
        </ul>
        <div class="text-weight-bold q-mr-md">
          {{ data[index + 1].title }} Feedback and Examples
        </div>
        <div v-if="!plan[field]?.length" class="q-mt-md">
          No feedback has been provided for {{ title }}
        </div>
        <div
          v-for="(response, responseIndex) in plan[field]"
          v-else
          :key="`feedback${index}-${responseIndex}`"
          class="q-mt-md"
        >
          <div class="text-grey-8">
            {{ response.from }}
            {{ date.formatDate(response.date, "Do MMM YY - h:mm a") }}
          </div>
          <div>{{ response.feedback }}</div>
        </div>
        <Button :label="`Request feedback for ${title}`" class="q-my-md" />
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import data from "./CreateDetails.js";
import { date, useMeta } from "quasar";
export default defineComponent({
  name: "Plan",
  data() {
    return {
      date,
      data,
      plan: {},
      dates: [],
    };
  },
  computed: {
    mobile() {
      return this.$q.screen.lt.sm;
    },
  },
  mounted() {
    const plan = this.$route.params.plan;
    if (!this.$route.params.plan) {
      this.$router.push({ name: "Login" });
      return;
    }
    this.getData(plan);
    useMeta(() => {
      return {
        title: `ICU Development Plan`,
        meta: {
          description: { name: "description", content: "Page 1" },
          keywords: { name: "keywords", content: "Quasar website" },
          equiv: {
            "http-equiv": "Content-Type",
            content: "text/html; charset=UTF-8",
          },
          // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
          ogTitle: {
            name: "og:title",
            content: `RMH ICU development plan`,
          },
        },
      };
    });
  },
  methods: {
    async getData(plan) {
      this.plan = await this.$resolve(
        this.$Parse.Cloud.run("getPlan", { plan })
      );
      const dates = this.plan.dates || [];
      const newDates = dates.map((date) =>
        this.date.formatDate(date, "Do MMM YYYY")
      );
      this.dates = newDates;
    },
  },
});
</script>

<style></style>

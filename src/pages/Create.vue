<template>
  <div class="bg-grey-1 full-width scroll-y q-pa-md q-pb-xl">
    <div class="row bg-white q-pa-md items-center">
      <q-btn flat icon="arrow_back" @click="backPressed" />
      <div class="text-h3 text-weight-bold q-mr-md">
        {{ _plan.id ? "Edit" : "Create"
        }}{{ _plan.nurseName ? ` ${_plan.nurseName.trim()}'s` : "" }} Plan
      </div>
    </div>
    <q-stepper
      ref="stepper"
      v-model="step"
      flat
      color="primary"
      animated
      alternative-labels
      :contracted="mobile"
      :header-nav="!!plan.id"
    >
      <q-step
        :name="0"
        title="Nurse Details"
        icon="settings"
        :done="step > 0"
        class="q-pt-none bg-white"
      >
        <div class="q-gutter-md">
          <div
            v-if="details.show"
            class="shadow-1 rounded-borders q-mb-lg relative-position"
          >
            <q-carousel
              ref="carousel"
              v-model="details.slide"
              swipeable
              animated
              control-color="black"
              transition-prev="slide-right"
              transition-next="slide-left"
              padding
              :height="`${mobile ? 300 : 150}px`"
            >
              <q-carousel-slide
                v-for="(detail, index) of details.data[step]"
                :key="index"
                :name="index"
                class="column no-wrap flex-center text-center"
              >
                {{ detail }}
              </q-carousel-slide>
              <template #control>
                <q-carousel-control
                  position="bottom-right"
                  :offset="[18, 18]"
                  class="q-gutter-xs row full-width"
                >
                  <q-btn
                    v-if="details.slide !== 0"
                    flat
                    round
                    dense
                    text-color="black"
                    icon="arrow_left"
                    @click="$refs.carousel.previous()"
                  />
                  <q-space />
                  <q-btn
                    v-if="details.slide !== details.data[step].length - 1"
                    flat
                    round
                    dense
                    text-color="black"
                    icon="arrow_right"
                    @click="$refs.carousel.next()"
                  />
                </q-carousel-control>
              </template>
            </q-carousel>
            <q-btn
              flat
              class="absolute-top-right"
              round
              icon="close"
              @click="details.show = false"
            />
          </div>
          <Input
            ref="nurseName"
            v-model="_plan.nurseName"
            label="Nurse Name"
            next-input="nurseEmail"
          />
          <Input
            ref="nurseEmail"
            v-model="_plan.nurseEmail"
            label="Nurse Email"
            type="email"
            next-input="mentor"
          />
          <Input ref="mentor" v-model="_plan.mentor" label="Mentor Name" />
          <div class="text-h3 text-weight-bold q-mt-xl q-mb-sm">Key Dates</div>

          <div class="row items-center q-mt-none">
            <div class="col">CNS Plan created</div>
            <q-space />
            <q-btn
              class="col-shrink"
              flat
              no-caps
              disable
              :label="
                date.formatDate(_plan.createdAt || new Date(), 'Do MMM YYYY')
              "
            />
          </div>
          <div
            v-for="(label, index) in ['Initial', '2nd', '3rd', '4th']"
            :key="`date${index}`"
            class="row items-center q-mt-none"
          >
            <div class="col">
              {{ label }} meeting with NUM to discuss development plan:
            </div>
            <q-space />
            <q-btn
              class="col-shrink"
              flat
              no-caps
              :label="dates[index] || 'Pending'"
            >
              <q-popup-proxy>
                <q-date v-model="dates[index]" mask="Do MMM YYYY" />
              </q-popup-proxy>
            </q-btn>
          </div>
        </div>
      </q-step>

      <q-step
        v-for="({ title, field, icon }, index) in [
          {
            title: 'Clinical Skill',
            field: 'clinicalSkill',
            icon: 'medication',
          },
          {
            title: 'Professional Behaviour',
            field: 'professionalBehaviour',
            icon: 'work_outline',
          },
          {
            title: 'Professional Development',
            field: 'professionalDevelopment',
            icon: 'trending_up',
          },
        ]"
        :key="`step${index}`"
        :name="index + 1"
        :title="title"
        :icon="icon"
        :done="!!(_plan[field] || []).length"
        class="q-pt-none"
      >
        <CreateSegment v-model:plan="_plan" :step="step" />
      </q-step>

      <q-step
        :name="4"
        title="Review"
        icon="summarize"
        :done="step > 3"
        class="q-pt-none"
      >
        <div class="q-gutter-md">
          <q-expansion-item
            label="Nurse Details"
            icon="check"
            header-class="text-h3 text-weight-bold"
          >
            <div class="q-py-md">
              <b>Nurse name:</b> {{ _plan.nurseName }}<br />
              <b>Nurse email:</b> {{ _plan.nurseEmail }}<br />
              <b>Mentor:</b> {{ _plan.mentor }}<br />
            </div>
          </q-expansion-item>

          <q-expansion-item
            label="Key Dates"
            :icon="
              dates.filter((x) => x).length === 3 ? 'check' : 'priority_high'
            "
            header-class="text-h3 text-weight-bold"
            class="q-mt-none"
          >
            <div class="q-py-md">
              <div class="q-mt-none">
                <b>CNS Development plan created at:</b>
                {{
                  ` ${date.formatDate(
                    _plan.createdAt || new Date(),
                    "Do MMM YYYY"
                  )}`
                }}
              </div>
              <div
                v-for="(label, index) in ['Initial', '2nd', '3rd', '4th']"
                :key="`dateReview${index}`"
                class="q-mt-none"
              >
                <b>{{ label }} meeting with NUM to discuss development plan:</b>
                {{
                  dates[index]
                    ? ` ${date.formatDate(dates[index], "Do MMM YYYY")}`
                    : ` Pending`
                }}
              </div>
            </div>
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
            :key="`review${index}`"
            :label="title"
            :icon="!!(_plan[field] || []).length ? 'check' : 'priority_high'"
            header-class="text-h3 text-weight-bold"
            class="q-mt-none"
          >
            <div v-if="!_plan[field] || [].length" class="q-py-md">
              No {{ title }} feedback or examples
            </div>
            <div v-else class="q-py-md">
              <div
                v-for="(response, responseIndex) in _plan[field]"
                :key="`feedback${responseIndex}`"
                class="q-mb-md"
              >
                <div class="text-grey-8">
                  {{ response.from }}
                  {{ date.formatDate(response.date, "Do MMM YY - h:mm a") }}
                </div>
                <div>{{ response.feedback }}</div>
              </div>
            </div>
          </q-expansion-item>
        </div>
      </q-step>

      <template #navigation>
        <q-stepper-navigation class="q-pt-sm text-right">
          <Button
            v-if="_plan.nurseName && _plan.id"
            class="q-mr-sm"
            label="View Plan"
            @click="viewPlan"
          />
          <Button
            :label="step === 4 ? 'Finish' : 'Next'"
            @click="nextPressed"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import data from "./CreateDetails.js";
import CreateSegment from "./CreateSegment";
import { date } from "quasar";
export default defineComponent({
  components: {
    CreateSegment,
  },
  props: ["plan", "mobile", "user"],
  emits: ["update:plan", "changeTab"],
  data() {
    return {
      date,
      step: 0,
      details: {
        data,
        show: true,
        slide: 0,
      },
      dates: [],
    };
  },
  computed: {
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
    plan(newVal, oldVal) {
      const dates = newVal.dates || [];
      const newDates = dates.map((date) =>
        this.date.formatDate(date, "Do MMM YYYY")
      );
      this.dates = newDates;
      if (!oldVal.id) {
        this.step = 0;
      }
    },
    step(newVal) {
      if (newVal === 0) {
        return;
      }
      this.saveInBackground(true);
    },
  },
  async mounted() {
    const id = this.$route.query.plan;
    if (id && !this._plan.id) {
      const plan = await this.$resolve(
        new this.$Parse.Query("Plan").equalTo("objectId", id).first()
      );
      if (plan) {
        this._plan = plan;
      } else {
        this.$router.replace({ query: {} });
      }
    }
  },
  methods: {
    async nextPressed() {
      if (this.step === 0) {
        this.$validateFields("nurseName", "nurseEmail");
        await this.saveInBackground();
        this.user.fetch();
      }
      if (this.step === 4) {
        this.$emit("changeTab", 0);
        return;
      }
      this.step++;
    },
    async saveInBackground(silent) {
      const newDates = this.dates.map((date) =>
        this.date.extractDate(date, "Do MMM YYYY")
      );
      if (JSON.stringify(this._plan.dates) !== JSON.stringify(newDates)) {
        this._plan.dates = newDates;
      }
      if (this._plan.dirty()) {
        await this.$resolve(this._plan.save(), silent);
        this.$router.replace({ query: { plan: this._plan.id } });
      }
    },
    viewPlan() {
      window
        .open(`http://localhost:8080/plan/${this._plan.id}`, "_blank")
        .focus();
    },
    backPressed() {
      if (this.step === 0) {
        this.$emit("changeTab", 0);
        return;
      }
      this.$refs.stepper.previous();
    },
  },
});
</script>

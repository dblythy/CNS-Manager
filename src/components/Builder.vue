<template>
  <q-dialog
    v-model="_open"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ _plan.id ? 'Edit' : 'Create' }} CNS Plan</div>
        <q-space />
        <q-btn v-close-popup icon="close" flat round dense />
      </q-card-section>
      <q-card-section class="q-px-none q-pb-xl">
        <q-stepper
          ref="stepper"
          v-model="step"
          flat
          color="primary"
          animated
          alternative-labels
        >
          <q-step
            :name="0"
            title="Nurse Details"
            icon="settings"
            :done="step > 0"
            class="q-pt-none"
          >
            <div class="q-gutter-md">
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
              <div class="text-h3 text-weight-bold q-mt-xl q-mb-sm">
                Key Dates
              </div>

              <div
                v-for="{ key, label } in [
                  { key: 'first', label: 'Initial' },
                  { key: 'second', label: '2nd' },
                  { key: 'third', label: '3rd' },
                  { key: 'forth', label: '4th' },
                ]"
                :key="key"
                class="row items-center q-mt-none"
              >
                <div>
                  {{ label }} meeting with NUM to discuss development plan:
                </div>
                <q-space />
                <q-btn
                  flat
                  no-caps
                  :label="_plan[`${key}Meeting`] || 'Pending'"
                >
                  <q-popup-proxy>
                    <q-date
                      v-model="_plan[`${key}Meeting`]"
                      mask="Do MMM YYYY"
                    />
                  </q-popup-proxy>
                </q-btn>
              </div>
              <div class="q-pa-sm" />
            </div>
          </q-step>

          <q-step
            :name="1"
            title="Clinical Skill"
            icon="settings"
            :done="step > 1"
            class="q-pt-none"
          >
          </q-step>

          <q-step
            :name="2"
            title="Professional Behaviour"
            icon="settings"
            :done="step > 1"
            class="q-pt-none"
          >
            <div class="row"></div>
          </q-step>

          <q-step
            :name="3"
            title="Professional Development"
            icon="group"
            :done="step > 2"
            class="q-pt-none"
          >
          </q-step>

          <q-step
            :name="3"
            title="Review"
            icon="group"
            :done="step > 2"
            class="q-pt-none"
          >
          </q-step>

          <template #navigation>
            <q-stepper-navigation class="absolute-bottom q-pt-sm text-right">
              <Button
                v-if="step > 0"
                label="Back"
                class="q-mr-md"
                @click="$refs.stepper.previous()"
              />
              <Button
                :label="step === 3 ? 'Finish' : 'Next'"
                @click="nextPressed"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Builder',
  props: ['open', 'plan'],
  emits: ['new', 'update:open', 'update:plan'],
  data() {
    return {
      step: 0,
    };
  },
  computed: {
    _open: {
      get() {
        return this.open;
      },
      set(value) {
        this.$emit('update:open', value);
      },
    },
    _plan: {
      get() {
        return this.plan;
      },
      set(value) {
        this.$emit('update:plan', value);
      },
    },
  },
  methods: {
    async nextPressed() {
      if (this.step === 0) {
        this.$validateFields('nurseName', 'nurseEmail');
        const response = await this.$savePlan(this._plan);
        this._plan.id = response.id;
        console.log(response);
      }
      this.step++;
    },
  },
});
</script>

<template>
  <div class="bg-grey-1 full-width scroll-y q-pa-md">
    <div class="text-h3 q-my-sm">
      Hi{{ user.name ? " " : "" }}<b>{{ user.name }}</b
      >,<br />
      Welcome to RMH CNS Portal
    </div>

    <div
      class="col-shrink row justify-center content-stretch items-stretch q-mx-none"
    >
      <div
        :class="`col${
          mobile ? '-12' : ''
        } rounded-borders bg-white shadow-2 q-pa-md q-mt-sm`"
      >
        Total CNSs<br />
        <div class="text-h2 q-my-sm text-bold">{{ user.total || 0 }}</div>
        <q-icon class="icon icon-div bg-accent text-white" name="summarize" />
      </div>

      <div v-if="!mobile" class="q-pa-sm" />

      <div
        v-ripple
        :class="`col${
          mobile ? '-12' : ''
        } rounded-borders bg-white shadow-2 q-pa-md q-mt-sm relative-position ripple`"
        @click="$showMessage('Feature not built yet')"
      >
        Pending Feedback<br />
        <div class="text-h2 q-my-sm text-bold">
          {{ user.notifications || 0 }}
        </div>
        <q-icon class="icon icon-div bg-red text-white" name="notifications" />
      </div>
    </div>

    <div class="row items-center q-mt-lg">
      <div class="text-h3 text-weight-bold col">Your Development Plans</div>
      <q-space />
      <q-btn flat icon="add" class="col-shrink" @click="$emit('createNew')" />
    </div>
    <div
      class="col row q-mb-md"
      style="margin-left: -8px !important; margin-right: -8px !important"
    >
      <div
        v-for="_plan of plans"
        :key="_plan.id"
        :class="`col-${mobile ? '12' : '4'} q-pt-md ${
          mobile ? '' : `q-px-sm`
        } `"
      >
        <div
          v-ripple
          class="shadow-2 rounded-borders bg-white q-pa-md relative-position ripple"
          @click="$emit('createNew', _plan)"
        >
          <div
            :class="`text-${
              _plan.complete ? 'pink' : 'primary'
            } row items-center text-weight-bold text-caption`"
          >
            <template v-if="_plan.complete">
              <q-icon class="q-mr-xs" name="done" /> COMPLETE
            </template>
            <template v-else>
              <q-icon class="q-mr-xs" name="warning" /> ONGOING
            </template>
          </div>
          <div class="text-grey-8">
            {{ date.formatDate(_plan.createdAt, "Do MMM YY - h:mm a") }}
          </div>
          <div class="q-mt-xs text-h2 q-mb-xs">
            {{ _plan.nurseName }}
          </div>
        </div>
      </div>
    </div>

    <q-dialog
      v-model="userOpen"
      :maximized="mobile"
      transition-show="slide-up"
      transition-hide="slide-down"
      persistent
    >
      <div
        class="full-width column q-py-xl bg-primary relative-position q-pa-md text-center"
      >
        <h1 class="q-my-none text-weight-bold text-white">
          Welcome to the RMH CNS Portal
        </h1>
        <h3 class="q-mt-md text-white">
          Please enter your name. You can edit this in the Profile tab later.
        </h3>
        <Input
          ref="name"
          v-model="_user.name"
          class="q-mt-none q-mb-md"
          background-color="primary"
          label="Name"
        />
        <Button label="Save" @click="saveUser" />
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { date } from "quasar";
export default defineComponent({
  name: "Dashboard",
  props: ["user", "mobile", "plan", "tab"],
  emits: ["createNew", "update:user"],
  data() {
    return {
      date,
      editPlan: {
        open: false,
        data: {},
      },
      plans: [],
      userOpen: false,
    };
  },
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
  watch: {
    tab(newVal, oldVal) {
      if (newVal === 0 && oldVal !== 0) {
        this.getPlans(true);
      }
    },
  },
  mounted() {
    this.getPlans();
  },
  methods: {
    async getPlans(silent) {
      if (!this.user.name) {
        this.userOpen = true;
      }
      this.plans = await this.$resolve(
        new this.$Parse.Query("Plan").descending("updatedAt").find(),
        silent
      );
    },
    async saveUser() {
      this.$validateFields("name");
      await this._user.save();
      this.userOpen = false;
    },
    openPlan() {},
    createNew() {},
  },
});
</script>

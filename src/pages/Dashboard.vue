<template>
  <div class="bg-grey-1 full-width scroll-y q-pa-md">
    <div class="text-h3 q-my-sm">
      Hi <b>{{ user.firstName }}</b
      ><br />
      Welcome to RMH CNS Portal
    </div>

    <div
      class="col-shrink row justify-center content-stretch items-stretch q-mx-none"
    >
      <div
        v-ripple
        :class="`col${
          mobile ? '-12' : ''
        } rounded-borders bg-white shadow-2 q-pa-md q-mt-sm relative-position ripple`"
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
        @click="changeRoute"
      >
        Pending Feedback<br />
        <div class="text-h2 q-my-sm text-bold">{{ user.pending || 0 }}</div>
        <q-icon class="icon icon-div bg-red text-white" name="notifications" />
      </div>
    </div>

    <div class="text-h3 text-weight-bold q-mt-md">Your Development Plan</div>
    <div class="col row q-mb-md">anum</div>
    <q-btn flat icon="add" @click="createNew" />
    <Builder v-model:open="plan.open" v-model:plan="plan.data" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Builder from 'components/Builder';
export default defineComponent({
  name: 'Dashboard',
  components: {
    Builder,
  },
  props: ['user', 'mobile'],
  data() {
    return {
      plan: {
        open: false,
        data: {},
      },
    };
  },
  mounted() {
    this.getPlans();
  },
  methods: {
    async getPlans() {
      const response = await this.$getPlans();
      console.log(response);
    },
    createNew() {
      this.plan = {
        open: true,
        data: {},
      };
    },
  },
});
</script>

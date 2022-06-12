<template>
  <q-layout>
    <q-page-container class="column">
      <template v-if="!$q.screen.lt.md">
        <q-header class="text-white">
          <q-toolbar class="q-pl-lg">
            <q-toolbar-title> RMH CNS Portal </q-toolbar-title>
          </q-toolbar>
        </q-header>
        <q-drawer v-model="drawer" :width="250" :breakpoint="250" bordered>
          <q-list padding class="full-height column">
            <q-item
              v-for="({ icon, name }, index) in [
                { icon: 'home', name: 'Dashboard' },
                { icon: 'add', name: 'Create CNS' },
                { icon: 'person', name: 'Profile' },
              ]"
              :key="`listItem${index}`"
              v-ripple
              clickable
              :active="tab === index"
              @click="changeTab(index)"
            >
              <q-item-section avatar>
                <q-icon :name="icon" />
              </q-item-section>
              <q-item-section>
                {{ name }}
              </q-item-section>
            </q-item>

            <q-space />
          </q-list>
        </q-drawer>
      </template>
      <div class="col bg-red relative-position">
        <div :class="`bg-grey-1 absolute-top full-height`">
          <router-view v-slot="{ Component, route }">
            <transition :name="`slide-${direction}`">
              <keep-alive>
                <component
                  :is="Component"
                  :key="route.path"
                  v-model:plan="plan"
                  :style="`${
                    $q.screen.lt.md
                      ? 'padding-bottom: calc(8vh + 2px);'
                      : 'height: 100% !important;'
                  } min-height: 100%`"
                  :user="user"
                  :tab="tab"
                  :mobile="mobile"
                  @change-tab="changeTab"
                  @create-new="createNew"
                />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
      <q-tabs
        v-if="$q.screen.lt.md"
        v-model="tab"
        align="justify"
        no-caps
        class="text-primary shadow-2 fixed-bottom bg-white"
        style="height: 8vh"
      >
        <q-tab
          v-for="(icon, index) in ['home', 'add', 'person']"
          :key="`tab${index}`"
          :name="index"
          :icon="icon"
          @click="changeTab(index)"
        />
      </q-tabs>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { openURL } from "quasar";
export default defineComponent({
  name: "MainLayout",
  beforeRouteUpdate(to, from, next) {
    this.checkRoute(to);
    next();
  },
  data() {
    return {
      tab: 0,
      drawer: true,
      direction: "left",
      open: false,
      openURL,
      user: this.$Parse.User.current(),
      plan: this.$ParseVueObject("Plan"),
    };
  },
  computed: {
    mobile() {
      return this.$q.screen.lt.md;
    },
  },
  watch: {
    tab(newVal, oldVal) {
      this.direction = newVal < oldVal ? "right" : "left";
    },
  },
  async mounted() {
    this.checkRoute();
    document.addEventListener(
      "touchmove",
      (event) => {
        if (event.scale !== 1) {
          event.preventDefault();
        }
      },
      { passive: false }
    );
  },
  methods: {
    changeTab(index, query = {}) {
      this.tab = index;
      const routes = ["Dashboard", "Create", "Profile"];
      this.$router.push({ name: routes[index], query });
      if (!query.plan) {
        this.plan = this.$ParseVueObject("Plan");
      }
    },
    checkRoute(route = this.$route) {
      const names = ["Dashboard", "Create", "Profile"];
      if (names.includes(route.name)) {
        this.tab = names.indexOf(route.name);
      }
    },
    async createNew(cns) {
      if (cns) {
        this.plan = cns;
        this.changeTab(1, { plan: cns.id });
      } else {
        this.changeTab(1);
      }
    },
  },
});
</script>
<style>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s ease;
  position: absolute;
  left: 0;
}
.slide-right-enter-from {
  transform: translate3d(-100vw, 0, 0);
}
.slide-right-enter-to {
  transform: translate3d(0, 0, 0);
}
.slide-right-leave-from {
  transform: translate3d(0, 0, 0);
}
.slide-right-leave-to {
  transform: translate3d(100vw, 0, 0);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.5s ease;
  position: absolute;
  left: 0;
}
.slide-left-enter-from {
  transform: translate3d(100vw, 0, 0);
}
.slide-left-enter-to {
  transform: translate3d(0, 0, 0);
}
.slide-left-leave-from {
  transform: translate3d(0, 0, 0);
}
.slide-left-leave-to {
  transform: translate3d(-100vw, 0, 0);
}
.q-tab__indicator {
  height: 4px !important;
}
</style>

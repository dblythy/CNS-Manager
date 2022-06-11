import { boot } from 'quasar/wrappers';
import { Config } from 'VueHelper';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';
import { Parse } from 'parse';
export default boot(({ app, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.component('Input', Input);
  app.component('Button', Button);

  app.use(
    Config,
    {
      Parse,
      appName: 'CNS Manager',
      appId: 'F2b6ntbKyYtZHZyJV9FPi6LYjvfPd3Jo04gx9ed2',
      localhost: false,
      serverURL: 'https://parseapi.back4app.com/',
      mobile: true,
      appIcon: 'icon.png',
      subclasses: ['CNS'],
      handleLoaded(Parse, to) {
        const user = Parse.User.current();
        if (!user) {
          return 'Login';
        }
        if (!to.name || !to.meta.requiresAuth) {
          return 'Dashboard';
        }
        return false;
      },
      Parse,
    },
    router
  );
});

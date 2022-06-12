import { boot } from "quasar/wrappers";
import { Config } from "VueHelper";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import { Parse } from "parse";
export default boot(({ app, router }) => {
  app.component("Input", Input);
  app.component("Button", Button);
  app.use(
    Config,
    {
      Parse,
      appName: "CNS Development Plan",
      appId: "F2b6ntbKyYtZHZyJV9FPi6LYjvfPd3Jo04gx9ed2",
      javascriptKey: "D9eTrNJKJumeAZlWrzYbhqV88YyKd066bjtTbsI9",
      localhost: false,
      serverURL: "https://parseapi.back4app.com/",
      mobile: true,
      appIcon: "icon.png",
      subclasses: ["Plan"],
      handleLoaded(Parse, to) {
        const user = Parse.User.current();
        if (!user) {
          return "/";
        }
        if (!to.name || to.name === "Login") {
          return "Dashboard";
        }
        return false;
      },
      Parse,
    },
    router
  );
});

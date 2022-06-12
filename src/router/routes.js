const routes = [
  {
    path: "/login",
    component: () => import("layouts/BaseLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Login.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/BaseLayout.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("pages/Login.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "Dashboard",
        path: "dashboard",
        component: () => import("pages/Dashboard.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "Create",
        path: "create",
        component: () => import("pages/Create.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "Profile",
        path: "profile",
        component: () => import("pages/Profile.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/plan/:plan(.*)",
    component: () => import("layouts/BaseLayout.vue"),
    children: [
      { path: "", name: "Plan", component: () => import("pages/Plan.vue") },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

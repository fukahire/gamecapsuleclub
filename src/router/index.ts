import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/:pathMatch(.*)*",
  //   redirect: "/404",
  // },
  // {
  //   path: "/404",
  //   component: () => import("../pages/404.vue"),
  // },
  {
    path: "/",
    name: "info",
    component: () => import("../pages/info.vue"),
  },
  {
    path: "/qa",
    name: "qa",
    component: () => import("../pages/qa.vue"),
  },
  {
    path: "/character",
    name: "character",
    component: () => import("../pages/character.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
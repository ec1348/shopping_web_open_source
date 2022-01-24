import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/cakes",
    name: "Cakes",
    component: () => import("../views/Cakes.vue")
  },
  {
    path: "/breads",
    name: "Breads",
    component: () => import("../views/Breads.vue")
  },
  {
    path: "/cookies",
    name: "Cookies",
    component: () => import("../views/Cookies.vue")
  },
  {
    path: "/desserts",
    name: "Desserts",
    component: () => import("../views/Desserts.vue")
  },
  {
    path: "/signup",
    name: "Create-Account",
    component: () => import("../views/SignUp.vue")
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../views/Account.vue")
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue")
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () => import("../views/Checkout.vue")
  },
  {
    path: "/:pathMatch(.*)",
    name: "NotFound",
    component: () => import("../views/NotFound.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

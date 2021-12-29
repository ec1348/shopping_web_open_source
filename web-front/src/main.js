import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SvgIcon from "@/components/SvgIcon"
import "@/assets/styles/style.scss"
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context("@/assets/icon", true, /\.svg$/)
requireAll(req)

createApp(App).use(store).use(router).component("svg-icon", SvgIcon).mount("#app");

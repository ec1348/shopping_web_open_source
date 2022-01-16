import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SvgIcon from "@/components/SvgIcon"
import "@/assets/styles/style.scss"
import axios from 'axios'
import api from './service/api'

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context("@/assets/icon", true, /\.svg$/)
requireAll(req)

const app = createApp(App)
app.config.globalProperties.$http = axios
app.config.globalProperties.$api = api
app.use(store).use(router).component("svg-icon", SvgIcon).mount("#app");


"use strict";

const Vue = require("vue");
const Login = require("./login.vue");
const App = require("./app.vue");
const Base = require("./base.vue");
const Agent = require("./agent.vue");
const Metric = require("./metric.vue");

const VueRouter = require("vue-router");

Vue.use(VueRouter);

Vue.component("agent", Agent);
Vue.component("metric", Metric);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/app",
    name: "App",
    component: App,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

// eslint-disable-next-line no-unused-vars
const vm = new Vue({
  //render: (h) => h(Base),
  router,
  el: "#app",
  render(createElement) {
    return createElement(Base);
  },
}).$mount("#app");

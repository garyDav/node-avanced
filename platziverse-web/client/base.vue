<template>
  <div id="app">
    <!--<router-link class="navbar-item" :to="{name: 'Login'}">Login</router-link>
    <router-link class="navbar-item" :to="{name: 'App'}">App</router-link>-->
    <router-view/>
  </div>
</template>

<style>
</style>

<script>
module.exports = {
  data () {
    return {
      form: {
        email: '',
        password: '',
        error: false,
        error_msg: '',
      }
    }
  },

  mounted () {
    this.initialize()
  },

  methods: {
    async initialize () {
      const login = localStorage.getItem('isLogin');
      if (!login)
        this.$router.push("/login");

      this.$router.push("/app");
    },
  }
}
</script>

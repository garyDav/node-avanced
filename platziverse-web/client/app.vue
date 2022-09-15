<template>
  <div>
    <header class="header">
      <div class="header-container">
        <img src="/images/banner.png" width="485" alt="Donbosco-Banner">
      </div>
      <h3 class="btnOut">
        <a class="button btnColor" href="/">Sign out</a>
      </h3>
    </header>
    <agent
      v-for="agent in agents"
      :uuid="agent.uuid"
      :key="agent.uuid"
      :socket="socket">
    </agent>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<style>
  body {
    font-family: Arial;
    background: #f8f8f8;
    margin: 0;
  }
  .header {
    background: white;
    height: 200px;
    display: flex;
    align-items: center;
  }
  .header-container {
    max-width: 850px;
    margin: 0 auto;
    flex: 1;
    padding: 0 15px;
    text-align: center;
  }
  .btnOut {
    position: absolute;
    right: 15px;
  }
  @media screen and (min-width: 850px) {
    .header-container {
      padding: 0;
    }
  }
</style>

<script>
const axios = require('axios')
const io = require('socket.io-client')
const socket = io()

module.exports = {
  data () {
    return {
      agents: [],
      error: null,
      socket
    }
  },

  mounted () {
    this.initialize()
  },

  methods: {
    async initialize () {
      let result
      try {
        result = await axios.get(`http://192.168.1.200:8080/agents`).then(res => res.data)
      } catch (error) {
        this.error = error.error
        return
      }

      this.agents = result

      socket.on('agent/connected', payload => {
        const { uuid } = payload.agent
        const existing = this.agents.find(a => a.uuid = uuid)
        console.log('existing', existing)
        if(!existing) {
          this.agents.push(payload.agent)
        }
      })
    }
  }
}
</script>

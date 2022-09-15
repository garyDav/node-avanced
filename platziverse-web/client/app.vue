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
    <section>
      <div class="center">
        <h4>Activar Motor</h4>
        <label class="switch">
          <input type="checkbox" class="scheckbox" />
          <div class=""></div>
        </label>
      </div>
    </section>
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
  * {
    font-family: 'Muli', helvetica, arial, sans-serif;
  }
  body {
    margin: 0;
    background: radial-gradient(at top,#f2f2f2,#9A9A9A 90%) no-repeat !important;
    min-height: 100vh;
  }
  .center {
    display: flex;
    justify-content: center;
    gap: 12px;
  }
  .header {
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

  .scheckbox {
    display: none;
  }
  .switch {
    opacity: 1;
    display: flex;
    align-items: center;
  }

  .switch > div {
    width: 80px;
    height: 40px;
    background: #9A9A9A;
    z-index: 0;
    cursor: pointer;
    position: relative;
    border-radius: 50px;
    line-height: 40px;
    text-align: right;
    padding: 0 10px;
    color: rgba(0,0,0,.5);
    transition: all 250ms;
    box-shadow: inset 0 3px 15px -3px;
    box-sizing: border-box;
  }

  .switch > input:checked + div {
    background: #60a1d9;
    text-align: left;
    color: rgba(255,255,255,.75);
  }

  .switch > div:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: 0;
    top: -2px;
    height: 44px;
    width: 44px;
    background: linear-gradient(#f9f9f9 30%,#CDCDCD);
    border-radius: 50%;
    transition: all 200ms;
    box-shadow: 0 15px 15px -3px rgba(0,0,0,.25), inset 0 -2px 2px -3px,  0 3px 0 0px #f9f9f9;
  }

  .switch > div:after {
    content: '';
    display: inline-block;
    position: absolute;
    left: 11px;
    top: 11px;
    height: 22px;
    width: 22px;
    background: linear-gradient(#DCDCDC,#E3E3E3);
    border-radius: 50%;
    transition: all 200ms;
  }

  .switch > input:checked + div:after {
    left: 52px;
  }

  .switch > input:checked + div:before {
    content: '';
    position: absolute;
    left: 40px;
    border-radius: 50%;
  }
</style>

<script>
const axios = require('axios')
const io = require('socket.io-client')
const socket = io()
const { serverHost } = require('../config')

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
        result = await axios.get(`${serverHost}/agents`).then(res => res.data)
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

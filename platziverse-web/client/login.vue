<template>
  <!--<form @submit.prevent="submit">
    <h1 class="">Please sign in</h1>

    <input type="email" name="email" placeholder="Email" v-model="form.email" required>

    <input type="password" name="password" placeholder="Password" v-model="form.password" required>

    <button type="submit">Sign in</button>
  </form>-->
  <div>
    <div id="particles-js"></div>
    <section class="login">
      <section class="login__container">
        <h2>Iniciar sesión</h2>
        <form class="login__container--form" @submit.prevent="submit">
          <input class="input" type="email" name="email" placeholder="Email" v-model="form.email" required>
          <input class="input" type="password" name="password" placeholder="Password" v-model="form.password" required>
          <input class="button-login" type="submit" value="Iniciar sesión">
          <div class="login__container--remember-me">
            <div>
              <input type="checkbox" id="cbox1" value="checkbox">
              <label for="cbox1">Recordar Sesión</label>
            </div>
            <a href="#">Olvidé mi contraseña</a>
          </div>
        </form>
        <p class="login__container--register">
          ¿No tienes ninguna cuenta?
          <a href="#">Regístrate</a>
        </p>
      </section>
    </section>
  </div>
</template>

<style>
  #particles-js {
    height: 100vh;
    width: 100%;
    position: fixed;
    z-index: 0;
  }
  body {
    font-family: 'Muli', sans-serif;
    margin: 0px;
  }
  a:link, a:visited, a:active {
    border: none;
    outline: none;
  }

  .login {
    /*background: linear-gradient(#21c08b 0%, #ab88ff 60%);*/
    /*background: linear-gradient(#3c79b2 0%, #ffffff 70%, #ffda38);*/
    /*background: rgb(60,121,178);
    background: linear-gradient(180deg, rgba(60,121,178,1) 21%, rgba(255,255,255,1) 77%, rgba(255,218,56,1) 99%);*/
    /*background-color:rgb(27, 25, 25);*/
    background: linear-gradient(45deg, rgba(13, 47, 88, 0.7) 0%, rgba(13, 47, 88, 0.62) 12%, rgba(47, 89, 146, 0.18) 74%, rgba(47, 89, 146, 0) 100%),
    linear-gradient(135deg, rgba(28, 148, 104, 1) 0%, rgba(28, 148, 104, 0.91) 12%, rgba(47, 89, 146, 0.44) 74%, rgba(47, 89, 146, 0.24) 100%),
    linear-gradient(45deg, rgba(47, 89, 146, 0.24) 0%, rgba(47, 89, 146, 0.44) 26%, rgba(252, 176, 61, 0.91) 88%, rgba(252, 176, 61, 1) 100%),
    linear-gradient(135deg, rgba(47, 89, 146, 0.24) 0%, rgba(47, 89, 146, 0.44) 26%, rgba(216, 0, 65, 0.91) 88%, rgba(216, 0, 65, 1) 100%);
    /*opacity: .85;*/
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0px 30px;
    min-height: 100vh;
  }
  .login__container {
    position: relative;
    z-index: 1;
    border-radius: 40px;
    color: white;
    min-height: 600px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }
  .login__container--form {
    display: flex;
    flex-direction: column;
    font-size: 14px;
  }
  .login__container--remember-me {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .login__container--remember-me div {
    display: flex;
    align-items: center;
  }
  .login__container--remember-me div input[type="checkbox"] {
    margin: 0px 3px 0px 0px;
  }
  .login__container--remember-me a {
    color: white;
    text-decoration: none;
  }
  .login__container--remember-me a:hover {
    text-decoration: underline;
  }
  .login__container--register {
    font-size: 14px;
  }
  .login__container--register a {
    color: white;
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
  }
  .login__container--register a:hover {
    text-decoration: underline;
  }
  .input {
    background-color: transparent;
    border-left: 0px;
    border-right: 0px;
    border-top: 0px;
    border-bottom: 2px solid white;
    color: white;
    font-family: 'Muli', sans-serif;
    font-size: 16px;
    margin-bottom: 20px;
    padding: 0px 20px;
    outline: none;
    height: 50px;
  }
  ::placeholder {
    color: white;
  }
  .button-login {
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 25px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-family: 'Muli', sans-serif;
    height: 50px;
    letter-spacing: 1px;
    margin: 10px 0px;
  }

  @media only screen and (min-width: 600px) {
    .login__container {
      background-color: rgba(255, 255, 255, 0.1);
      border: 2px solid white;
      padding: 60px 68px 40px;
      width: 300px;
    }
  }
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
      /*let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', '/particles.min.js')
      document.head.appendChild(recaptchaScript)*/

      let recaptchaScript2 = document.createElement('script')
      recaptchaScript2.setAttribute('src', '/login-main.js')
      document.head.appendChild(recaptchaScript2)
    },

    async submit() {
      const { email, password } = this.form
      if (email !== 'admin@gmail.com' || password !== 'admin') {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales incorrectas',
        })
        return;
      }

      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Acceso Correcto',
        showConfirmButton: false,
        timer: 900
      })
      this.$router.push("/app");
    }
  }
}
</script>

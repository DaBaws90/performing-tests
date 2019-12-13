<template>
  <div style="text-align: center; justify-content: center;">
      <form @submit.prevent="login" ref="loginForm" v-if="!$store.state.session.loggedIn">
          <label for="username">Username</label>
          <input v-model="username" type="text" name="uname" id="username"/>
          <br>
          <label for="pass">Password</label>
          <input v-model="userpassword" type="password" name="passw" id="pass"/>
          <br>
          <button type="submit">Enviar</button>
      </form>
      <div v-if="$store.state.session.loggedIn">
          Has iniciado sesión
          <button @click="getGlobalExport">global</button>
      </div>
  </div>
</template>

<script>
import CryptoJS from "crypto-js"
export default {
    data: () => ({
        username: '',
        userpassword: ''
    }),
    methods: {
        getGlobalExport () {
            (async () => {
                try {
                    // let response = await this.$http.get(process.env.VUE_APP_PYTHON_ENDPOINT + process.env.VUE_APP_ENDPOINT_PREFIX + 'dynamiclabels/load/' + 176 + '/' + 74 + '/' + 'jhsgkabkhaja')
                    let response = await this.$http.get('LUL')
                } catch (error) {
                    console.error('error triggered', error)
                }
            })()
        },
        login () {
            (async () => {
                let data = {
                    username: this.username,
                    userpassword: CryptoJS.SHA256(this.userpassword).toString(CryptoJS.enc.Base64)
                }
                try {
                    let response = await this.$http.post(process.env.VUE_APP_PYTHON_ENDPOINT + process.env.VUE_APP_ENDPOINT_PREFIX + 'login', data)
                    // console.info('Token received', response.data)
                    sessionStorage.setItem('accessToken', response.data.access_token)
                    sessionStorage.setItem('refreshToken', response.data.refresh_token)
                    // this.$store.commit('setToken', response.data.access_token)
                    // this.$store.commit('setRefreshToken', response.data.refresh_token)
                    // this.$store.commit('setLoggedIn', true)
                } catch(err) {
                    console.warn('Error', err)
                }
            })() 
        }
    }
}
</script>

<style>

</style>
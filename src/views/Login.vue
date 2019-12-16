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
        login () {
            (async () => {
                let data = {
                    username: this.username,
                    userpassword: CryptoJS.SHA256(this.userpassword).toString(CryptoJS.enc.Base64)
                }
                try {
                    let response = await this.$http.post(process.env.VUE_APP_PYTHON_ENDPOINT + process.env.VUE_APP_ENDPOINT_PREFIX + 'login', data)
                    this.$store.commit('setToken', response.data.access_token)
                    this.$store.commit('setRefreshToken', response.data.refresh_token)
                    try {
                        this.$http.get(process.env.VUE_APP_PYTHON_ENDPOINT + process.env.VUE_APP_ENDPOINT_PREFIX + 'operations/sms/getglobalexport/' + this.$store.getters.domainId + '/' + this.$store.getters.userId + '/' + this.$store.getters.role)
                        this.$store.commit('setGlobalExport', 1)
                    } catch (error) {
                        console.error(error)
                        this.$store.commit('setGlobalExport', 0)
                    }
                } catch(err) {
                    console.error('Error', err)
                }
            })() 
        }
    }
}
</script>

<style>

</style>
<template>
  <b-container>
    <b-row>
      <b-col lg="6" md="6" sm="6" offset-lg="3" offset-md="3" offset-sm="3">
        <h2>Login</h2>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="6" md="6" sm="6" offset-lg="3" offset-md="3" offset-sm="3">
        <b-form @submit="onLogin">
          <b-form-group label="Email" label-for="email">
            <b-form-input required id="email" type="email" v-model="credentials.email"/>
          </b-form-group>

          <b-form-group label="Password" label-for="password">
            <b-form-input required id="password" type="password" v-model="credentials.password"/>
          </b-form-group>

          <b-row>
            <b-col md="3">
              <b-button type="submit" variant="info">Login</b-button>
            </b-col>
            <b-col md="5">
              <b-button :disabled="loading" @click="onSendLoginLink()" type="button" variant="info">Get Login Link on Email</b-button>
            </b-col>
            <b-col md="4">
               <b-button v-google-signin-button="clientId" class="google-signin-button" variant="danger"> Login With Google</b-button>
            </b-col>
          </b-row>

        </b-form>
      </b-col>
    </b-row>
    <br/>
    <b-row>
      <b-col lg="6" md="6" sm="6" offset-lg="3" offset-md="3" offset-sm="3">
        <h6>Not Registered Yet ?
          <router-link :to="{name: 'Register'}">Click Here&nbsp;</router-link>to Register
        </h6>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
import GoogleSignInButton from '../../directives/GoogleLogin'
export default {
  directives: {
    GoogleSignInButton
  },
  data () {
    return {
      credentials: {
        email: null,
        password: null
      },
      loading: false,
      clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID
    }
  },
  created () {
    const token = this.$route.params.token
    if (token) {
      this.login({ token }).then(response => {
        this.$router.push({ name: 'Home' })
      })
    }
  },
  methods: {
    ...mapActions('AuthStore', [
      'login',
      'sendLoginLink',
      'loginWithGoogle'
    ]),

    onLogin (event) {
      event.preventDefault()
      this.login(this.credentials).then(response => {
        this.$router.push({ name: 'Home' })
      })
    },

    onSendLoginLink () {
      if (!this.credentials.email) {
        this.$bvToast.toast('Please Enter an Email', {
          title: 'Error',
          variant: 'danger',
          solid: true
        })
        return false
      }
      this.loading = true
      this.sendLoginLink({ email: this.credentials.email }).then(response => {
        this.loading = false
        this.$bvToast.toast(response.data.message, {
          title: 'Success',
          variant: 'success',
          solid: true
        })
      })
    },

    onGoogleAuthSuccess (token) {
      this.loginWithGoogle({ token }).then(response => {
        this.$router.push({ name: 'Home' })
      })
    },

    onGoogleAuthFail () {

    }
  }
}
</script>

<template>
  <b-navbar toggleable="md" type="dark" class="mb-5" variant="info">
    <b-navbar-toggle target="nav_collapse" />
    <b-navbar-brand :to="{ name: 'Home' }">Node + Vue</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
       
        <template v-if="!isLoggedIn">
          <b-nav-item :to="{name: 'Login'}">Login</b-nav-item>
        </template>
        <template v-else>
          <b-nav-item @click="onLogout()">Logout</b-nav-item>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      collapsed: false
    }
  },
  computed: {
    ...mapGetters('AuthStore', [
      'user', 'isLoggedIn'
    ])
  },
  methods: {
    ...mapActions('AuthStore', [
      'logout'
    ]),
    toggleNavbar () {
      this.collapsed = !this.collapsed
    },
    currentRoute (name) {
      return this.$route.name === name
    },
    onLogout () {
      this.logout().then(response => {
        this.$router.push({ name: 'Login' })
      })
    }
  }
}
</script>

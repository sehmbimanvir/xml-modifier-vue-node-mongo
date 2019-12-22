<template>
  <b-container>
    <h1>XML Manipulation</h1>
    <template v-if="isLoggedIn">
        <b-row class="text-center mt-5">
          <b-col md="12">
            <router-link :to="{name: 'ParseXML'}">
              <b-button size="lg" variant="info">Start Manipulating XML</b-button>
            </router-link>
          </b-col>
        </b-row>
    </template>
  </b-container>
</template>
<script>
import { mapGetters } from 'vuex'
import XMLService from '../services/xml'
export default {
  data () {
    return {
      xmlData: {
        name: null,
        url: null
      }
    }
  },
  computed: {
    ...mapGetters('AuthStore', [
      'user', 'isLoggedIn'
    ])
  },
  created () {
  },
  methods: {
    onSubmitLink () {
      XMLService.loadFile(this.xmlData).then(response => {

      })
    }
  }
}
</script>

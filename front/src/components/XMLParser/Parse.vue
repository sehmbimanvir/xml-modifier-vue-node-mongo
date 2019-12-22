<template>
  <b-container>
    <h1>XML Manipulation</h1>
    <step1 :xmlData="xmlData" v-if="currentStep === 1" @onSubmit="onSubmitLink" />
    <step2 :xmlData="xmlResponse" v-else/>
  </b-container>
</template>
<script>
import { mapGetters } from 'vuex'
import XMLService from '../../services/xml'
import Step1 from './Step1'
import Step2 from './Step2'
export default {
  data () {
    return {
      xmlData: {
        name: null,
        link: null
      },
      currentStep: 1,
      xmlResponse: {
        properties: [],
        filename: null
      }
    }
  },
  methods: {
    onSubmitLink () {
      XMLService.loadFile(this.xmlData).then(response => {
        let data = response.data.data
        this.currentStep = 2
        this.xmlResponse = response.data.data
      })
    }
  },
  components: {
    Step1,
    Step2
  }
}
</script>

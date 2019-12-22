<template>
  <div>
    <h6>Add XML Link</h6>
    <b-row>
      <b-col md="12">
        <b-form @submit.prevent="$emit('onSubmit')" class="mt-5">
            <b-row>
              <b-col md="4">
                  <b-form-group label="Name" label-for="name">
                    <b-form-input v-model="xmlData.name" required id="name" type="text"/>
                  </b-form-group>
              </b-col>

              <b-col md="6">
                  <b-form-group label="XML Link" label-for="xml_link">
                    <b-form-input v-model="xmlData.link" required id="xml_link" type="url"/>
                  </b-form-group>
              </b-col>

              <b-col md="2">
                <b-button style="margin-top: 30px;" type="submit" variant="info">Submit</b-button>
              </b-col>
            </b-row>
        </b-form>
      </b-col>
    </b-row>
    </div>
</template>
<script>
export default {
  props: {
    xmlData: {
      required: true,
      type: Object
    }
  }
}
</script>
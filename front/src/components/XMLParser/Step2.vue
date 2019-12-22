<template>
  <div>
    <h6>Modify XML Fields</h6>
    <b-row>
      <b-col md="12">
          <b-table-simple striped response>
            <b-thead>
              <b-tr>
                <b-th>XML Fields</b-th>
                <b-th>Default Value</b-th>
                <b-th>Action</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(item, key) in xmlFields" :key="key">
                <b-td>
                  <b-form-input size="sm" required type="text"/>
                </b-td>
                <b-td>
                  <b-form-input size="sm" required type="text"/>
                </b-td>
                <b-td>
                  <b-button @click="removeRow(key)" squared size="sm" variant="danger">Remove</b-button>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
          <b-row align-h="end">
            <b-col cols="4" style="text-align:right;">
              <b-button-group>
                <b-button @click="addRow" variant="outline-info">Add Row</b-button>
                <b-button variant="outline-info">Next</b-button>
              </b-button-group>
            </b-col>
          </b-row>
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
  },
  data () {
    return {
      xmlFields: [{
        name: null,
        value: null
      }]
    }
  },
  methods: {
    addRow () {
      this.xmlFields.push({
        name: null,
        value: null
      })
    },
    removeRow (index) {
      this.xmlFields.splice(index, 1)
    }
  }
}
</script>

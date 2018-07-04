<template>
  <div>
    <vue-good-table
      :pagination-options="{
        enabled: true,
        perPage: 50
      }"
      :search-options="{
        enabled: true
      }"
      :lineNumbers="true"
      :totalRows="totalRecords"
      :columns="columns"
      :rows="rows"
      styleClass="vgt-table condensed"/>
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import axios from 'axios'

export default {
  name: 'DataTable',
  components: { VueGoodTable },
  data () {
    return {
      columns: [
        {
          label: 'App',
          field: 'app_name',
          type: 'text'
        },
        {
          label: 'Rating',
          field: 'star_rating',
          type: 'number',
          globalSearchDisabled: true
        },
        {
          label: 'Previous Rating',
          field: 'previous_star_rating',
          type: 'number',
          globalSearchDisabled: true
        },
        {
          label: 'Created On',
          field: 'created_at',
          type: 'date',
          dateInputFormat: 'YYYY-MM-DD',
          dateOutputFormat: 'MMM Do YY'
        },
        {
          label: 'Review',
          field: 'body',
          type: 'text',
          sortable: false,
          globalSearchDisabled: true,
          formatFn: this.formatBody
        }
      ],
      rows: [],
      totalRecords: 0
    }
  },
  methods: {
    getFromServer () {
      axios({ method: 'GET', 'url': 'http://localhost/api/reviews' })
        .then(response => {
          this.rows = response.data
        }, error => {
          console.log('error', error)
        }).catch(error => {
          console.log('exception', error)
        })
    },
    formatBody (body) {
      return body.substring(0, 100) + '...'
    }
  },
  mounted () {
    this.getFromServer()
  }
}
</script>

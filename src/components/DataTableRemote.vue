<template>
  <div>
    <vue-good-table
      mode="remote"
      @on-page-change="onPageChange"
      @on-sort-change="onSortChange"
      @on-column-filter="onColumnFilter"
      @on-per-page-change="onPerPageChange"
      pagination-options="{
        enabled: true,
      }"
      :lineNumbers="true"
      :totalRows="totalRecords"
      :columns="columns"
      :rows="rows"/>
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import axios from 'axios'

let appList = ['product-upsell',
  'product-discount',
  'store-locator',
  'product-options',
  'quantity-breaks',
  'product-bundles',
  'customer-pricing',
  'product-builder',
  'social-triggers',
  'recurring-orders',
  'multi-currency',
  'quickbooks-online',
  'xero',
  'the-bold-brain']

export default {
  name: 'DataTable',
  components: { VueGoodTable },
  data () {
    return {
      columns: [
        {
          label: 'App',
          field: 'app_name',
          type: 'text',
          filterOptions: {
            enabled: true,
            placeholder: 'App Name...',
            filterDropdownItems: appList,
            filterFn: function (data, filterString) {
              console.log(data)
            }
          }
          // filterable: true
        },
        {
          label: 'Rating',
          field: 'star_rating',
          type: 'number'
        },
        {
          label: 'Previous Rating',
          field: 'previous_star_rating',
          type: 'number'
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
          type: 'text'
        }
      ],
      rows: [],
      totalRecords: 0,
      serverParams: {
        columnFilters: {
        },
        sort: {
          field: '',
          type: ''
        },
        page: 1,
        perPage: 15
      }
    }
  },
  methods: {
    updateParams (newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps)
    },

    onPageChange (params) {
      this.updateParams({page: params.currentPage})
      this.loadItems()
    },

    onPerPageChange (params) {
      this.updateParams({perPage: params.currentPerPage})
      this.loadItems()
    },

    onSortChange (params) {
      this.updateParams({
        sort: {
          type: params.sortType,
          field: this.columns[params.columnIndex].field
        }
      })
      this.loadItems()
    },

    onColumnFilter (params) {
      this.updateParams(params)
      this.loadItems()
    },
    getReviewsByApp (params) {
      console.log(params)
    },
    getFromServer (params) {
      // console.log(params)
      // console.log(params)
      // fetch('http://localhost/api/reviews', {mode: 'no-cors'})
      //   .then(response => {
      //   // this.totalRecords = response.data.meta.total
      //   // this.rows = response.data.data;
      //     console.log('Response', response)
      //   }).catch(function (error) {
      //     console.log('Request failed', error)
      //   })
      axios({ method: 'GET', 'url': 'http://localhost/api/reviews' })
        .then(response => {
          let data = response.data
          this.rows = data.data.data
          this.totalRecords = data.meta.total
          // console.log(data)
        }, error => {
          console.log('error', error)
        }).catch(error => {
          console.log('error2', error)
        })
    },
    // getAppReview (params) {

    // },

    // load items is what brings back the rows from server
    loadItems () {
      // console.log(this.serverParams)
      // this.getFromServer(this.serverParams).then(response => {
      //   this.totalRecords = response.totalRecords
      //   this.rows = response.rows
      // })
      this.getFromServer(this.serverParams)
    }
  },
  mounted: {
    // this.loadItems()
  }
}
</script>

import Vue from 'vue'
import Router from 'vue-router'
import DataTable from '@/components/DataTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DataTable',
      component: DataTable
    }
  ]
})

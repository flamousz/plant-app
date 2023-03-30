import { createRouter, createWebHistory } from 'vue-router'
import CropAreaPage from '../views/CropAreaPage.vue'
import CropPage from '../views/CropPage.vue'
import EmployeePage from '../views/EmployeePage.vue'
import SeedPage from '../views/SeedPage.vue'
import MaterialPage from '../views/MaterialPage.vue'
import PesticidePage from '../views/PesticidePage.vue'
import FertilizerPage from'../views/FertilizerPage.vue'
import LoginPage from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/croparea',
      name: 'cropArea',
      component: CropAreaPage
    },
    {
      path: '/crop',
      name: 'crop',
      component: CropPage
    },
    {
      path: '/employee',
      name: 'employee',
      component: EmployeePage
    },
    {
      path: '/seed',
      name: 'seed',
      component: SeedPage
    },
    {
      path: '/material',
      name: 'material',
      component: MaterialPage
    },
    {
      path: '/pesticide',
      name:'pesticide',
      component: PesticidePage
    },
    {
      path: '/fertilizer',
      name: 'fertilizer',
      component: FertilizerPage
    },
    {
      path:'/login',
      name: 'login',
      component: LoginPage
    }
  ]
})

export default router

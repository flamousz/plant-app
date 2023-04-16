import { createRouter, createWebHistory } from 'vue-router'
import CropAreaPage from '../views/CropAreaPage.vue'
import CropPage from '../views/CropPage.vue'
import EmployeePage from '../views/EmployeePage.vue'
import SeedPage from '../views/SeedPage.vue'
import MaterialPage from '../views/MaterialPage.vue'
import PesticidePage from '../views/PesticidePage.vue'
import FertilizerPage from'../views/FertilizerPage.vue'
import LoginPage from '../views/LoginPage.vue'
import CropNew from '../components/Modals/CropNew.vue'
import DetailPlant from '../views/DetailPlant.vue'
import FormPlantSheet from '../components/Modals/FormPlantSheet.vue'
import ItemPage from '../views/ItemPage.vue'
import ItemDetailPage from '../views/ItemDetailPage.vue'
import ItemFormPage from '../views/ItemFormPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/itemform',
      name: 'itemform',
      component: ItemFormPage
    },
    {
      path: '/croparea',
      name: 'cropArea',
      component: CropAreaPage
    },
    {
      name: 'item',
      path: '/item',
      component: ItemPage
    },
    {
      path: '/crop',
      name: 'crop',
      component: CropPage
    },
    {
      path: '/itemdetail/:id',
      name: 'itemdetail',
      component: ItemDetailPage
    },
    {
      path: '/detailplant/:id',
      name: 'detailplant',
      component: DetailPlant
    },
    {
      path: '/formplantsheet',
      name: 'formplantsheet',
      component: FormPlantSheet
    },
    {
      path: '/cropnew',
      name: 'cropnew',
      component: CropNew
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

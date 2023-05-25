import { createRouter, createWebHistory } from "vue-router";
import CropAreaPage from "../views/CropAreaPage.vue";
import CropPage from "../views/CropPage.vue";
import EmployeePage from "../views/EmployeePage.vue";
import LoginPage from "../views/LoginPage.vue";
import CropNew from "../components/Modals/CropNew.vue";
import DetailPlant from "../views/DetailPlant.vue";
import FormPlantSheet from "../components/Modals/FormPlantSheet.vue";
import ItemPage from "../views/ItemPage.vue";
import ItemDetailPage from "../views/ItemDetailPage.vue";
import ItemFormPage from "../views/ItemFormPage.vue";
import CropAreaDetailPage from "../views/CropAreaDetailPage.vue";
import CropFormPage from "../views/CropFormPage.vue";
import EmployeeDetailPage from "../views/EmployeeDetailPage.vue";
import EmployeeFormPage from "../views/EmployeeFormPage.vue";
import UomPage from "../views/UomPage.vue";
import UomDetailPage from "../views/UomDetailPage.vue";
import UomFormPage from "../views/UomFormPage.vue";
import CategoryPage from "../views/CategoryPage.vue";
import CategoryDetailPage from "../views/CategoryDetailPage.vue";
import CategoryFormPage from "../views/CategoryFormPage.vue";
import PlantSchedulePage from "../views/PlantSchedulePage.vue";
import PlantScheduleFormPage from "../views/PlantScheduleFormPage.vue";
import DetailPlantSchedule from "../views/DetailPlantSchedule.vue";
import HarvestOutcomeFormPage from "../views/HarvestOutcomeFormPage.vue";
import MapPlainPage from "../views/MapPlainPage.vue";
import SeedNurseryPage from "../views/SeedNurseryPage.vue";
import SeedNurseryDetailPage from "../views/SeedNurseryDetailPage.vue";
import TaskMasterFormPage from "../views/TaskMasterFormPage.vue";
import TaskMasterPage from "../views/TaskMasterPage.vue";
import TaskMasterDetailPage from "../views/TaskMasterDetailPage.vue";
import TaskSheetPage from "../views/TaskSheetPage.vue";
import TaskSheetAssignment from "../views/TaskSheetAssignment.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/tasksheet",
			name: "Task Sheet",
			component: TaskSheetPage
		},
		{
			path: "/tasksheet/:id",
			name: "Task Assignment",
			component: TaskSheetAssignment,
		},
		{
			path: "/taskmaster/:id",
			name: "Detail Task Master",
			component: TaskMasterDetailPage,
		},
		{
			path: "/taskmaster/form",
			name: "Task Master Form",
			component: TaskMasterFormPage,
		},
		{
			path: "/taskmaster",
			name: "Task Master",
			component: TaskMasterPage,
		},
		{
			path: "/seednursery",
			name: "seednursery",
			component: SeedNurseryPage,
		},
		{
			path: "/seednursery/:id",
			name: "detailseednursery",
			component: SeedNurseryDetailPage,
		},
		{
			path: "/harvestoutcome/form",
			name: "harvestoutcomeform",
			component: HarvestOutcomeFormPage,
		},
		{
			path: "/plantschedule/:id",
			name: "detailplantschedule",
			component: DetailPlantSchedule,
		},
		{
			path: "/plantschedule/form",
			name: "plantscheduleform",
			component: PlantScheduleFormPage,
		},
		{
			path: "/plantschedule",
			name: "plantschedule",
			component: PlantSchedulePage,
		},
		{
			path: "/category/form",
			name: "categoryform",
			component: CategoryFormPage,
		},
		{
			path: "/category/detail/:id",
			name: "categorydetail",
			component: CategoryDetailPage,
		},
		{
			path: "/category",
			name: "category",
			component: CategoryPage,
		},
		{
			path: "/uom/form",
			name: "uomform",
			component: UomFormPage,
		},
		{
			path: "/uom/detail/:id",
			name: "uomdetail",
			component: UomDetailPage,
		},
		{
			path: "/uom",
			name: "uom",
			component: UomPage,
		},
		{
			path: "/employee/form",
			name: "employeeform",
			component: EmployeeFormPage,
		},
		{
			path: "/employee/detail/:id",
			name: "employeedetail",
			component: EmployeeDetailPage,
		},
		{
			path: "/croparea/detail/:id",
			name: "cropareadetail",
			component: CropAreaDetailPage,
		},
		{
			path: "/croparea/form",
			name: "cropareaform",
			component: CropFormPage,
		},
		{
			path: "/item/form",
			name: "itemform",
			component: ItemFormPage,
		},
		{
			path: "/croparea",
			name: "cropArea",
			component: CropAreaPage,
		},
		{
			name: "item",
			path: "/item",
			component: ItemPage,
		},
		{
			path: "/crop",
			name: "crop",
			component: CropPage,
		},
		{
			path: "/item/detail/:id",
			name: "itemdetail",
			component: ItemDetailPage,
		},
		{
			path: "/detailplant/:id",
			name: "detailplant",
			component: DetailPlant,
		},
		{
			path: "/formplantsheet",
			name: "formplantsheet",
			component: FormPlantSheet,
		},
		{
			path: "/cropnew",
			name: "cropnew",
			component: CropNew,
		},
		{
			path: "/employee",
			name: "employee",
			component: EmployeePage,
		},
		{
			path: "/login",
			name: "login",
			component: LoginPage,
		},
		{
			path: "/mapbasic",
			name: "mapbasic",
			component: MapPlainPage,
		},
	],
});

router.beforeEach(async (to, from) => {
	if (
		!localStorage.access_token && // make sure the user is authenticated
		to.name !== "login"
	) {
		// ❗️ Avoid an infinite redirect
		return { name: "login" };
	} else if (localStorage.access_token && to.name === "login") {
		return { name: "crop" };
	}
});

export default router;

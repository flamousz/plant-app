<script allowJs:true>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useTaskSheetStore } from "../stores/taskSheet";
import { useEmployeeStore } from "../stores/employee";
import { useCropAreaStore } from "../stores/cropArea";
import { useItemStore } from "../stores/item";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
	name: "TaskSheetPage",
	data() {
		return {
			employeeFetchingData: {
				selectedDate: "",
				selectedTask: "",
				startWorkHour: "",
				finishWorkHour: "",
				durationTask: "",
			},
			queryLocal: {
				filterPlant: "",
				filterLocation: "",
				commonDate: [new Date(), null],
			},
		};
	},
	methods: {
		...mapActions(useEmployeeStore, ["fetchEmployeeAtTaskSheet"]),
		...mapActions(useTaskSheetStore, [
			"fetchTaskSheet",
			"fetchTaskSheetById",
		]),
		...mapActions(useCropAreaStore, ["fetchAllCropArea"]),
		...mapActions(useItemStore, ["fetchPlant"]),
		fetchDataInputEmployee(
			selectedDate,
			selectedTask,
			startWorkHour,
			finishWorkHour,
			durationTask
		) {
			
			console.log("masuk ke  fetchDataInputEmployee");
			const data = {
				selectedDate,
				selectedTask,
				startWorkHour,
				finishWorkHour,
				durationTask,
			};
			console.log(data, "data di fetchDataInputEmployee");
			this.fetchEmployeeAtTaskSheet(data);
		},
		formatTime(date) {
			if (!date) {
				return "";
			}
			return new Date(date).toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "numeric",
				hour12: true,
			});
		},
		formatDate(date) {
			if (!date) {
				return "";
			}
			return new Date(date).toLocaleDateString("en-AU", {
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		},
		queryAction(params, value) {
			console.log("masuk query action");
			console.log(params, value, "<<< params, value");
			console.log(this.queryLocal.commonDate, "<< commonDate");
			if (params === "filterPlant") {
				console.log("masuk ke if filterPlant");
				this.queryLocal.filterPlant = value;
			}
			if (params === "filterLocation") {
				console.log("masuk ke if filterLocation");
				this.queryLocal.filterLocation = value;
			}
			if (params === "commonDate") {
				console.log("masuk ke if commondate");
				console.log(value, "<< ini value");
				this.queryLocal.commonDate = value;
			}
			this.query = {
				filterPlant: this.queryLocal.filterPlant,
				filterLocation: this.queryLocal.filterLocation,
				commonDate: this.queryLocal.commonDate,
			};
			this.fetchTaskSheet();
		},
	},
	computed: {
		...mapWritableState(useTaskSheetStore, ["query"]),
		...mapState(useTaskSheetStore, ["taskSheets"]),
		...mapState(useEmployeeStore, ["employees"]),
		...mapState(useCropAreaStore, ["cropArea"]),
		...mapState(useItemStore, ["plants"]),
	},
	created() {
		this.fetchTaskSheet();
		this.fetchAllCropArea();
		this.fetchPlant();
	},
};
</script>

<template>
	<section
		id="seed-nursery-full-page"
		class="bg-blue-100 p-4 w-full flex flex-col gap-2"
	>
		<header class="text-7xl font-semibold text-center">Task Sheet</header>
		<div class="flex flex-col bg-slate-100 p-2 border-2 border-black rounded-md">
			<div class="border-b-2 border-black">
				<h3 class="text-lg font-semibold">
					FILTER
				</h3>
			</div>
			<div class="flex flex-row justify-between items-start gap-2 mb-2">
				<div class="flex flex-row gap-2">
					<div class="flex flex-col ">
						<div class="flex flex-col ">
							<p>Location</p>
						</div>
						<div>
							<select
								@change="
									queryAction(
										'filterLocation',
										queryLocal.filterLocation
									)
								"
								v-model="queryLocal.filterLocation"
							>
								<option value="" disabled selected>
									--Select Location--
								</option>
								<option v-for="item in cropArea" :value="item.name">
									{{ item.name }}
								</option>
							</select>
						</div>
					</div>
					<div class="flex flex-col ">
						<div class="flex flex-col ">
							<p>Date</p>
						</div>
						<VueDatePicker
							v-model="queryLocal.commonDate"
							close-on-scroll
							range
							:enable-time-picker="false"
							@update:model-value="
								queryAction(
									'commonDate',
									queryLocal.commonDate,
									queryLocal.filterDate
								)
							"
						>
						</VueDatePicker>
					</div>
				</div>
				<div class="flex flex-col ">
					<div class="flex flex-col ">
							<p>Plant</p>
						</div>
					<div>
						<select
							@change="queryAction('filterPlant', queryLocal.filterPlant)"
							v-model="queryLocal.filterPlant"
						>
							<option value="" disabled selected>
								---Select Plant---
							</option>
							<option
								v-for="item in plants"
								:key="item.id"
								:value="item.name"
							>
								{{ item.name }}
							</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<table class="w-full border-2 border-black rounded-md">
			<thead
				class="bg-slate-400 w-full h-10 whitespace-nowrap border-b-2 tracking-wide text-center border-gray-700"
			>
				<tr class="rounded-t-3xl">
					<th class="w-[1%]">No</th>
					<th class="w-[5%]">Plant</th>
					<th class="w-[5%]">Date</th>
					<th class="w-[5%]">Block</th>
					<th class="w-[5%]">HST</th>
					<th class="w-[5%]">Task</th>
					<th class="w-[5%]">Duration</th>
					<th class="w-[5%]">Fixed Duration</th>
					<th class="w-[5%] border-2 border-black">
						<div class="border-b-2 border-black">Work Time</div>
						<div
							class=" w-full flex flex-row text-sm justify-between"
						>
							<div class="border-r-2 border-black text-center w-[50%]">Start</div>
							<div class=" w-[50%]">Finish</div>
						</div>
					</th>
					<th class="w-[5%]">Employee</th>
					<th class="w-[5%]">Status</th>
				</tr>
			</thead>
			<tbody
				class="bg-slate-100 text-center tracking-wider divide-y divide-gray-600"
			>
				<tr
					class="whitespace-nowrap hover:bg-slate-200"
					v-for="(item, index) in taskSheets"
					:key="item.id"
				>
					<td class="h-14">
						{{ index + 1 }}
					</td>
					<td class="h-14" @click="fetchTaskSheetById(item.id)">
						{{ item?.PlantSchedule.PlantSheet.plant.name }} -
						{{ item?.PlantSchedule.code }}
					</td>
					<td class="h-14">{{ formatDate(item?.initialDate) }}</td>
					<td class="h-14">{{ item?.PlantSchedule.CropArea.name }}</td>
					<td class="h-14">
						{{ item?.PlantsheetTaskConjunction?.day }}
						{{ item?.PlantsheetTaskConjunction?.description }}
					</td>
					<td class="h-14">
						{{ item?.PlantsheetTaskConjunction?.Task?.name }}
					</td>
					<td class="h-14">
						<template v-if="item?.duration">
							{{ item.duration }} minutes
						</template>
						<template v-else> no record </template>
					</td>
					<td class="h-14">
						<template v-if="item?.fixedDuration">
							{{ item.fixedDuration }} minutes
						</template>
						<template v-else>
							no record
						</template>
					</td>
					<td class="h-14">
						<div v-if="item.startTaskTime && item.finishTaskTime" class="w-full flex flex-row justify-around">
							<div>{{ formatTime(item?.startTaskTime) }}</div>
							<div>{{ formatTime(item?.finishTaskTime) }}</div>
						</div>
						<div v-else>
							no record
						</div>
					</td>
					<td class="h-14">
						<ul v-if="item.EmployeeTaskPlantsheettaskScheduleConjunctions.length">
							<li class=" text-left" v-for="item in item.EmployeeTaskPlantsheettaskScheduleConjunctions" >
								• {{ item.employeecon.empl }}
							</li>
						</ul>
						<div v-else>
							no record
						</div>
					</td>
					<td class="h-14">
						{{ item?.statusTask }}
					</td>
				</tr>
			</tbody>
		</table>
	</section>
	<!-- <pre>{{ queryLocal }}</pre> -->
	<!-- <pre>ini employees{{ employees }}</pre>
	<pre>{{ employeeFetchingData }}</pre> -->
	<pre>{{ taskSheets }}</pre>
</template>

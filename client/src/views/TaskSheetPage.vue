<script>
import { mapActions, mapState } from "pinia";
import { useTaskSheetStore } from "../stores/taskSheet";
import {useEmployeeStore} from '../stores/employee'

export default {
	name: "TaskSheetPage",
	data() {
		return {
			employeeFetchingData: {
				selectedDate: '',
				selectedTask: '',
				startWorkHour: '',
				finishWorkHour: '',
				durationTask: ''
			},
		};
	},
	methods: {
		...mapActions(useEmployeeStore, ['fetchEmployeeAtTaskSheet']),
		...mapActions(useTaskSheetStore, ["fetchTaskSheet", 'fetchTaskSheetById']),
		fetchDataInputEmployee(selectedDate, selectedTask, startWorkHour, finishWorkHour, durationTask){
			console.log('masuk ke  fetchDataInputEmployee');
			const data = {
				selectedDate, selectedTask, startWorkHour, finishWorkHour, durationTask
			}
			console.log(data, 'data di fetchDataInputEmployee');
			this.fetchEmployeeAtTaskSheet(data)
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

	},
	computed: {
		...mapState(useTaskSheetStore, ["taskSheets"]),
		...mapState(useEmployeeStore, ['employees'])
	},
	created() {
		this.fetchTaskSheet();
	},
};
</script>

<template>
	<section
		id="seed-nursery-full-page"
		class="bg-blue-100 p-4 w-full flex flex-col gap-2"
	>
		<header class="text-7xl font-semibold text-center">Task Sheet</header>
		<table class="w-full">
			<thead
				class="bg-gray-400 w-full h-10 whitespace-nowrap border-b-2 tracking-wide text-center border-gray-700"
			>
				<tr class="rounded-t-3xl">
					<th class="rounded-tl-md bg-red-400 w-[1%]">No</th>
					<th class="w-[5%] bg-green-300">Plant</th>
					<th class="w-[5%] bg-slate-300">Date</th>
					<th class="w-[5%]">Block</th>
					<th class="w-[5%]">HST</th>
					<th class="w-[5%]">Task</th>
					<th class="w-[5%]">Duration</th>
					<th class="w-[5%]">Fixed Duration</th>
					<th class="w-[5%] bg-red-500">
						<div class="bg-yellow-300">Work Time</div>
						<div
							class="bg-green-500 w-full flex flex-row text-sm justify-between"
						>
							<div class="text-center w-[50%] bg-slate-600">Start</div>
							<div class="bg-blue-500 w-[50%]">Finish</div>
						</div>
					</th>
					<th class="w-[5%] bg-purple-500">Employee</th>
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
					<td class="h-14" @click="fetchTaskSheetById(item.id)" >
						{{ item?.PlantSchedule.PlantSheet.plant.name }} -
						{{ item?.PlantSchedule.code }}
					</td>
					<td class="h-14">{{ formatDate(item?.initialDate) }}</td>
					<td class="h-14">{{ item?.PlantSchedule.CropArea.name }}</td>
					<td class="h-14">
						{{ item?.PlantsheetTaskConjunction.day }}
						{{ item?.PlantsheetTaskConjunction.description }}
					</td>
					<td class="h-14">
						{{ item?.PlantsheetTaskConjunction.Task.name }}
					</td>
					<td class="h-14">
						<template v-if="item?.duration">
							{{ item.duration }} minutes
						</template>
						<template v-else> no record </template>
					</td>
					<td class="h-14">john doe</td>
					<td class="h-14">
						<div
							class=" w-full  flex flex-row justify-around "
						>
							<div>
								02:00
							</div>
							<div >03:00</div>
						</div>
					</td>
					<td class="h-14">
						<select id="employee-option" 
						@click="fetchDataInputEmployee(item.initialDate, item.PlantsheetTaskConjunction.Task.name,new Date(), new Date().getDate() + 1, item.duration)"
						
						>
							<option v-for="employee in employees" :key="employee.id">{{employee.employee.name}}</option>
						</select>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
	<pre>ini employees{{ employees }}</pre>
	<pre>{{ employeeFetchingData }}</pre>
	<!-- <pre>{{ taskSheets }}</pre> -->
</template>

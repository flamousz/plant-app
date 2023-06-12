<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useEmployeeStore } from "../stores/employee";
import BlueButton from '../components/Buttons/BlueButton.vue'
import { useCsvStore } from "../stores/csv";
import ExportButton from "../components/Buttons/ExportButton.vue";

export default {
	name: "EmployeePage",
	data(){
		return{
			itemsData: {
				status: null,
			},
			queries: {
				filter: ""
			},
		}
	},
	methods: {
		...mapActions(useCsvStore, ['postExportTaskMaster']),
		...mapActions(useEmployeeStore, ["fetchEmployee"]),
		queryAction(params, val) {
			console.log(params, val, "ini query action");
			if (params === "filter") {
				this.queries.page = 1;
				this.queries.filter = val;
			}
			
			this.query = {
				filter: this.queries.filter,
			};
			this.fetchEmployee();
		}
	},
	computed: {
		...mapWritableState(useEmployeeStore, ['query']),
		...mapState(useEmployeeStore, ["employees"]),
	},
	created() {
		this.fetchEmployee();
	},
	components: { BlueButton, ExportButton }
};
</script>

<template>
    <!-- <pre>{{ employees }}</pre> -->
	<div class="bg-blue-100 p-4 w-full h-full flex flex-col static">
		<div class="z-40 fixed bottom-6 right-7 flex opacity-50 hover:opacity-90">
			<RouterLink to="/employee/form"
				><BlueButton :type="'button'" :text="'+ Employee'"
			/></RouterLink>
		</div>
		<div class="flex flex-row justify-between items-center">
			<div @click.prevent="postExportTaskMaster(employees)">
				<ExportButton/>
			</div>
			<div class="flex flex-row gap-1">
				<div>Status:</div>
				<div>
					<select
						v-model="itemsData.status"
						@change="queryAction('filter', itemsData.status)"
					>
						<option value="" disabled>---Select Status---</option>
						<option value="avail">Available</option>
						<option value="archived">Archived</option>
					</select>
				</div>
			</div>
		</div>
		<table class="w-full ">
			<thead
				class="bg-gray-400 h-10 whitespace-nowrap border-b-2 tracking-wide text-center border-gray-700"
			>
				<tr class="rounded-t-3xl">
					<th class="rounded-tl-md w-2">No</th>
					<th class="w-10">Name</th>
					<th class="w-10">NIK</th>
					<th class="w-10">Gender</th>
					<th class="w-10">Status</th>
				</tr>
			</thead>
			<tbody
				class="bg-slate-100 text-center tracking-wider divide-y divide-gray-600"
			>
				<tr
					class="whitespace-nowrap hover:bg-slate-200"
					v-for="(item, index) in employees"
					@click.prevent="this.$router.push(`/employee/detail/${item.id}`)"
					:key="item.id"
				>
					<td class="h-14">
						{{ index+1 }}
					</td>
					<td class="h-14">{{ item?.name }}</td>
					<td class="h-14">{{ item?.nik }}</td>
					<td class="h-14">{{ item?.gender }}</td>
					<td class="h-14">{{ item?.arcStatus }}</td>
				</tr>
			</tbody>		
		</table>
	</div>
</template>

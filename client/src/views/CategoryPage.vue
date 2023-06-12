<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useCategoryStore } from "../stores/category";
import BlueButton from '../components/Buttons/BlueButton.vue'
import ExportButton from "../components/Buttons/ExportButton.vue";
import { useCsvStore } from "../stores/csv";

export default {
	name: "CategoryPage",
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
		...mapActions(useCategoryStore, ['fetchCategory']),
		...mapActions(useCsvStore,['postExportTaskMaster']),
		queryAction(params, val) {
			console.log(params, val, "ini query action");
			if (params === "filter") {
				this.queries.filter = val;
			}
			
			this.query = {
				filter: this.queries.filter,
			};
			this.fetchCategory();
		}
	},
	computed: {
		...mapWritableState(useCategoryStore, ['query']),
		...mapState(useCategoryStore, ["categories"]),
	},
	created() {
		this.fetchCategory();
	},
	components: { BlueButton, ExportButton }
};
</script>

<template>
    <!-- <pre>{{ categories }}</pre> -->
	<div class="bg-blue-100 p-4 w-full h-full flex flex-col static">
		<div class="z-40 fixed bottom-6 right-7 flex opacity-50 hover:opacity-90">
			<RouterLink to="/category/form"
				><BlueButton :type="'button'" :text="'+ Category'"
			/></RouterLink>
		</div>
		<div class="flex flex-row justify-between items-center">
			<div @click.prevent="postExportTaskMaster(categories)">
				<ExportButton/>
			</div>
			<div class="flex flex-row gap-1">
				<div>Status:</div>
				<div>
					<select
						v-model="itemsData.status"
						@change="queryAction('filter', itemsData.status)"
					>
						<option value="" disabled selected>---Select Status---</option>
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
					<th class="w-10">Description</th>
					<th class="w-10">Status</th>
				</tr>
			</thead>
			<tbody
				class="bg-slate-100 text-center tracking-wider divide-y divide-gray-600"
			>
				<tr
					class="whitespace-nowrap hover:bg-slate-200"
					v-for="(item, index) in categories"
					@click.prevent="this.$router.push(`/categorydetail/${item.id}`)"
					:key="item.id"
				>
					<td class="h-14">
						{{ index+1 }}
					</td>
					<td class="h-14">{{ item?.name }}</td>
					<td class="h-14">{{ item?.description }}</td>
					<td class="h-14">{{ item?.arcStatus }}</td>
				</tr>
			</tbody>		
		</table>
	</div>
</template>

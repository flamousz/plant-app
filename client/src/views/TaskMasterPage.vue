<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import BlueButton from "../components/Buttons/BlueButton.vue";
import { useTaskStore } from "../stores/task";
import { useCsvStore } from "../stores/csv";
import ExportButton from "../components/Buttons/ExportButton.vue";
import ImportButton from "../components/Buttons/ImportButton.vue";

export default {
	name: "TaskMasterPage",
	data() {
		return {
			taskData: {
				status: null,
			},
			queries: {
				filter: "",
			},
		};
	},
	methods: {
		/*
			front-end tech stack:
			vue3 option api, pinia state store

			backend tech stack:
			node js, sequelize orm, express js, postgres, rest API

			i have import feature to upload csv file from client and send to back end, what input should i use? is it req.file? 

			and if i upload image i can use multer, do you any suggestion to send csv file from front-end to back-end?
		*/
		...mapActions(useTaskStore, ["fetchTasks"]),
		...mapActions(useCsvStore, ["postExportTaskMaster"]),
		queryAction(value) {
			console.log(value);
			this.query = {
				filter: value,
			};
			this.fetchTasks();
		},
	},
	computed: {
		...mapWritableState(useTaskStore, ["query"]),
		...mapState(useTaskStore, ["tasks"]),
	},
	created() {
		this.fetchTasks();
		console.log(this.queries.filter, "<<< queris filter");
	},
	components: { BlueButton, ExportButton, ImportButton },
};
</script>

<template>
	<!-- <pre>{{ tasks }}</pre> -->
	<div class="bg-blue-100 p-4 w-full h-screen flex flex-col static">
		<div class="z-40 fixed bottom-6 right-7 flex opacity-50 hover:opacity-90">
			<RouterLink to="/taskmaster/form"
				><BlueButton :type="'button'" :text="'+ Task'"
			/></RouterLink>
		</div>
		<div class="flex flex-row justify-between items-center">
			<div class="flex flex-row  justify-start items-start">
				<div>
					<ImportButton />
				</div>
				<div @click.prevent="postExportTaskMaster(tasks)">
					<ExportButton />
				</div>
			</div>
			<div class="flex flex-row justify-end items-end gap-3 pr-1 mb-2">
				<div class="flex flex-row gap-1">
					<button
						:class="{
							'bg-red-500': query.filter === 'archived',
							'text-red-100': query.filter === 'archived',
						}"
						@click.prevent="queryAction('archived')"
						class="border border-black p-1 w-[100%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100 bg-red-100"
					>
						Archived
					</button>
				</div>
				<div class="flex flex-row gap-1">
					<button
						:class="{
							'bg-red-500': query.filter === 'avail',
							'text-red-100': query.filter === 'avail',
						}"
						@click.prevent="queryAction('avail')"
						class="border border-black p-1 w-[100%] h-[5%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100 bg-red-100"
					>
						Available
					</button>
				</div>
			</div>
		</div>

		<table class="w-full">
			<thead
				class="bg-gray-400 h-10 whitespace-nowrap border-b-2 tracking-wide text-center border-gray-700"
			>
				<tr class="rounded-t-3xl">
					<th class="rounded-tl-md w-2">No</th>
					<th class="w-10">Name</th>
					<th class="w-10">1 m<sup>2</sup> per Minute</th>
					<th class="w-10">Status</th>
				</tr>
			</thead>
			<tbody
				class="bg-slate-100 text-center tracking-wider divide-y divide-gray-600"
			>
				<tr
					class="whitespace-nowrap hover:bg-slate-200"
					v-for="(item, index) in tasks"
					@click.prevent="this.$router.push(`/taskmaster/${item.id}`)"
					:key="item.id"
				>
					<td class="h-14">
						{{ index + 1 }}
					</td>
					<td class="h-14">{{ item?.name }}</td>
					<td class="h-14">
						{{ item?.TaskPerMinute }} m<sup>2</sup>/minute
					</td>
					<td class="h-14">{{ item?.arcStatus }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useTaskStore } from "../stores/task";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";
import GreenButton from "../components/Buttons/GreenButton.vue";
import TableRow4Colum from "../components/TableRow/TableRow4Colum.vue";

export default {
	name: "TaskMasterDetailPage",
	data() {
		return {
			role: localStorage.getItem("role"),
			taskData: {
				id: 0,
				arcStatus: "",
			},
		};
	},
	methods: {
		...mapActions(useTaskStore, [
			"getTaskById",
			"getTaskByIdForEdit",
			"patchTask",
			"deleteTask",
		]),
		patchLocal() {
			this.taskData.id = this.taskDetail.id;
			if (this.taskDetail.arcStatus === "archived") {
				this.taskData.arcStatus = "avail";
			} else {
				this.taskData.arcStatus = "archived";
			}
			console.log(this.cropData, "<<< ini cropData");
			this.patchTask(this.taskData);
		},
	},
	computed: {
		...mapState(useTaskStore, ["taskDetail"]),
		archive() {
			if (this.taskDetail.arcStatus === "archived") {
				return "avail";
			} else {
				return "archived";
			}
		},
	},
	created() {
		this.getTaskById(this.$route.params.id);
	},
	components: { RedButton, BlueButton, GreenButton, TableRow4Colum },
};
</script>

<template>
	<!-- <pre>{{ taskDetail }}</pre> -->
	<section id="task-master-form" class="w-full">
		<div class="flex flex-col px-10">
			<div id="button-processing">
				<div class="w-full flex justify-end items-end pt-4">
					<div class="text-2xl font-bold w-[8%]">STATUS:</div>
					<div
						class="w-[13%] border-[3px] rounded-md border-slate-800 bg-yellow-300 font-semibold text-center tracking-wide"
					>
						{{ taskDetail.status }} -
						{{ taskDetail.arcStatus }}
					</div>
				</div>
				<div class="flex flex-row h-[50px] mb-3">
					<div
						class="w-[40%] flex justify-start items-end text-5xl font-bold"
					>
						Task Master Detail
					</div>
					<div class="w-[60%] flex flex-row justify-end items-end gap-3">
						<div @click="patchLocal">
							<RedButton
								v-if="role !== 'super'"
								:type="'button'"
								:text="archive"
							/>
						</div>
						<div
							@click="deleteTask(taskDetail.id)"
							v-if="role === 'super'"
						>
							<RedButton :type="'button'" :text="'DELETE'" />
						</div>
						<div
							@click="getTaskByIdForEdit(taskDetail.id)"
							v-if="role === 'super' || taskDetail.status === 'draft'"
						>
							<BlueButton :type="'button'" :text="'EDIT'" />
						</div>
					</div>
				</div>
			</div>
			<div
				id="form-section"
				class="flex flex-col p-4 bg-slate-100 mt-5 h-full border-2 border-black rounded tracking-wide gap-4"
			>
				<div class="flex flex-row gap-2">
					<div class="flex justify-between items-center w-[13%]">
						<div>Name</div>
						<div>:</div>
					</div>
					<div>
						{{ taskDetail.name }}
					</div>
				</div>
				<div class="flex flex-row gap-2">
					<div class="flex justify-between items-center w-[13%]">
						<div>Task per Minute</div>
						<div>:</div>
					</div>
					<div>{{ taskDetail.TaskPerMinute }} m<sup>2</sup>/minute</div>
				</div>
				<div class="flex flex-row gap-2">
					<div class="flex justify-between items-start w-[13%]">
						<div>Description</div>
						<div>:</div>
					</div>
					<div>
						{{ taskDetail.description }}
					</div>
				</div>
			</div>
			<div
				v-if="taskDetail.ToolConjunctions[0]"
				id="tool-table"
				class="flex flex-col p-4 bg-slate-100 mt-5 h-[200px] border-2 border-black rounded tracking-wide gap-1 overflow-auto"
			>
				<section id="breadcrumb">
					<div
						class="border bg-red-500 text-red-100 border-black p-1 w-[5%] text-center rounded-md"
					>
						tools
					</div>
				</section>
				<section id="table-tool" class="pt-2">
					<div class="w-[90%] flex flex-col">
						<thead>
							<tr class="flex flex-row w-[80%] bg-slate-400">
								<th class="w-[4.5%] border-black border">No</th>
								<th class="w-[18.5%] border-black border-r-2 border">
									Name
								</th>
								<th class="w-[13%] border-y border-black border-r">
									Code
								</th>
								<th class="w-[55%] border border-black">Description</th>
								<th class="w-[10%] border border-black">Status</th>
							</tr>
						</thead>
						<tbody>
							<TableRow4Colum
								v-for="(tools, index) in taskDetail.ToolConjunctions"
								:key="tools.id"
								:tools="tools"
								:index="index"
							/>
						</tbody>
					</div>
				</section>
			</div>
		</div>
	</section>
	<!-- <pre>{{ taskData }}</pre> -->
</template>

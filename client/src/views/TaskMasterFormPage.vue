<script>
import { mapActions, mapState } from "pinia";
import { useTaskStore } from "../stores/task";
import { useItemStore } from "../stores/item";
import { useUserStore } from "../stores/user";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";
import GreenButton from "../components/Buttons/GreenButton.vue";

export default {
	name: "TaskMasterFormPage",
	data() {
		return {
			role: localStorage.getItem("role"),
			taskData: {
				id: 0,
				name: "",
				TaskPerMinute: null,
				description: "",
				status: "",
				ToolConjunctions: [
					{
						ToolId: 0,
					},
				],
			},
		};
	},
	methods: {
		...mapActions(useTaskStore, ["postTask", "putTask"]),
		...mapActions(useItemStore, ["fetchTool"]),
		handlePutorPost() {
			if (this.editFlag) {
				this.putTask(this.taskData);
			} else if (!this.editFlag) {
				this.postTask(this.taskData);
			}
		},
		handleStatus(value) {
			this.taskData.status = value;
		},
		handleDeletedConjunctions(key, index, suffix = "") {
			console.log(index, "<< index from handleDeletedConjunctions");
			this.taskData[`${key}Conjunctions${suffix}`].splice(index, 1);
		},
		addColumn(array) {
			array.push({});
		},
	},
	computed: {
		...mapState(useItemStore, ["tools"]),
		...mapState(useTaskStore, ["editFlag", "tasks", "taskDetail"]),
		heading() {
			if (this.editFlag === true) {
				return "Edit";
			} else if (this.editFlag === false) {
				return "New";
			}
		},
		...mapState(useUserStore, [""]),
	},
	created() {
		this.fetchTool();
		if (this.editFlag) {
			this.taskData.id = this.taskDetail.id;
			this.taskData.name = this.taskDetail.name;
			this.taskData.TaskPerMinute = this.taskDetail.TaskPerMinute;
			this.taskData.description = this.taskDetail.description;
			this.taskData.ToolConjunctions = this.taskDetail.ToolConjunctions;
			this.taskData.status = this.taskDetail.status
		}
	},
	components: { RedButton, BlueButton, GreenButton },
};
</script>

<template>
	<!-- <pre>{{ taskData.description }}</pre> -->
	<!-- <pre>{{ taskDetail }}</pre> -->
	<section id="task-master-form" class="w-full">
		<form @submit.prevent="handlePutorPost">
			<div class="flex flex-col px-10">
				<div id="button-processing">
					<div
						class="w-full flex justify-end items-end pt-4"
						v-if="editFlag === true"
					>
						<div class="text-2xl font-bold w-[8%]">STATUS:</div>
						<div
							class="w-[6%] border-[3px] rounded-md border-slate-800 bg-yellow-300 font-semibold text-center tracking-wide"
						>
							{{ taskDetail.status }}
						</div>
					</div>
					<div class="flex flex-row h-[50px] mb-3">
						<div
							class="w-[40%] flex justify-start items-end text-5xl font-bold"
						>
							{{ heading }} Task Master Form
						</div>
						<div
							class="w-[60%] flex flex-row justify-end items-end gap-3"
						>
							<div @click="handleStatus('confirm')">
								<BlueButton
									:type="'submit'"
									:text="'Confirm'"
									v-if="role !== 'super' && editFlag === true"
								/>
							</div>
							<div @click="handleStatus('draft')">
								<GreenButton
									:type="'submit'"
									:text="'Draft'"
									v-if="role !== 'super' && editFlag === true"
								/>
							</div>
							<GreenButton
								:type="'submit'"
								:text="'Submit'"
								v-if="role === 'super' || editFlag === false"
							/>
							<button
								class="bg-red-500 rounded flex hover:bg-red-900 justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px]"
								@click.prevent="
									this.$router.push(`/taskmaster/${taskDetail.id}`)
								"
								v-if="editFlag === true"
							>
								Cancel
							</button>
							<RouterLink to="/taskmaster">
								<button
									v-if="editFlag === false"
									class="bg-[#c52b2b] rounded flex hover:bg-red-900 justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px]"
								>
									Cancel
								</button>
							</RouterLink>
						</div>
					</div>
				</div>
				<div
					id="form-section"
					class="flex flex-col p-4 bg-slate-100 mt-5 h-full border-2 border-black rounded tracking-wide gap-4"
				>
					<div class="flex flex-row gap-2">
						<div class="flex justify-between items-center w-[13%]">
							<label>Name</label>
							<label>:</label>
						</div>
						<input
							id="name"
							class="placeholder:text-xs p-[6px] border-2 border-gray-300 rounded-md bg-green-100"
							placeholder="Name ...."
							name="name"
							type="text"
							v-model="taskData.name"
						/>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-between items-center w-[13%]">
							<label>1 m<sup>2</sup> per Minute</label>
							<label>:</label>
						</div>
						<input
							id="TaskPerMinute"
							class="placeholder:text-md p-[6px] border-2 border-gray-300 rounded-md bg-green-100"
							placeholder="........."
							name="TaskPerMinute"
							type="number"
							step="0.1"
							v-model="taskData.TaskPerMinute"
						/>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-between items-start w-[13%]">
							<label>Description</label>
							<label>:</label>
						</div>
						<select
							v-model="taskData.description"
							name="description"
							id="description"
						>
							<option value="" disabled>---select description---</option>
							<option value="fertilizer">fertilizer</option>
							<option value="material">material</option>
							<option value="pesticide">pesticide</option>
						</select>
					</div>
				</div>
				<div
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
						<div class="w-[90%] flex flex-col gap-2">
							<div>
								<div>
									<div class="flex flex-row w-full">
										<div
											class="w-[10%] text-center border-black border"
										>
											Name
										</div>
										<div
											class="w-[10%] border border-black text-center"
										>
											Action
										</div>
									</div>
								</div>
								<div
									v-for="(el, index) in taskData.ToolConjunctions"
									class="w-full flex flex-row"
								>
									<div class="w-[10%] border border-black">
										<select
											v-model="el.ToolId"
											class="bg-yellow-200 hover:bg-yellow-300 rounded-md h-full flex flex-col w-full"
										>
											<option value="" disabled>
												Enter here ..
											</option>
											<option
												class="text-center"
												v-for="item in tools"
												:key="item.id"
												:value="item.id"
											>
												{{ item.name }}
											</option>
										</select>
									</div>
									<div
										class="w-[10%] border border-black flex flex-col justify-center items-center bg-yellow-200"
									>
										<button
											class="bg-red-500 w-[60%] rounded text-slate-200 tracking-wide font-semibold text-center text-sm hover:bg-red-800"
											@click.prevent="
												handleDeletedConjunctions('Tool', index)
											"
										>
											DELETE
										</button>
									</div>
								</div>
							</div>
							<button
								class="bg-red-500 w-[5%] h-full rounded text-slate-200 text-sm hover:bg-red-800"
								@click.prevent="
									addColumn(this.taskData.ToolConjunctions)
								"
							>
								<span class="text-2xl font-extrabold">+</span>
								Tool
							</button>
						</div>
					</section>
				</div>
			</div>
		</form>
	</section>
	<pre>{{ taskData }}</pre>
</template>

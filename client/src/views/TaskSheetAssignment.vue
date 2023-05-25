<script>
import { mapActions, mapState } from "pinia";
import { useTaskStore } from "../stores/task";
import { useTaskSheetStore } from "../stores/taskSheet";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";
import GreenButton from "../components/Buttons/GreenButton.vue";
import { useEmployeeStore } from "../stores/employee";

export default {
	name: "TaskSheetAssignment",
	data() {
		return {
			role: localStorage.getItem("role"),
			activeTab: "worktime",
			employeeArray: [
				{
					id: 0,
				},
			],
			employeeFetchingData: {
				selectedDate: "",
				selectedTask: "",
				startWorkHour: "",
				finishWorkHour: "",
				durationTask: 0,
			},
			employeeAssignment: {
				id: 0,
				workMinuteQuota: 0,
				workingTimeLog: ''
			}
		};
	},
	methods: {
		...mapActions(useEmployeeStore, ["fetchEmployeeAtTaskSheet", 'putEmployeeAtTaskSheet']),
		...mapActions(useTaskSheetStore, ["fetchTaskSheetById"]),
		localputEmployeeAtTaskSheet(data){
			this.putEmployeeAtTaskSheet(data)
		},
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
		handlePutorPost() {
			if (this.editFlag) {
				this.putTask(this.taskData);
			} else if (!this.editFlag) {
				this.postTask(this.taskData);
			}
		},
		buttonSelector(val) {
			this.activeTab = val;
		},
		handleStatus(value) {
			this.taskData.status = value;
		},
		handleDeletedConjunctions(index) {
			this.employeeArray.splice(index, 1);
			console.log(index, "<< index from handleDeletedConjunctions");
		},
		addColumn(array) {
			array.push({});
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
		...mapState(useEmployeeStore, ["employees"]),
		...mapState(useTaskSheetStore, ["taskSheetDetail"]),
		...mapState(useTaskStore, ["editFlag", "tasks", "taskDetail"]),
		heading() {
			if (this.editFlag === true) {
				return "Edit";
			} else if (this.editFlag === false) {
				return "New";
			}
		},
		computedFixedDuration(){
			return this.taskSheetDetail.duration / this.employeeArray.length
		}
	},
	created() {
		this.fetchTaskSheetById(this.$route.params.id);
		if (this.editFlag) {
			this.taskData.id = this.taskDetail.id;
			this.taskData.name = this.taskDetail.name;
			this.taskData.TaskPerMinute = this.taskDetail.TaskPerMinute;
			this.taskData.description = this.taskDetail.description;
			this.taskData.ToolConjunctions = this.taskDetail.ToolConjunctions;
			this.taskData.status = this.taskDetail.status;
		}
	},
	components: { RedButton, BlueButton, GreenButton },
};
</script>

<template>
	<!-- <pre>{{ taskData.description }}</pre> -->
	<!-- <pre>{{ taskDetail }}</pre> -->
	<section id="task-master-form" class="w-full">
		<div class="flex flex-col px-10">
			<section id="information-block">
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
							Task Assignment
						</div>
					</div>
				</div>
				<div
					id="form-section"
					class="flex flex-col p-4 bg-slate-100 mt-5 h-full border-2 border-black rounded tracking-wide gap-4"
				>
					<div class="flex flex-row gap-2">
						<div class="flex justify-between items-center w-[13%]">
							<label>Task</label>
							<label>:</label>
						</div>
						<div>
							<p>
								{{
									taskSheetDetail?.PlantsheetTaskConjunction?.Task
										?.name
								}}
							</p>
						</div>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-between items-center w-[13%]">
							<label>Plant</label>
							<label>:</label>
						</div>
						<div>
							<p>
								{{
									taskSheetDetail?.PlantSchedule?.PlantSheet?.plant
										?.name
								}}
							</p>
						</div>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-between items-center w-[13%]">
							<label>Plant Schedule Code</label>
							<label>:</label>
						</div>
						<div>
							<p>
								{{ taskSheetDetail?.PlantSchedule?.code }}
							</p>
						</div>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-between items-center w-[13%]">
							<label>{{
								taskSheetDetail?.PlantsheetTaskConjunction?.description
							}}</label>
							<label>:</label>
						</div>
						<div>
							<p>
								{{ taskSheetDetail?.PlantsheetTaskConjunction?.day
								}}<span
									v-if="
										taskSheetDetail?.PlantsheetTaskConjunction
											?.day === '1'
									"
									>st</span
								><span
									v-else-if="
										taskSheetDetail?.PlantsheetTaskConjunction
											?.day === '2'
									"
									>nd</span
								><span
									v-else-if="
										taskSheetDetail?.PlantsheetTaskConjunction
											?.day === '3'
									"
									>rd</span
								><span v-else>th</span> Day -
								{{ formatDate(taskSheetDetail?.initialDate) }}
							</p>
						</div>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-between items-center w-[13%]">
							<label>Block</label>
							<label>:</label>
						</div>
						<div>
							<p>
								{{ taskSheetDetail?.PlantSchedule?.CropArea?.name }}
							</p>
						</div>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-between items-center w-[13%]">
							<label>Duration</label>
							<label>:</label>
						</div>
						<div>
							<p>{{ taskSheetDetail?.duration }} minutes</p>
						</div>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-between items-center w-[13%]">
							<label>Fixed Duration</label>
							<label>:</label>
						</div>
						<div>
							<!-- <p v-if="taskSheetDetail.fixedDuration">
								{{ taskSheetDetail?.duration }}
							</p>
							<p v-else>Duration not fixed yet</p> -->
							{{ computedFixedDuration }} minutes
						</div>
					</div>
				</div>
			</section>
			<form @submit.prevent="handlePutorPost">
				<div
					id="tool-table"
					class="flex flex-col p-4 bg-slate-100 mt-5 h-[200px] border-2 border-black rounded tracking-wide gap-1 overflow-auto"
				>
					<section id="breadcrumb" class="flex flex-row gap-1">
						<div
							:class="{
								'bg-red-500': activeTab === 'worktime',
								'text-red-100': activeTab === 'worktime',
							}"
							class="border border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400"
							@click.prevent="buttonSelector('worktime')"
						>
							Worktime
						</div>
						<div
							@click.prevent="buttonSelector('employee')"
							:class="{
								'bg-red-500': activeTab === 'employee',
								'text-red-100': activeTab === 'employee',
							}"
							class="border border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400"
						>
							Employees
						</div>
					</section>
					<section id="table-tool" class="pt-2">
						<div class="w-[90%] flex flex-col gap-4">
							<div
								v-if="activeTab === 'worktime'"
								class="flex flex-col gap-4"
							>
								<div class="flex flex-row gap-2">
									<div
										class="flex justify-between items-center w-[13%]"
									>
										<label>Start Work Hour</label>
										<label>:</label>
									</div>
									<input
										id="name"
										class="placeholder:text-xs p-[6px] border-2 border-gray-300 rounded-md bg-green-100"
										placeholder="Name ...."
										name="name"
										type="datetime-local"
										v-model="employeeFetchingData.startWorkHour"
									/>
								</div>
								<div class="flex flex-row gap-2">
									<div
										class="flex justify-between items-center w-[13%]"
									>
										<label>Finish Work Hour</label>
										<label>:</label>
									</div>
									<input
										id="name"
										class="placeholder:text-xs p-[6px] border-2 border-gray-300 rounded-md bg-green-100"
										placeholder="Name ...."
										name="name"
										type="datetime-local"
										v-model="employeeFetchingData.finishWorkHour"
									/>
								</div>
							</div>
							<div
								class="flex flex-col gap-2"
								v-if="activeTab === 'employee'"
							>
								<div>
									<div>
										<div class="flex flex-row w-full">
											<div
												class="w-[10%] text-center border-black border rounded-tl-md"
											>
												Name
											</div>
											<div
												class="w-[16%] border border-black text-center rounded-tr-md"
											>
												Action
											</div>
										</div>
									</div>
									<div
										v-for="(el, index) in employeeArray"
										class="w-full flex flex-row"
									>
										<div class="w-[10%] border border-black rounded-bl-md">
											<select
												v-model="el.id"
												@click="
													fetchDataInputEmployee(
														taskSheetDetail.initialDate,
														taskSheetDetail
															.PlantsheetTaskConjunction.Task
															.name,
														employeeFetchingData.startWorkHour,
														employeeFetchingData.finishWorkHour,
														taskSheetDetail.duration
													)
												"
												class="bg-yellow-200 hover:bg-yellow-300 rounded-md h-full flex flex-col w-full"
											>
												<option value="" disabled>
													Enter here ..
												</option>
												<option
													v-for="employee in employees"
													:key="employee.id"
													:value="employee.id"
												>
													{{ employee.employee.name }}
												</option>
											</select>
										</div>
										<div
											class="w-[16%] h-[35px] border border-black rounded-br-md flex flex-row justify-around items-center bg-yellow-200"
										>
											<button
												class="bg-blue-600 w-[40%] rounded h-[25px] text-slate-200 tracking-wide font-semibold text-center text-sm hover:bg-blue-800 "
												@click.prevent="
													localputEmployeeAtTaskSheet(index)
												"
											>
												accept
											</button>
											<button
												class="bg-red-500 w-[40%] h-[25px]  rounded text-slate-200 tracking-wide font-semibold text-center text-sm hover:bg-red-800"
												@click.prevent="
													handleDeletedConjunctions(index)
												"
											>
												delete
											</button>
										</div>
									</div>
								</div>
								<button
									class="bg-red-500 w-[5%] h-full rounded text-slate-200 text-sm hover:bg-red-800"
									@click.prevent="addColumn(this.employeeArray)"
								>
									<span class="text-2xl font-extrabold">+</span>
									add
								</button>
							</div>
						</div>
					</section>
				</div>
				<div id="button-processing">
					<div class="flex justify-end h-[50px] mb-3">
						<div class="flex flex-row justify-end items-end gap-3">
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
							<RouterLink to="/tasksheet">
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
			</form>
		</div>
	</section>
	<pre>{{ employeeArray }}</pre>
	<pre>{{ employees }}</pre>
	<!-- <pre>{{ employeeFetchingData }}</pre> -->
</template>

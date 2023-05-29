<script>
import { mapActions, mapState } from "pinia";
import { useTaskStore } from "../stores/task";
import { useTaskSheetStore } from "../stores/taskSheet";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";
import GreenButton from "../components/Buttons/GreenButton.vue";
import { useEmployeeStore } from "../stores/employee";
import BackButton from "../components/Buttons/BackButton.vue";

export default {
	name: "TaskSheetAssignment",
	data() {
		return {
			role: localStorage.getItem("role"),
			activeTab: "worktime",
			inputDisabled: false,
			totalEmployee: null,
			employeeArray: [
				{
					id: 0,
					status: false,
				},
			],
			employeesLocal: [],
			employeeFetchingData: {
				id: this.$route.params.id,
				selectedDate: "",
				selectedTask: "",
				startWorkHour: "",
				finishWorkHour: "",
				durationTask: 0,
				fixedDuration: 0,
			},
			employeeAssignment: {
				id: 0,
				workMinuteQuota: 0,
				startTaskTime: null,
				finishTaskTime: null,
				PlantsheetTaskScheduleConjunctionId: null,
			},
		};
	},
	methods: {
		disableInput() {
			this.inputDisabled = true;
		},
		...mapActions(useEmployeeStore, [
			"fetchEmployeeAtTaskSheet",
			"putEmployeeAtTaskSheet",
		]),
		...mapActions(useTaskSheetStore, ["fetchTaskSheetById", "postTaskSheet"]),
		localputEmployeeAtTaskSheet(
			id,
			workMinuteQuota,
			startTaskTime,
			finishTaskTime,
			idLocalEmployee
		) {
			this.employeeAssignment = {
				id,
				workMinuteQuota,
				startTaskTime,
				finishTaskTime,
				PlantsheetTaskScheduleConjunctionId: this.$route.params.id,
			};
			this.putEmployeeAtTaskSheet(this.employeeAssignment);
			this.employeeAssignment = {
				id: 0,
				workMinuteQuota: 0,
				startTaskTime: null,
				finishTaskTime: null,
				PlantsheetTaskScheduleConjunctionId: null,
			};
			this.fetchDataInputEmployee(
				this.taskSheetDetail.initialDate,
				this.taskSheetDetail.PlantsheetTaskConjunction.Task.name,
				this.employeeFetchingData.startWorkHour,
				this.employeeFetchingData.finishWorkHour,
				this.taskSheetDetail.duration
			);
			this.employeeArray[idLocalEmployee].status = true;
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
			console.log(
				data,
				"data di fetchDataInputEmployee fetchDataInputEmployee"
			);
			this.fetchEmployeeAtTaskSheet(data);
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
		handlePutorPost() {
			if (this.editFlag) {
				this.putTask(this.taskData);
			} else if (!this.editFlag) {
				if (this.employeeArray[0].id === 0) {
					Toastify({
						text: `employee must be assign`,
						style: {
							background: "linear-gradient(to right, #611302, #a62103)",
						},

						duration: 2000,
					}).showToast();
				} else if (this.employeeFetchingData.startWorkHour) {
					this.employeeArray.forEach((el, index) => {
						this.localputEmployeeAtTaskSheet(
							el.id,
							this.computedFixedDuration,
							this.employeeFetchingData.startWorkHour,
							this.employeeFetchingData.finishWorkHour,
							index
						);
					});

					this.postTaskSheet(this.employeeFetchingData);
				}
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
	},
	watch: {
		employees: {
			// Watch for changes in the "employees" property
			immediate: true, // Trigger the handler immediately when the component is created
			handler(newEmployees) {
				// The handler function that will be executed when "employees" changes
				this.employeesLocal = []; // Clear the array before populating it again with new values

				// Iterate over the "newEmployees" array and perform operations on each element
				newEmployees.forEach((el) => {
					this.employeesLocal.push(el); // Push the element to the "employeesLocal" array
				});
			},
		},
		totalEmployee(value) {
			const diff = value - this.employeeArray.length;
			if (value > this.employeesLocal.length) {
				this.totalEmployee = null;
				Toastify({
					text: `Maximal employees are ${this.employeesLocal.length}`,
					style: {
						background: "linear-gradient(to right, #611302, #a62103)",
					},

					duration: 2000,
				}).showToast();
			}
			if (diff > 0) {
				for (let i = 1; i <= diff; i++) {
					this.employeeArray.push({ id: i });
				}
			} else if (diff < 0) {
				this.employeeArray.splice(value);
			}
		},
		"employeeFetchingData.finishWorkHour": function (newValue) {
			console.log("newValue:", newValue);
			// Perform any actions or computations based on the new value
			if (this.employeeFetchingData.startWorkHour >= newValue) {
				this.employeeFetchingData.startWorkHour = null;
				this.employeeFetchingData.finishWorkHour = null;
				Toastify({
					text: `finish work hour must be greater than start hour`,
					style: {
						background: "linear-gradient(to right, #611302, #a62103)",
					},

					duration: 2000,
				}).showToast();
			} else {
				this.fetchDataInputEmployee(
					this.taskSheetDetail.initialDate,
					this.taskSheetDetail.PlantsheetTaskConjunction.Task.name,
					this.employeeFetchingData.startWorkHour,
					newValue,
					this.taskSheetDetail.duration
				);
			}
		},
	},
	computed: {
		maxEmployeeCount() {
			return this.employeesLocal.length;
		},
		isTotalEmployeeInputDone() {
			return this.totalEmployee === null || this.totalEmployee === "";
		},
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
		computedFixedDuration() {
			this.employeeFetchingData.fixedDuration =
				Math.ceil(this.taskSheetDetail.duration / this.employeeArray.length)
			return Math.ceil(this.taskSheetDetail.duration / this.employeeArray.length)
		},
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
	components: { RedButton, BlueButton, GreenButton, BackButton },
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
					id="information-section"
					class="flex flex-row p-4 bg-slate-100 mt-5 h-full border-2 border-black rounded tracking-wide gap-4"
				>
					<section
						id="first-box"
						class="border-2 border-black rounded-md bg-slate-200 w-[400px] px-4 py-2"
					>
						<div class="flex flex-row gap-2">
							<div class="flex justify-between items-center w-[50%]">
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
							<div class="flex justify-between items-center w-[50%]">
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
							<div class="flex justify-between items-center w-[50%]">
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
							<div class="flex justify-between items-center w-[50%]">
								<label>{{
									taskSheetDetail?.PlantsheetTaskConjunction
										?.description
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
							<div class="flex justify-between items-center w-[50%]">
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
							<div class="flex justify-between items-center w-[50%]">
								<label>Duration</label>
								<label>:</label>
							</div>
							<div>
								<p>{{ taskSheetDetail?.duration }} minutes</p>
							</div>
						</div>
						<div class="flex flex-row gap-2">
							<div class="flex justify-between items-center w-[50%]">
								<label>Fixed Duration</label>
								<label>:</label>
							</div>
							<div v-if="taskSheetDetail.fixedDuration">
								{{ taskSheetDetail.fixedDuration }} minutes
							</div>
							<div v-if="!taskSheetDetail.fixedDuration">
								<!-- <p v-if="taskSheetDetail.fixedDuration">
									{{ taskSheetDetail?.duration }}
								</p>
								<p v-else>Duration not fixed yet</p> -->
								{{ computedFixedDuration }} minutes
							</div>
						</div>
					</section>
					<section
						id="second-box "
						class="border-2 border-black rounded-md bg-slate-200 w-[400px] px-4 py-2"
					>
						<div
							v-if="
								!taskSheetDetail
									.EmployeeTaskPlantsheettaskScheduleConjunctions
									.length
							"
							class="flex flex-row gap-2"
						>
							<div class="flex justify-between items-center w-[55%]">
								<label>Total Employee Available</label>
								<label>:</label>
							</div>
							<div>
								<p>{{ employeesLocal?.length }} People</p>
							</div>
						</div>
						<div class="flex flex-col">
							<div
								class="flex justify-between items-center w-[55%] font-semibold"
							>
								<label>List of Employee</label>
							</div>
							<div
								v-if="
									!taskSheetDetail
										.EmployeeTaskPlantsheettaskScheduleConjunctions
										.length
								"
							>
								<ul class="pl-2">
									<li v-for="employee in employeesLocal" :key="employee.id">
										• {{ employee.employee.name }} -
										{{ employee.workMinuteQuota }} minutes left -
										{{ employee.workingTimeLog }}
									</li>
								</ul>
							</div>
							<div>
								<ul class="pl-2">
									<li
										v-for="employee in taskSheetDetail.EmployeeTaskPlantsheettaskScheduleConjunctions"
										:key="employee.id"
									>
										• {{ employee.employeecon.empl }}
									</li>
								</ul>
							</div>
						</div>
					</section>
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
									<p v-if="taskSheetDetail.startTaskTime">
										{{ formatTime(taskSheetDetail.startTaskTime) }}
									</p>
									<input
										v-else-if="!taskSheetDetail.startTaskTime"
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
									<p v-if="taskSheetDetail.finishTaskTime">
										{{ formatTime(taskSheetDetail.finishTaskTime) }}
									</p>
									<input
										v-if="!taskSheetDetail.startTaskTime"
										:disabled="!employeeFetchingData.startWorkHour"
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
								<div
									class="flex flex-row gap-2"
									v-if="employeeFetchingData.finishWorkHour"
								>
									<div
										class="flex justify-between items-center w-[13%]"
									>
										<label>Total Employee</label>
										<label>:</label>
									</div>
									<input
										@blur="disableInput"
										:disabled="inputDisabled"
										v-model="totalEmployee"
										min="0"
										:max="maxEmployeeCount"
										class="border-2 border-black rounded-md text-center w-[50px]"
										type="number"
									/>
								</div>
								<div
									v-if="
										taskSheetDetail
											.EmployeeTaskPlantsheettaskScheduleConjunctions
											.length
									"
								>
									<div>
										<div class="flex flex-row w-full">
											<div
												class="w-[3%] text-center border-black border rounded-tl-md"
											>
												no
											</div>
											<div
												class="w-[10%] text-center border-black border"
											>
												name
											</div>
											<div
												class="w-[7%] border border-black text-center rounded-tr-md"
											>
												status
											</div>
										</div>
									</div>
									<div
										v-for="(
											el, index
										) in taskSheetDetail.EmployeeTaskPlantsheettaskScheduleConjunctions"
										class="w-full flex flex-row text-center"
									>
										<div
											:class="[
												'w-[3%] border border-black ',
												index ===
												taskSheetDetail
													.EmployeeTaskPlantsheettaskScheduleConjunctions
													.length -
													1
													? 'rounded-bl-md '
													: '',
											]"
										>
											{{ index + 1 }}
										</div>
										<div class="w-[10%] border border-black">
											{{ el.employeecon.empl }}
										</div>
										<div
											:class="[
												'w-[7%] h-[35px] border border-black flex flex-row justify-around items-center bg-yellow-200',
												index ===
												taskSheetDetail
													.EmployeeTaskPlantsheettaskScheduleConjunctions
													.length -
													1
													? 'rounded-br-md '
													: '',
											]"
										>
											<div
												class="bg-green-400 w-[70px] rounded h-[25px] text-slate-200 tracking-wide font-semibold text-center text-sm"
											>
												selected
											</div>
										</div>
									</div>
								</div>
								<div v-if="totalEmployee">
									<div>
										<div class="flex flex-row w-full">
											<div
												class="w-[10%] text-center border-black border rounded-tl-md"
											>
												name
											</div>
											<div
												class="w-[7%] border border-black text-center"
											>
												action
											</div>
											<div
												class="w-[7%] border border-black text-center rounded-tr-md"
											>
												status
											</div>
										</div>
									</div>
									<div
										v-for="(el, index) in employeeArray"
										class="w-full flex flex-row"
									>
										<div
											class="w-[10%] border border-black rounded-bl-md"
										>
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
													v-for="employee in employeesLocal"
													:key="employee.id"
													:value="employee.id"
												>
													{{ employee.employee.name }}
												</option>
											</select>
										</div>
										<div
											class="w-[7%] h-[35px] border border-black flex flex-row justify-around items-center bg-yellow-200"
										>
											<button
												v-if="!employeeArray[index].status"
												class="bg-blue-600 w-[60px] rounded h-[25px] text-slate-200 tracking-wide font-semibold text-center text-sm hover:bg-blue-800"
												@click.prevent="
													employeeArray[index].status = true
												"
											>
												accept
											</button>
											<img
												v-if="employeeArray[index].status"
												src="../assets/icons8-double-tick-48.png"
												alt="checked"
												class="w-[25px]"
											/>
										</div>
										<div
											class="w-[7%] h-[35px] border border-black rounded-br-md flex flex-row justify-around items-center bg-yellow-200"
										>
											<div
												v-if="!employeeArray[index].status"
												class="bg-blue-600 w-[70px] rounded h-[25px] text-slate-200 tracking-wide font-semibold text-center text-sm"
											>
												available
											</div>
											<div
												v-if="employeeArray[index].status"
												class="bg-green-400 w-[70px] rounded h-[25px] text-slate-200 tracking-wide font-semibold text-center text-sm"
											>
												selected
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
				<div id="button-processing-status">
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
								v-if="
									(role === 'super' || editFlag === false) &&
									!taskSheetDetail.fixedDuration
								"
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
									v-if="
										editFlag === false &&
										!taskSheetDetail.fixedDuration
									"
									class="bg-[#c52b2b] rounded flex hover:bg-red-900 justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px]"
								>
									Cancel
								</button>
							</RouterLink>
							<RouterLink
								to="/tasksheet"
								v-if="
									editFlag === false && taskSheetDetail.fixedDuration
								"
							>
								<BackButton />
							</RouterLink>
						</div>
					</div>
				</div>
			</form>
		</div>
	</section>
	<!-- <pre>total employee: {{ totalEmployee }}</pre> -->
	<!-- <pre>ini employeeArray {{ employeeArray }}</pre> -->
	<div class="flex flex-row">
		<pre>ini employee local {{ employeesLocal }}</pre>
		<pre>ini employee {{ employees }}</pre>
	</div>
	<!-- <pre>{{ employeeFetchingData }}</pre> -->
	<pre>{{ taskSheetDetail }}</pre>
</template>

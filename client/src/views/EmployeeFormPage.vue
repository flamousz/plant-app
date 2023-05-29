<script>
import { mapActions, mapState } from "pinia";
import { useEmployeeStore } from "../stores/employee";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";
import GreenButton from "../components/Buttons/GreenButton.vue";
import { useTaskStore } from "../stores/task";

export default {
	name: "EmployeeFormPage",
	data() {
		return {
			role: localStorage.getItem("role"),
			cropData: {
				id: 0,
				nik: null,
				gender: "",
				status: "",
				name: "",
				TaskConjunctions: [
					{
						TaskId: 0,
					},
				],
			},
		};
	},
	methods: {
		...mapActions(useEmployeeStore, ["postEmployee", "putEmployee"]),
		...mapActions(useTaskStore, ["fetchBasicTasks"]),
		handlePutorPost() {
			if (this.editFlag === true) {
				this.putEmployee(this.cropData);
			} else if (this.editFlag === false) {
				this.postEmployee(this.cropData);
			}
		},
		handleStatus(value) {
			this.cropData.status = value;
		},
		handleDeletedConjunctions(key, index) {
			console.log(index, "<< index from handleDeletedConjunctions");
			this.cropData[`${key}Conjunctions`].splice(index, 1);
		},
		addColumn(array) {
			array.push({});
		},
	},
	computed: {
		...mapState(useEmployeeStore, ["employeeDetail", "editFlag"]),
		...mapState(useTaskStore, ["tasks"]),
		heading() {
			if (this.editFlag === true) {
				return "Edit";
			} else if (this.editFlag === false) {
				return "New";
			}
		},
	},
	created() {
		this.fetchBasicTasks()
		if (this.editFlag === true) {
			this.cropData.id = this.employeeDetail.id;
			this.cropData.name = this.employeeDetail.name;
			this.cropData.nik = this.employeeDetail.nik;
			this.cropData.gender = this.employeeDetail.gender;
			this.cropData.TaskConjunctions = this.employeeDetail.TaskConjunctions;
			this.cropData.status = this.employeeDetail.status;
		}
	},
	components: { RedButton, BlueButton, GreenButton },
};
</script>

<template>
	<!-- <pre>{{ editFlag }}</pre> -->
	<section class="w-full">
		<form @submit.prevent="handlePutorPost">
			<div class="flex flex-col px-10">
				<div class="flex flex-row h-[50px] mb-3">
					<div
						class="w-[40%] flex justify-start items-end text-5xl font-bold"
					>
						{{ heading }} Employee Form
					</div>
					<div class="w-[60%] flex flex-row justify-end items-end gap-3">
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
								this.$router.push(
									`/employee/detail/${employeeDetail.id}`
								)
							"
							v-if="editFlag === true"
						>
							Cancel
						</button>
						<RouterLink to="/employee">
							<button
								class="bg-[#c52b2b] rounded flex hover:bg-red-900 justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px]"
								v-if="editFlag === false"
							>
								Cancel
							</button>
						</RouterLink>
					</div>
				</div>
				<section
					id="form-section"
					class="flex flex-col p-4 bg-slate-100 mt-5 h-full border-2 border-black rounded tracking-wide gap-4"
				>
					<div class="flex flex-row gap-2">
						<div class="flex justify-start items-center w-[8%]">
							Name
						</div>
						<div class=" flex flex-row gap-2">
							<p>
								:
							</p>
							<input
								id="name"
								class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
								placeholder="Name ...."
								name="name"
								type="text"
								v-model="cropData.name"
							/>
						</div>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-start items-center w-[8%]">
							NIK
						</div>
						<div class="flex flex-row gap-2">
							<p>:</p>
							<input
								id="nik"
								class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
								placeholder="NIK ...."
								name="nik"
								type="number"
								v-model="cropData.nik"
							/>
						</div>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-start items-center w-[8%]">
							Gender
						</div>
						<div class="flex flex-row gap-2">
							<p>:</p>
							<select
								v-model="cropData.gender"
								class="h-auto w-auto bg-green-100 rounded-md"
							>
								<option value="" disabled>Enter Gender here</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
						</div>
					</div>
				</section>
				<section
					id="task-table"
					class="flex flex-col p-4 bg-slate-100 mt-5 h-[200px] border-2 border-black rounded tracking-wide gap-1 overflow-auto"
				>
					<section id="breadcrumb">
						<div
							class="border bg-red-500 text-red-100 border-black p-1 w-[5%] text-center rounded-md"
						>
							ability
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
									v-for="(el, index) in cropData.TaskConjunctions"
									class="w-full flex flex-row"
								>
									<div class="w-[10%] border border-black">
										<select
											v-model="el.TaskId"
											class="bg-yellow-200 hover:bg-yellow-300 rounded-md h-full flex flex-col w-full"
										>
											<option value="" disabled>
												select here ..
											</option>
											<option
												class="text-center"
												v-for="item in tasks"
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
												handleDeletedConjunctions('Task', index)
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
									addColumn(this.cropData.TaskConjunctions)
								"
							>
								<span class="text-2xl font-extrabold">+</span>
								Tool
							</button>
						</div>
					</section>
				</section>
			</div>
		</form>
	</section>
	<!-- <pre>{{ cropData }}</pre> -->
</template>

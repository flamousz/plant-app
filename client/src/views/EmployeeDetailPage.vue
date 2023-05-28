<script>
import { mapActions, mapState } from "pinia";
import { useEmployeeStore } from "../stores/employee";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";
import TableRow4Colum from "../components/TableRow/TableRow4Colum.vue";

export default {
	name: "EmployeeDetailPage",
	data() {
		return {
			role: localStorage.getItem("role"),
			cropData: {
				id: 0,
				arcStatus: "",
			},
		};
	},
	methods: {
		...mapActions(useEmployeeStore, [
			"getEmployeeById",
			"getEmployeeByIdForEdit",
			"patchEmployee",
			"deleteEmployee",
		]),
		patchLocal() {
			this.cropData.id = this.employeeDetail.id;
			if (this.employeeDetail.arcStatus === "archived") {
				this.cropData.arcStatus = "avail";
			} else {
				this.cropData.arcStatus = "archived";
			}
			console.log(this.cropData, "<<< ini cropData");
			this.patchEmployee(this.cropData);
		},
	},
	computed: {
		...mapState(useEmployeeStore, ["employeeDetail"]),
		archive() {
			if (this.employeeDetail.arcStatus === "archived") {
				return "avail";
			} else {
				return "archived";
			}
		},
	},
	created() {
		this.getEmployeeById(this.$route.params.id);
	},
	components: { RedButton, BlueButton, TableRow4Colum },
};
</script>

<template>
	<section class="w-full">
		<div class="flex flex-col px-10">
			<div>
				<div class="w-full flex justify-end items-end pt-4">
					<div class="text-2xl font-bold w-[8%]">STATUS:</div>
					<div
						class="w-[13%] border-[3px] rounded-md border-slate-800 bg-yellow-300 font-semibold text-center tracking-wide"
					>
						{{ employeeDetail.status }} -
						{{ employeeDetail.arcStatus }}
					</div>
				</div>
				<div class="flex flex-row h-[50px] mb-3">
					<div
						class="w-[40%] flex justify-start items-end text-5xl font-bold"
					>
						Employee Detail
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
							@click="deleteEmployee(employeeDetail.id)"
							v-if="role === 'super'"
						>
							<RedButton :type="'button'" :text="'DELETE'" />
						</div>
						<div
							@click="getEmployeeByIdForEdit(employeeDetail.id)"
							v-if="
								role === 'super' || employeeDetail.status === 'draft'
							"
						>
							<BlueButton :type="'button'" :text="'EDIT'" />
						</div>
					</div>
				</div>
			</div>
			<section
				id="upper-box"
				class="flex flex-col p-4 bg-slate-100 mt-5 h-[110px] border-2 border-black rounded tracking-wide"
			>
				<div class="flex flex-row justify-between gap-2 w-[25%]">
					<div class="w-[39%]">Name</div>
					<div class="flex flex-row gap-2 w-[70%]">
						<p>:</p>
						<div>
							{{ employeeDetail?.name }}
						</div>
					</div>
				</div>
				<div class="j flex flex-row gap-2 w-[18%] justify-between">
					<div class="w-[50%]">NIK</div>
					<div class="flex w-[50%] flex-row gap-2">
						<p>:</p>
						<div>
							{{ employeeDetail?.nik }}
						</div>
					</div>
				</div>
				<div class="flex flex-row gap-2 w-[18%] justify-between">
					<div class="w-[50%]">Gender</div>
					<div class="flex w-[50%] flex-row gap-2">
						<p>:</p>
						<div>
							{{ employeeDetail?.gender }}
						</div>
					</div>
				</div>
			</section>
			<section
				v-if="employeeDetail.taskConjunction[0]"
				id="tool-table"
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
					<div class="w-[90%] flex flex-col">
						<thead>
							<tr class="flex flex-row w-[80%] bg-slate-400">
								<th class="w-[4.5%] border-black border">No</th>
								<th class="w-[18.5%] border-black border-r-2 border">
									Name
								</th>
								<th class="w-[13%] border-y border-black border-r">
									Task Per Minute
								</th>
								<th class="w-[55%] border border-black">Description</th>
								<th class="w-[10%] border border-black">Status</th>
							</tr>
						</thead>
						<tbody>
							<TableRow4Colum
								v-for="(tasks, index) in employeeDetail.taskConjunction"
								:key="tasks.id"
								:tasks="tasks"
								:index="index"
							/>
						</tbody>
					</div>
				</section>
			</section>
		</div>
	</section>
</template>

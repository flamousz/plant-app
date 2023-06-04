<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useApprovalStore } from "../stores/approval";
import CloseButton from "./Buttons/CloseButton.vue";
import BlueButton from "./Buttons/BlueButton.vue";
import GreenButton from "./Buttons/GreenButton.vue";
import RedButton from "./Buttons/RedButton.vue";
import ChecklistButton from "./Buttons/ChecklistButton.vue";
import { usePlantScheduleStore } from "../stores/plantschedule";
import { useUserStore } from "../stores/user";

export default {
	name: "SideBar",
	data() {
		return {
			approvalLocal: [],
			isOpened: false,
			showMasterData: false,
			showResources: false,
			showTransaction: false,
			isApprovalSection: false,
			isMasterApprovalSection: false,
			approvalMaster: [],
			accountValidation: "",
		};
	},
	watch: {
		approvalMaster: {
			handler(newApprovalMaster) {
				const userIds = newApprovalMaster.map(
					(approval) => approval.UserId
				);
				const duplicateUserIds = userIds.filter(
					(userId, index) => userIds.indexOf(userId) !== index
				);

				newApprovalMaster.forEach((approval) => {
					if (duplicateUserIds.includes(approval.UserId)) {
						approval.userValidation = "User ID has taken";
					} else {
						delete approval.userValidation;
					}
				});
			},
			deep: true,
		},
		approval: {
			immidiate: true,
			handler(newApproval) {
				this.approvalLocal = [];
				newApproval.forEach((el) => {
					el.approvalStatusLocal = false;
					this.approvalLocal.push(el);
				});
			},
		},
	},
	methods: {
		...mapActions(usePlantScheduleStore, [
			"patchStatusPlantSchedules",
			"fetchPlantSchedulesById",
		]),
		...mapActions(useUserStore, ["patchNotification", "fetchUsers"]),
		...mapActions(useApprovalStore, [
			"fetchRejectedApprovals",
			"fetchMasterApprovals",
			"editFlagHandler",
			"putMasterApprovals",
			"editFlagHandlerFalse",
		]),
		addColumn(array, prop1, prop2, prop3) {
			const valueProp1 = this.approvalMaster.length + 1;
			array.push({
				[prop1]: valueProp1,
				[prop2]: null,
				[prop3]: null,
			});
		},
		handleDeleteMasterApprovalColumn(index) {
			this.approvalMaster.splice(index, 1);
			this.approvalMaster.forEach((el, index) => {
				el.sequenceLevel = index + 1;
			});
		},
		fetchPlantSchedulesByIdLocal(id) {
			this.isApprovalSectionChanger();
			this.$router.push(`/plantschedule/${id}`);
		},
		isMasterApprovalSectionChanger() {
			this.approvalMaster = [];
			this.editFlagHandlerFalse();
			this.isMasterApprovalSection = !this.isMasterApprovalSection;
		},
		submitPutMasterApproval() {
			console.log(" <<<< masuk submitPutMasterApproval di komponen");

			// Check for userValidation property in any object
			const hasUserValidation = this.approvalMaster.some((approval) =>
				approval.hasOwnProperty("userValidation")
			);
			if (hasUserValidation) {
				Toastify({
					text: `Account must be different in each sequence`,
					style: {
						background: "linear-gradient(to right, #611302, #a62103)",
					},

					duration: 2000,
				}).showToast();
			} else {
				this.putMasterApprovals(this.approvalMaster);
				this.fetchMasterApprovals();
				this.approvalMaster = [];
				this.editFlagHandlerFalse();
			}
		},
		cancelButtonHandler() {
			this.approvalMaster = [];
			this.editFlagHandlerFalse();
		},
		editButtonHander() {
			this.editFlagHandler();
			this.fetchUsers();
			if (this.editFlag) {
				this.approvalMaster = this.masterApproval;
			}
		},
		fetchMasterApprovalsLocal() {
			this.fetchMasterApprovals();
			this.isMasterApprovalSectionChanger();
		},
		isApprovalSectionChanger() {
			this.fetchRejectedApprovals();
			this.isApprovalSection = !this.isApprovalSection;
		},
		patchStatusPlantSchedulesLocal(
			val,
			indexNotificationStatus,
			notifId,
			statusPlantSchedule
		) {
			console.log("masuk ke patchStatusPlantSchedulesLocal component");
			const data = {
				id: val,
				statusFromClient: statusPlantSchedule,
			};
			console.log(
				data,
				"<< data from patchStatusPlantSchedulesLocal function"
			);
			const notifData = {
				id: notifId,
				isRead: false,
			};

			console.log(
				this.approvalLocal[indexNotificationStatus].Notification.isRead,
				"<<< this.approvalLocal[indexNotificationStatus].Notification.isRead sebelum"
			);
			this.approvalLocal[
				indexNotificationStatus
			].Notification.approvalStatusLocal = true;
			console.log(
				this.approvalLocal[indexNotificationStatus].Notification.isRead,
				"<<< this.approvalLocal[indexNotificationStatus].Notification.isRead sesudah"
			);

			this.patchStatusPlantSchedules(data);
			this.patchNotification(notifData);
		},
	},
	computed: {
		...mapState(useApprovalStore, ["approval", "masterApproval"]),
		...mapWritableState(useApprovalStore, ["editFlag"]),
		...mapState(useUserStore, ["users"]),
	},
	components: {
		CloseButton,
		BlueButton,
		GreenButton,
		RedButton,
		ChecklistButton,
	},
};
</script>
<template>
	<!-- <pre>accountValidation {{ accountValidation }}</pre> -->
	<!-- <pre>editflag = {{ editFlag }}</pre> -->
	<!-- <pre>users = {{ users }}</pre> -->
	<!-- <pre>approvalMaster =  {{ approvalMaster }}</pre> -->
	<section id="master-approval-section" v-if="isMasterApprovalSection">
		<div
			@click.prevent="isMasterApprovalSectionChanger"
			class="bg-slate-500 h-full w-screen z-10 absolute opacity-90"
		></div>
		<div
			id="master-approval-table"
			class="p-1 bg-slate-100 rounded w-[650px] flex flex-col h-[300px] absolute z-40 top-[10%] left-1/2 transform -translate-x-1/2"
		>
			<div
				class="flex justify-end"
				@click.prevent="isMasterApprovalSectionChanger"
			>
				<CloseButton />
			</div>
			<section id="body-master-approval" class="p-3 flex flex-col gap-1">
				<div
					class="text-2xl font-semibold flex flex-row justify-between items-center"
				>
					<h3>Sequence Approval</h3>
					<div class="flex flex-row gap-2">
						<BlueButton
							v-if="editFlag"
							:type="'button'"
							:text="'submit'"
							@click.prevent="submitPutMasterApproval"
						/>
						<RedButton
							@click.prevent="cancelButtonHandler"
							:type="'button'"
							:text="'cancel'"
							v-if="editFlag"
						/>
						<BlueButton
							v-if="!editFlag"
							@click.prevent="editButtonHander"
							:type="'button'"
							:text="'change'"
						/>
					</div>
				</div>
				<div v-if="editFlag" class="w-[550px] flex flex-col gap-2 ">
					<section id="table-edit-approval-master">
						<div class="flex flex-row w-[100%]">
							<div class="w-[10%] text-center border-black border">
								Level
							</div>
							<div class="w-[20%] border border-black text-center">
								Status
							</div>
							<div class="w-[35%] border border-black text-center">
								User
							</div>
							<div class="w-[15%] border border-black text-center">
								Action
							</div>
							<div class="w-[20%]"></div>
						</div>
						<div class="flex flex-col w-full  h-[105px] overflow-auto ">
							<div
							v-for="(el, index) in approvalMaster"
							:key="el.id"
							class="flex flex-row w-full "
						>
							<div class="w-[10%] border border-black">
								<input
									class="w-full text-center"
									v-model="el.sequenceLevel"
									disabled
									type="number"
									max="15"
								/>
							</div>
							<div class="w-[20%] border border-black">
								<input
									class="w-full text-center"
									v-model="el.pronoun"
									type="text"
								/>
							</div>
							<div class="w-[35%] border border-black text-center">
								<select v-model="el.UserId" class="w-full text-center">
									<option value="" disabled selected>
										--select account--
									</option>
									<option
										v-for="item in users"
										:key="item.id"
										:value="item.id"
									>
										{{ item.name }}
									</option>
								</select>
							</div>
							<div class="w-[15%] border border-black text-center">
								<button
									class="bg-red-500 w-[65%] rounded text-slate-200 tracking-wide font-semibold text-center text-xs hover:bg-red-800"
									@click.prevent="
										handleDeleteMasterApprovalColumn(index)
									"
								>
									DELETE
								</button>
							</div>
							<div
								id="account-validation"
								class="w-[20%] text-xs text-red-600"
							>
								<span v-if="el.userValidation">* </span
								>{{ el.userValidation }}
							</div>
						</div>
						</div>
						
						<GreenButton
							class="mt-2"
							:type="'button'"
							:text="'add'"
							@click.prevent="
								addColumn(
									this.approvalMaster,
									'sequenceLevel',
									'pronoun',
									'UserId'
								)
							"
						/>
					</section>
					<section id="button-edit-section"></section>
				</div>
				<div>
					<table v-if="!editFlag" class="w-full border-2 border-black">
						<thead class="border-2 border-black">
							<tr>
								<th class="border-2 border-black">Level</th>
								<th class="border-2 border-black">Status</th>
								<th class="border-2 border-black">User</th>
							</tr>
						</thead>
						<tbody
							class="h-[10px]"
							v-for="item in masterApproval"
							:key="item.id"
						>
							<tr class="text-center text-sm h-[5px]">
								<td class="cursor-default border-x-2 border-black">
									{{ item.sequenceLevel }}
								</td>
								<td>
									{{ item.pronoun }}
								</td>
								<td class="border-x-2 border-black">
									{{ item.User.email }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>
		</div>
	</section>
	<section id="approval-section" v-if="isApprovalSection">
		<div
			@click.prevent="isApprovalSection = !isApprovalSection"
			class="bg-slate-500 h-full w-screen z-10 absolute opacity-60"
		></div>
		<div
			id="approval-table"
			class="p-1 bg-slate-100 rounded w-[600px] flex flex-col h-[400px] absolute z-40 top-[10%] left-1/2 transform -translate-x-1/2"
		>
			<div
				class="flex justify-end"
				@click.prevent="isApprovalSection = !isApprovalSection"
			>
				<CloseButton />
			</div>
			<section id="body-approval" class="p-3 flex flex-col gap-1">
				<div class="text-2xl font-semibold"><h3>Rejected</h3></div>
				<div>
					<table class="w-full border-2 border-black">
						<thead class="border-2 border-black">
							<tr>
								<th class="border-2 border-black">No</th>
								<th class="border-2 border-black">Name</th>
								<th class="border-2 border-black">Code</th>
								<th class="border-2 border-black">Status</th>
								<th class="border-2 border-black">Action</th>
							</tr>
						</thead>
						<tbody
							class="h-[10px]"
							v-for="(item, index) in approval"
							:key="item.id"
						>
							<tr class="text-center text-sm h-[5px]">
								<td>
									{{ index + 1 }}
								</td>
								<td class="cursor-default border-x-2 border-black">
									{{
										item.Notification.PlantSchedule.PlantSheet.plant
											.name
									}}
								</td>
								<td>
									<button
										class="hover:text-blue-600"
										@click.prevent="
											fetchPlantSchedulesByIdLocal(
												item.Notification.PlantSchedule.id
											)
										"
									>
										{{ item.Notification.PlantSchedule.code }}
									</button>
								</td>
								<td class="border-x-2 border-black">
									<div class="flex justify-center">
										<p
											v-if="
												!approvalLocal[index].Notification
													.approvalStatusLocal
											"
										>
											{{
												item.Notification.PlantSchedule
													.statusPlantSchedule
											}}
										</p>
										<BlueButton
											class="cursor-default"
											v-else
											:nohover="true"
											:type="'button'"
											:text="'Updated'"
										/>
									</div>
								</td>
								<td>
									<div
										v-if="
											!approvalLocal[index].Notification
												.approvalStatusLocal
										"
										class="flex flex-row gap-1 justify-center"
									>
										<GreenButton
											@click.prevent="
												patchStatusPlantSchedulesLocal(
													item.id,
													index,
													item.NotificationId,
													'draft'
												)
											"
											:type="'button'"
											:text="'Reset'"
										/>
									</div>
									<div v-else class="flex items-center justify-center">
										<ChecklistButton />
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>
		</div>
	</section>
	<div
		@mouseenter="isOpened = true"
		class="fixed top-[80px] left-1 opacity-50"
	>
		<img
			src="../assets/icons-sidebar-64.png"
			alt="sidebar icon"
			class="w-8"
		/>
	</div>
	<!-- <button @mouseenter="isOpened = true">Open Sidebar</button> -->
	<VueSidePanel v-model="isOpened" lock-scroll side="left" width="300px">
		<div
			class="flex flex-col h-screen bg-blue-100 pt-[100px] pl-[20px]"
			@mouseleave="isOpened = false"
		>
			<div id="transaction-data-group">
				<button
					@click="showTransaction = !showTransaction"
					:class="{ 'text-red-400': showTransaction }"
					class="text-4xl font-semibold"
				>
					Transaction
				</button>
				<ul
					class="text-2xl transition-all duration-500 pl-4 transform translate-x-0 flex flex-col"
					:class="{ 'translate-x-[-100%]  ': !showTransaction }"
				>
					<RouterLink
						to="/plantschedule"
						class="hover:text-blue-400"
						:class="{
							'text-blue-700': this.$route.name === 'plantschedule',
						}"
						>Plant Schedule</RouterLink
					>
					<RouterLink
						class="hover:text-blue-400"
						:class="{ 'text-blue-700': this.$route.name === 'mapbasic' }"
						to="/mapbasic"
						>Plantation Map</RouterLink
					>
					<RouterLink
						class="hover:text-blue-400"
						:class="{
							'text-blue-700': this.$route.name === 'Task Sheet',
						}"
						to="/tasksheet"
						>Task Sheet</RouterLink
					>
					<RouterLink
						class="hover:text-blue-400"
						:class="{
							'text-blue-700': this.$route.name === 'seednursery',
						}"
						to="/seednursery"
						>Nursery</RouterLink
					>
					<li>
						<button
							@click.prevent="isApprovalSectionChanger"
							class="hover:text-blue-400"
						>
							Rejected Schedule
						</button>
					</li>
					<li>
						<button
							@click.prevent="fetchMasterApprovalsLocal"
							class="hover:text-blue-400"
						>
							Sequence Approval
						</button>
					</li>
				</ul>
			</div>
			<div
				id="master-data-group"
				:style="{
					position: 'absolute',
					top: '445px',
					transition: 'top 400ms',
				}"
			>
				<button
					@click="showMasterData = !showMasterData"
					:class="{ 'text-red-400': showMasterData }"
					class="text-4xl font-semibold"
				>
					Master Data
				</button>
				<ul
					class="text-2xl transition-all duration-500 pl-4 transform translate-x-0 flex flex-col"
					:class="{ 'translate-x-[-100%]  ': !showMasterData }"
				>
					<RouterLink
						class="hover:text-blue-400"
						:class="{ 'text-blue-700': this.$route.name === 'crop' }"
						to="/crop"
						>Plant Sheet</RouterLink
					>
					<RouterLink
						to="/item"
						class="hover:text-blue-400"
						:class="{ 'text-blue-700': this.$route.name === 'item' }"
						>Item</RouterLink
					>
					<RouterLink
						class="hover:text-blue-400"
						:class="{ 'text-blue-700': this.$route.name === 'category' }"
						to="/category"
						>Category</RouterLink
					>
					<RouterLink
						class="hover:text-blue-400"
						:class="{ 'text-blue-700': this.$route.name === 'uom' }"
						to="/uom"
						>Uom</RouterLink
					>
					<RouterLink
						class="hover:text-blue-400"
						:class="{
							'text-blue-700': this.$route.name === 'Task Master',
						}"
						to="/taskmaster"
						>Task Master</RouterLink
					>
				</ul>
			</div>
			<div
				id="resources-group"
				:style="{
					position: 'absolute',
					top: showTransaction ? '340px' : '150px',
					transition: 'top 400ms',
				}"
			>
				<button
					@click="showResources = !showResources"
					:class="{ 'text-red-400': showResources }"
					class="text-4xl font-semibold"
				>
					Resources
				</button>
				<ul
					class="text-2xl transition-all duration-500 pl-4 transform translate-x-0 flex flex-col"
					:class="{ 'translate-x-[-120%]  ': !showResources }"
				>
					<RouterLink
						to="/croparea"
						class="hover:text-blue-400"
						:class="{ 'text-blue-700': this.$route.name === 'croparea' }"
						>Plantation Area</RouterLink
					>

					<RouterLink
						class="hover:text-blue-400"
						:class="{ 'text-blue-700': this.$route.name === 'employee' }"
						to="/employee"
						>Employee</RouterLink
					>
				</ul>
			</div>
		</div>
	</VueSidePanel>
</template>

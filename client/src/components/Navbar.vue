<script>
import { RouterLink, useRouter } from "vue-router";
import SideBar from "./SideBar.vue";
import { mapActions, mapState } from "pinia";
import { useUomStore } from "../stores/uom";
import { useUserStore } from "../stores/user";
import { useApprovalStore } from "../stores/approval";
import CloseButton from "./Buttons/CloseButton.vue";
import BlueButton from "./Buttons/BlueButton.vue";
import GreenButton from "./Buttons/GreenButton.vue";
import RedButton from "./Buttons/RedButton.vue";
import { usePlantScheduleStore } from "../stores/plantschedule";
import ChecklistButton from "./Buttons/ChecklistButton.vue";

export default {
	name: "Navbar",
	components: {
		SideBar,
		RouterLink,
		CloseButton,
		GreenButton,
		RedButton,
		BlueButton,
		ChecklistButton,
	},
	data() {
		return {
			approvalLocal: [],
			isApprovalSection: false,
			isMobileMenuOpen: false,
			isPatchHasBeenClicked: false,
			email: localStorage.getItem("email"),
			role: localStorage.getItem("role"),
			isApproveNotif: false,
			isNotif: false,
			buttonNotif: false,
			navbarData: {
				approvalSequence: localStorage.getItem("approvalSequence") - 1,
			},
		};
	},
	watch: {
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
		...mapActions(useUomStore, ["handleSidebarFlag"]),
		...mapActions(useApprovalStore, ["fetchApprovals"]),
		...mapActions(useUserStore, [
			"handleLogout",
			"fetchNotification",
			"patchNotification",
		]),
		fetchPlantSchedulesByIdLocal(id) {
			console.log("masuk ke fetchPlantSchedulesByIdLocal");
			this.isApprovalSectionChanger();
			this.$router.push(`/plantschedule/${id}`);
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
			// this.fetchApprovals(this.navbarData)
		},
		subString(val) {
			const startIndex = 0; // Start index of the desired substring
			const endIndex = 15; // End index of the desired substring

			return val.map((str) => str.substring(startIndex, endIndex));
		},
		/*

		buat halaman khusus untuk approval yg terdiri dari list notifikasi plantshedule yg harus di approvve
		ketika user klik button approve maka akan mengupdate approvalSequence from Approvals dan statusPlantSchedule di PlantSchedules
		input:
			- findAll from Approvals where approvalSequence === User.approvalLevel 
		ouput:
			- id dari selected approval
		
		approval table: 
			- nama plant
			- code plant schedule
			- status plant schedule
			- action

		*/
		isApproveNotifChanger() {
			this.isApproveNotif = !this.isApproveNotif;
			this.isNotifChanger();
			this.fetchApprovals(this.navbarData);
		},
		isNotifChanger() {
			this.isNotif = !this.isNotif;
		},
		isApprovalSectionChanger() {
			this.isApprovalSection = !this.isApprovalSection;
		},
		routerLocal(id) {
			this.$router.push(`/plantschedule/${id}`);
		},
		isReadNOTIFinApproval(notifId) {
			console.log("masuk ke isReadNotifinApproval di method");
			this.isApprovalSectionChanger();
			this.isNotifChanger();
			const notifData = {
				id: notifId,
				isRead: true,
			};
			this.patchNotification(notifData);
			this.fetchApprovals(this.navbarData);
		},
	},
	computed: {
		...mapState(useApprovalStore, ["approval"]),
		...mapState(useUserStore, ["notification"]),
		notificationIsNotRead() {
			// Check if any notification has isRead set to false
			if (
				this.approval.some(
					(notification) => !notification.Notification.isRead
				)
			) {
				this.isApproveNotif = true;
			} else {
				this.isApproveNotif = false;
			}
		},
		notificationContent() {
			const content = this.approval.map((el) => {
				return [
					el.Notification.description,
					el.Notification.PlantSchedule.id,
					el.NotificationId,
					el.Notification.isRead,
					false,
				];
			});

			return content;
		},
	},
	created() {
		this.fetchNotification();
		this.fetchApprovals(this.navbarData);
		// if (localStorage.getItem('approvalSequence')) {
		// }
		// console.log(this.notificationContent);
		// approvalChangerLocal(){
		// 	this.approval.forEach(el => {
		// 			this.approvalLocal.push(el)
		// 		})
		// }
	},
	setup() {
		const router = useRouter();
		return { router };
	},
};
</script>

<template>
	<!-- <pre>this isApprovalSection{{ isApprovalSection }}</pre>
	<pre>notificationContent[index][4]{{ notificationContent }}</pre> -->
	<!-- <pre>ini isApproveNotif {{ isApproveNotif }}</pre> -->
	<!-- <pre>ini notification {{ notification }}</pre> -->
	<!-- <div class="flex flex-row">
		<pre>approvalLocal {{ approvalLocal }}</pre>
		<pre>ini approval {{ approval }}</pre>
		<pre>INI notificationContent{{ notificationContent }}</pre>
	</div> -->
	<!-- <pre>ini isNotif is {{ isNotif }}</pre> -->
	<!-- <pre>ini notificationIsNotRead is {{ notificationIsNotRead }}</pre> -->
	<SideBar />
	<nav class="bg-blue-200">
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
					<div class="text-2xl font-semibold"><h3>Approval</h3></div>
					<div class=" ">
						<table class=" w-full  border-2 border-black ">
							<thead class=" border-2 border-black ">
								<tr >
									<th class=" border-2 border-black ">No</th>
									<th class=" border-2 border-black ">Name</th>
									<th class=" border-2 border-black "> Code</th>
									<th class=" border-2 border-black ">Status</th>
									<th class=" border-2 border-black ">Action</th>
								</tr>
							</thead>
							<tbody  class="h-[10px] " v-for="(item, index) in approval" :key="item.id">
								<tr class="text-center  text-sm h-[5px] ">
									<td class="  ">
										{{ index + 1 }}
									</td>
									<td class="cursor-default border-x-2 border-black">
										{{
											item.Notification.PlantSchedule.PlantSheet
												.plant.name
										}}
									</td>
									<td class="  ">
										<button
											class="hover:text-blue-600 "
											@click.prevent="
												fetchPlantSchedulesByIdLocal(
													item.Notification.PlantSchedule.id
												)
											"
										>
											{{ item.Notification.PlantSchedule.code }}
										</button>
									</td>
									<td class=" border-x-2 border-black ">
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
											<GreenButton
												class="cursor-default   "
												v-else
												:nohover="true"
												:type="'button'"
												:text="'Updated'"
											/>
										</div>
									</td>
									<td class=" ">
										<div
											v-if="
												!approvalLocal[index].Notification
													.approvalStatusLocal
											"
											class="flex flex-row gap-1 justify-center"
										>
											<BlueButton
												@click.prevent="
													patchStatusPlantSchedulesLocal(
														item.id,
														index,
														item.NotificationId,
														'norejected'
													)
												"
												:type="'button'"
												:text="'Approve'"
											/>
											<RedButton
												@click.prevent="
													patchStatusPlantSchedulesLocal(
														item.id,
														index,
														item.NotificationId,
														'rejected'
													)
												"
												type="'button'"
												:text="'Reject'"
											/>
										</div>
										<div
											v-else
											class="flex items-center justify-center"
										>
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
			v-if="isNotif"
			class="z-40 absolute top-[43px] right-[45px] h-[250px] w-[200px] p-2 bg-slate-50 rounded-md border-2 border-slate-500"
		>
			<h3 class="text-right border-b-2 border-black">Notification</h3>
			<div class="h-[200px] w-full overflow-auto">
				<button
					class="flex flex-row gap-1 text-sm text-left pl-2 font-medium hover:text-slate-500"
					v-for="item in approval"
					:key="item.id"
					@click="isReadNOTIFinApproval(item.NotificationId)"
				>
					<p class="text-end">•</p>
					<span
						:class="{
							'font-normal hover:text-slate-500 text-slate-600 text-sm':
								item.Notification.isRead === true,
						}"
						>{{ item.Notification.description }}</span
					>
				</button>
			</div>
		</div>
		<div class="max-w-[1435px] mx-auto px-2 sm:px-6 lg:px-0">
			<div class="relative flex items-center justify-between h-16">
				<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
					<button
						type="button"
						class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
						aria-controls="mobile-menu"
						aria-expanded="false"
						@click="isMobileMenuOpen = !isMobileMenuOpen"
					>
						<span class="sr-only">Open main menu</span>
						<span
							:class="{
								hidden: isMobileMenuOpen,
								block: !isMobileMenuOpen,
							}"
						>
							&#9776;
						</span>
						<span
							:class="{
								hidden: !isMobileMenuOpen,
								block: isMobileMenuOpen,
							}"
						>
							&#10006;
						</span>
					</button>
				</div>
				<div
					class="flex-1 flex items-center justify-center sm:items-center sm:justify-between"
				>
					<div class="flex flex-row">
						<RouterLink
							to="/plantschedule"
							class="flex-shrink-0"
							@mouseenter="handleSidebarFlag"
						>
							<img
								class="block lg:hidden h-8 w-auto"
								src="../assets/indo evergreen agro business.png"
								alt="Logo Indo Evergreen"
							/>
							<img
								class="hidden lg:block h-8 w-auto"
								src="../assets/indo evergreen agro business.png"
								alt="Logo Indo Evergreen"
							/>
						</RouterLink>
						<div class="hidden sm:block sm:ml-12 sm:mt-1">
							<div class="flex flex-row space-x-4">
								<div
									class="text-md font-medium text-slate-600 hover:text-slate-400"
								>
									{{ this.$route.name }}
								</div>
								<button class="text-blue-200">
									{{ notificationIsNotRead }}
								</button>
								<!-- <router-link
									to="/crop"
									class="text-md font-medium text-slate-500 hover:text-slate-700 "
									:class="{'text-slate-900' : this.$route.name === 'crop'}"
									aria-current="page"
								>
									PlantSheet
								</router-link>
								<router-link
									to="/plantschedule"
									class="text-md font-medium text-slate-500 hover:text-slate-700 "
									:class="{'text-slate-900' : this.$route.name === 'plantschedule'}"
									aria-current="page"
								>
									PlantSchedule
								</router-link> -->
							</div>
						</div>
					</div>
					<ul class="sm:flex sm:flex-row hidden space-x-4">
						<li>
							{{ email }} as
							<span class="text-blue-600">{{ role }}</span>
						</li>
						<li @click.prevent="handleLogout">
							<button
								class="text-md font-medium text-slate-500 hover:text-slate-700 focus:outline-none focus:text-slate-900"
								aria-current="page"
							>
								Log Out
							</button>
						</li>
						<li v-if="!isApproveNotif">
							<button @click.prevent="isApproveNotifChanger">
								<img
									src="../assets/icons8-notification-48.png"
									alt="black empty bell"
									class="w-[30px]"
								/>
							</button>
						</li>
						<li v-if="isApproveNotif">
							<button @click.prevent="isApproveNotifChanger">
								<img
									src="../assets/icons8-alarm-48.png"
									alt="red full bell"
									class="w-[30px]"
								/>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div
			:class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
			class="sm:hidden"
			id="mobile-menu"
		>
			<div class="px-2 pt-2 pb-3 space-y-1">
				<router-link
					to="/crop"
					class="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
					aria-current="page"
				>
					Home
				</router-link>
			</div>
		</div>
	</nav>
	<!-- <router-view :key="$route.params.id" /> -->
	<!-- <router-view -->
</template>

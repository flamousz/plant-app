<script>
import { RouterLink, useRouter } from "vue-router";
import SideBar from "./SideBar.vue";
import { mapActions, mapState } from "pinia";
import { useUomStore } from "../stores/uom";
import { useUserStore } from "../stores/user";
import { useApprovalStore } from "../stores/approval";

export default {
	name: "Navbar",
	components: {
		SideBar,
		RouterLink,
	},
	data() {
		return {
			isMobileMenuOpen: false,
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
	methods: {
		...mapActions(useUomStore, ["handleSidebarFlag"]),
		...mapActions(useApprovalStore, ["fetchApprovals"]),
		...mapActions(useUserStore, ["handleLogout", "fetchNotification", 'patchNotification']),
		subString(val) {
			const startIndex = 0; // Start index of the desired substring
			const endIndex = 15; // End index of the desired substring

			return val.map((str) => str.substring(startIndex, endIndex));
		},
		isApproveNotifChanger(){
			this.isApproveNotif = !this.isApproveNotif
			this.isNotifChanger()
		},
		isNotifChanger() {
			this.isNotif = !this.isNotif;
		},
		routerLocal(id) {
			this.isNotifChanger();
			this.$router.push(`/plantschedule/${id}`);
		},
		isReadNOTIFinApproval(plantscheduleId, notifId){
			console.log('masuk ke isReadNotifinApproval di method');
			this.routerLocal(plantscheduleId)
			const notifData = {
				id: notifId,
				isRead: true
			}
			this.patchNotification(notifData)
			// this.fetchApprovals(this.navbarData);
		}
	},
	computed: {
		...mapState(useApprovalStore, ["approval"]),
		...mapState(useUserStore, ["notification"]),
		notificationIsNotRead() {
			// Check if any notification has isRead set to false
			if (this.approval.some((notification) => !notification.Notification.isRead)) {
				this.isApproveNotif = true
			} else {
				this.isApproveNotif = false
			}
			
		},
		notificationContent() {
			const content = this.approval.map((el) => {
				return [el.Notification.description, el.Notification.PlantSchedule.id, el.NotificationId, el.Notification.isRead];
			});

			return content;
		},
		
	},
	created() {
		this.fetchNotification();
		this.fetchApprovals(this.navbarData);
		// if (localStorage.getItem('approvalSequence')) {
		// }
	},
	setup() {
		const router = useRouter();
		return { router };
	},
};
</script>

<template>
	<!-- <pre>ini isApproveNotif {{ isApproveNotif }}</pre> -->
	<!-- <pre>ini notification {{ notification }}</pre> -->
	<!-- <div class="flex flex-row">
		<pre>ini approval {{ approval }}</pre>
		<pre>{{ notificationContent }}</pre>
	</div> -->
	<!-- <pre>ini isNotif is {{ isNotif }}</pre> -->
	<!-- <pre>ini notificationIsNotRead is {{ notificationIsNotRead }}</pre> -->
	<SideBar />
	<nav class="bg-blue-200">
		<div
			v-if="isNotif"
			class="z-40 absolute top-[43px] right-[155px] h-[250px]  w-[180px] p-2 bg-slate-50 rounded-md border-2 border-slate-500"
		>
			<h3 class="text-right border-b-2 border-black">Notification</h3>
			<div class=" h-[200px] w-full text-left overflow-auto">
				<button
					class="text-sm hover:text-slate-500"
					
					v-for="item in notificationContent"
					:key="item.id"
					@click="isReadNOTIFinApproval(item[1], item[2])"
				>
					<span :class="{'text-slate-500 text-sm': item[3] === true }">• {{ item[0] }}</span>
				</button>
			</div>
		</div>
		<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
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
							<button @click.prevent="isNotif = !isNotif">
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

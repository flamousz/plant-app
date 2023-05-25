<script>
import { RouterLink, useRouter } from "vue-router";
import SideBar from "./SideBar.vue";
import { mapActions } from "pinia";
import { useUomStore } from "../stores/uom";
import { useUserStore } from "../stores/user";

export default {
	name: "Navbar",
	components: {
    SideBar,
    RouterLink
},
	data() {
		return {
			isMobileMenuOpen: false,
			email: localStorage.getItem('email'),
			role: localStorage.getItem('role')
		};
	},
	methods: {
		...mapActions(useUomStore, ["handleSidebarFlag"]),
		...mapActions(useUserStore, ['handleLogout'])
	},
	setup() {
		const router = useRouter();
		return { router };
	},
};
</script>

<template>
	<!-- {{ email }} -->
	<SideBar />
	<nav class="bg-blue-200 ">
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
						<RouterLink to="/plantschedule"  class="  flex-shrink-0" @mouseenter="handleSidebarFlag">
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
						</RouterLink >
						<div class="hidden sm:block sm:ml-12 sm:mt-1">
							<div class="flex flex-row space-x-4">
								<div class="text-md font-medium  text-slate-600 hover:text-slate-400 ">
									{{ this.$route.name }}
								</div>
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
					<ul class="sm:flex sm:flex-row hidden space-x-4 ">
							<li >
								{{ email }} as
								<span class="text-blue-600">{{ role }}</span>
							</li>
							<li @click.prevent="handleLogout" >
								<button
									
									class=" text-md font-medium text-slate-500 hover:text-slate-700 focus:outline-none focus:text-slate-900"
									aria-current="page"
								>
									Log Out
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
</template>

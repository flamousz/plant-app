<script lang="ts">
export default {
	name: "SideBar",
	data() {
		return {
			isOpened: false,
			showMasterData: false,
			showResources: false,
			showTransaction: false,
		};
	},
};
</script>
<template>
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
	<VueSidePanel v-model="isOpened" lock-scroll side="left" width="300px" >
		<div class="flex flex-col h-[620px] bg-blue-100 pt-[180px] pl-[20px] "  @mouseleave="isOpened = false"  >
			<div id="transaction-data-group">
				<button
					@mouseenter="showTransaction = !showTransaction"
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
						:class="{ 'text-blue-700': this.$route.name === 'task' }"
						to="/crop"
						>Task Sheet</RouterLink
					>
				</ul>
			</div>
			<div
				id="master-data-group"
				:style="{
					position: 'absolute',
					top: '428px',
					transition: 'top 400ms',
				}"
			>
				<button
					@mouseenter="showMasterData = !showMasterData"
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
						:class="{ 'text-blue-700': this.$route.name === 'crop' }"
						to="/crop"
						>Plant Sheet</RouterLink
					>
				</ul>
			</div>
			<div
				id="resources-group"
				:style="{
					position: 'absolute',
					top: showTransaction ? '320px' : '230px',
					transition: 'top 400ms',
				}"
			>
				<button
					@mouseenter="showResources = !showResources"
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

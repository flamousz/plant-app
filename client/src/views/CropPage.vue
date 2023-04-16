<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import TableRowCrop from "../components/TableRow/TableRowCrop.vue";
import { useCropStore } from "../stores/crop";
import BlueButton from "../components/Buttons/BlueButton.vue";

export default {
	name: "CropPage",
	methods: {
		...mapActions(useCropStore, ["fetchCrop"]),
		queryAction(value) {
			this.query = {
				filter: value,
			};
			this.fetchCrop()
		},
	},
	computed: {
		...mapState(useCropStore, ["crop"]),
		...mapWritableState(useCropStore, ["query"]),
	},
	created() {
		this.fetchCrop();
	},
	components: { TableRowCrop, BlueButton },
};
</script>

<template>
	<!-- <pre>{{ crop }}</pre> -->
	<div class="z-40 fixed flex">
		<RouterLink to="/formplantsheet"
			><BlueButton :type="'button'" :text="'NEW CROP'"
		/></RouterLink>
	</div>
	<div class="bg-blue-100 p-4 w-full">
		<div class="overflow-auto rounded-lg shadow">
			<div class="flex flex-row justify-end items-end gap-3 pr-1 mb-2">
				<div class="flex flex-row gap-1">
					<button  @click.prevent="queryAction('archived')" class="border border-black p-1 w-[100%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100 bg-red-100" >
						Archived
					</button>
				</div>
				<div class="flex flex-row gap-1">
					<button  @click.prevent="queryAction('avail')" class="border border-black p-1 w-[100%] h-[5%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100 bg-red-100">
						Available
					</button>
				</div>
			</div>
			<table class="w-full">
				<thead
					class="bg-gray-400 h-10 whitespace-nowrap border-b-2 tracking-wide text-center border-gray-700"
				>
					<tr class="rounded-t-3xl">
						<th class="rounded-tl-md w-2">No</th>
						<th class="w-10">Name</th>
						<th class="w-10">Seedling Age</th>
						<th class="w-10">Harvest Age</th>
						<th class="w-10">Harvest Time</th>
						<th class="w-10">Crop Age</th>
						<th class="w-10">Crop Production Weight</th>
						<th class="w-10">Status</th>
						<th class="w-10">Type</th>
					</tr>
				</thead>
				<tbody
					class="bg-slate-100 text-center tracking-wider divide-y divide-gray-600"
				>
					<TableRowCrop
						v-for="(item, index) in crop"
						:key="item.id"
						:item="item"
						:index="index"
					/>
				</tbody>
			</table>
		</div>
	</div>
</template>

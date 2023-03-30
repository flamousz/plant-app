<script>
import { mapActions, mapState } from "pinia";
import TableRowCrop from "../components/TableRow/TableRowCrop.vue";
import { useCropStore } from "../stores/crop";

export default {
    name: "CropPage",
    methods: {
        ...mapActions(useCropStore, ["fetchCrop"]),
    },
    computed: {
        ...mapState(useCropStore, ["crop"]),
    },
    created() {
        this.fetchCrop();
    },
    components: { TableRowCrop }
};
</script>

<template >
	<!-- <pre>{{ crop }}</pre> -->
	<div class="bg-blue-100 p-4 h-full">
		<div class="overflow-auto  rounded-lg shadow">
			<table class="w-full">
				<thead class="bg-gray-400 h-10 whitespace-nowrap  border-b-2 tracking-wide text-center border-gray-700 ">
					<tr class="rounded-t-3xl">
						<th class="rounded-tl-md w-2">No</th>
						<th class="w-10" >Name</th>
						<th class="w-10"  >Seedling Age</th>
						<th class="w-10">Harvest Age</th>
						<th class="w-10">Harvest Time</th>
						<th class="w-10">Crop Age</th>
						<th class="w-10">Crop Production Weight</th>
						<th class="w-10 " >Type</th>
						<th class="w-10" >Action</th>
					</tr>
				</thead>
				<tbody class="bg-slate-100 text-center  tracking-wider divide-y divide-gray-600">
					<TableRowCrop v-for="(item, index) in crop" :key="item.id" :item="item" :index="index"/>
				</tbody>
			</table>
		</div>
	</div>
</template>

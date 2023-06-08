<script>
import { mapActions } from "pinia";
import { useCropStore } from "../../stores/crop";

export default {
	name: "TableRowCrop",
	props: ["item", "index"],
	methods: {
		...mapActions(useCropStore, ["getCropById"]),
	},

};
</script>

<template>
	<!-- <pre>{{ item }}</pre> -->
	<tr class="whitespace-nowrap hover:bg-slate-200" @click.prevent="this.$router.push(`/detailplant/${item.id}`)">
		<td class="h-14">
			{{ index + 1 }}
		</td>
		<td class="h-14">{{ item?.plant?.name }}</td>
		<td class="h-14">{{ item?.seedlingAge }} day</td>
		<td class="h-14">{{ item?.harvestAge }} day</td>
		<td class="h-14">{{ item?.harvestTime }} day</td>
		<td class="h-14">{{ item?.cropAge }} day</td>
		<td class="h-14">{{ item?.cropProdWeight }} kg</td>
		<td class="h-14">{{ item?.arcStatus }}</td>
		<td class="h-14">{{ item?.PlantType?.name }}</td>
	</tr>
</template>

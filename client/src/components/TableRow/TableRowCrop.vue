<script>
import BlueButton from "../Buttons/BlueButton.vue";
import RedButton from "../Buttons/RedButton.vue";
import { mapActions } from "pinia";
import { useCropStore } from "../../stores/crop";

export default {
	name: "TableRowCrop",
	props: ["item", "index"],
	methods: {
		...mapActions(useCropStore, ["getCropById"]),
	},
	components: { RedButton, BlueButton },
};
</script>

<template>
	<!-- <pre>{{ item }}</pre> -->
	<tr class="whitespace-nowrap hover:bg-slate-200" @click.prevent="this.$router.push(`/detailplant/${item.id}`)">
		<td class="h-14">
			{{ index + 1 }}
		</td>
		<td class="h-14">{{ item?.plant.name }}</td>
		<td class="h-14">{{ item?.seedlingAge }}</td>
		<td class="h-14">{{ item?.harvestAge }}</td>
		<td class="h-14">{{ item?.harvestTime }}</td>
		<td class="h-14">{{ item?.cropAge }}</td>
		<td class="h-14">{{ item?.cropProdWeight }}</td>
		<td class="h-14">{{ item?.PlantType?.name }}</td>
	</tr>
</template>

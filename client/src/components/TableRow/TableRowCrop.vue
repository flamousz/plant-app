<script>
import { RouterLink } from "vue-router";
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
	components: { RedButton, BlueButton, RouterLink },
};
</script>

<template>
	<tr class="whitespace-nowrap hover:bg-slate-200">
		<td class="h-14">
			{{ index + 1 }}
		</td>
		<td class="h-14">{{ item.name }}</td>
		<td class="h-14">{{ item.seedlingAge }}</td>
		<td class="h-14">{{ item.harvestAge }}</td>
		<td class="h-14">{{ item.harvestTime }}</td>
		<td class="h-14">{{ item.cropAge }}</td>
		<td class="h-14">{{ item.cropProdWeight }}</td>
		<td class="h-14">{{ item.type }}</td>
		<td class="h-14 flex flex-row gap-1 justify-center items-center">
			<RedButton :type="'button'" :text="'DELETE'" :id="item.id" />
			<div @click="getCropById(item.id)">
				<BlueButton :type="'button'" :text="'EDIT'" />
			</div>
		</td>
	</tr>
</template>

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
	<!-- looping in td -->
	<td
		class="h-14"
		v-for="fertilizer in item.fertilizerConjunctions"
		:key="fertilizer.id"
	>
		{{ fertilizer.Item.name }}
	</td>

    <!-- click button -->
	<td class="h-14 flex flex-row gap-1 justify-center items-center">
		<RedButton :type="'button'" :text="'DELETE'" :id="item.id" />
		<div @click="getCropById(item.id)">
			<BlueButton :type="'button'" :text="'EDIT'" />
		</div>
	</td>
</template>




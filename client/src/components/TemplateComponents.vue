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



	<!-- ul li di detail plant -->
	<ul v-if="activeTab === 'fertilizers'">
		<li
			v-for="fertilizer in cropDetail?.fertilizerConjunctions"
			:key="fertilizer.id"
		>
			• {{ fertilizer.Item?.name }}
		</li>
	</ul>
	<ul v-if="activeTab === 'pesticides'">
		<li
			v-for="pesticides in cropDetail?.PesticideConjunctions"
			:key="pesticides.id"
		>
			• {{ pesticides.Item?.name }}
		</li>
	</ul>
	<ul v-if="activeTab === 'materials'">
		<li
			v-for="material in cropDetail?.materialConjunctions"
			:key="material.id"
		>
			• {{ material.Item?.name }}
		</li>
	</ul>
	<ul v-if="activeTab === 'seeds'">
		<li v-for="seeds in cropDetail?.SeedConjunctions" :key="seeds.id">
			• {{ seeds.Item?.name }}
		</li>
	</ul>
</template>

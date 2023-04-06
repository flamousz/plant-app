<script>
import { mapActions, mapState } from "pinia";
import { useCropStore } from "../stores/crop";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";

export default {
	name: "DetailPlant",
	data() {
		return {
			activeTab: "sdf",
		};
	},
	methods: {
		...mapActions(useCropStore, ["getCropById"]),
		buttonSelector(value) {
			this.activeTab = value;
		},
	},
	computed: {
		...mapState(useCropStore, ["cropDetail"]),
	},
	created() {
		this.getCropById(this.$route.params.id);
	},
	components: { RedButton, BlueButton },
};
</script>

<template>
	<!-- <pre>{{ activeTab }}</pre> -->
	<section class="w-full">
		<div class="flex flex-col px-10 bg-red-300">
			<div class="flex flex-row bg-slate-400 h-[100px] mb-3">
				<div
					class="bg-green-300 w-[40%] flex justify-start items-end text-5xl font-bold"
				>
					{{ cropDetail.plant.name }}
				</div>
				<div
					class="bg-purple-600 w-[60%] flex flex-row justify-end items-end gap-3 "
				>
					<div>
						<RedButton
							:type="'button'"
							:text="'DELETE'"
							:id="cropDetail.id"
						/>
					</div>
					<div>
						<BlueButton :type="'button'" :text="'EDIT'" />
					</div>
				</div>
			</div>
			<div class="bg-red-500 h-[180px] flex flex-row border-2 border-black">
				<div
					class="bg-yellow-400 w-[33.3333333%] border-black border-[3px] rounded-lg m-3 flex flex-col justify-center items-center gap-2"
				>
					<div
						class="flex flex-col border-2 border-black pl-3 rounded-lg w-[80%]"
					>
						<div class="text-xl font-bold">Seedling Age</div>
						<div class="text-lg font-semibold">
							{{ cropDetail.seedlingAge }}
						</div>
					</div>
					<div
						class="flex flex-col border-2 border-black pl-3 rounded-lg w-[80%]"
					>
						<div class="text-xl font-bold">Harvest Age</div>
						<div class="text-lg font-semibold">
							{{ cropDetail.harvestAge }}
						</div>
					</div>
				</div>
				<div
					class="bg-yellow-400 w-[33.3333333%] border-black border-[3px] rounded-lg m-3 flex flex-col justify-center items-center gap-2"
				>
					<div
						class="flex flex-col border-2 border-black pl-3 rounded-lg w-[80%]"
					>
						<div class="text-xl font-bold">Harvest Time</div>
						<div class="text-lg font-semibold">
							{{ cropDetail.harvestTime }}
						</div>
					</div>
					<div
						class="flex flex-col border-2 border-black pl-3 rounded-lg w-[80%]"
					>
						<div class="text-xl font-bold">Crop Age</div>
						<div class="text-lg font-semibold">
							{{ cropDetail.cropAge }}
						</div>
					</div>
				</div>
				<div
					class="bg-yellow-400 w-[33.3333333%] border-black border-[3px] rounded-lg m-3 flex flex-col justify-center items-center gap-2"
				>
					<div
						class="flex flex-col border-2 border-black pl-3 rounded-lg w-[80%]"
					>
						<div class="text-xl font-bold">
							Production Weight per Plant
						</div>
						<div class="text-lg font-semibold">
							{{ cropDetail.cropProdWeight }}
						</div>
					</div>
					<div
						class="flex flex-col border-2 border-black pl-3 rounded-lg w-[80%]"
					>
						<div class="text-xl font-bold">Plant Type</div>
						<div class="text-lg font-semibold">
							{{ cropDetail.PlantType.name }}
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col mt-3">
				<div class="flex flex-row w-full gap-2 bg-green-300">
					<button
						@click.prevent="buttonSelector('pesticides')"
						type="button"
						class="border active:bg-red-300 focus:bg-red-500 border-black p-1 w-[7%] text-center rounded-md"
					>
						Pesticides
					</button>
					<button
						@click.prevent="buttonSelector('fertilizers')"
						type="button"
						class="border border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 focus:bg-red-500"
					>
						Fertilizers
					</button>
					<button
						@click.prevent="buttonSelector('materials')"
						type="button"
						class="border border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 focus:bg-red-500"
					>
						Materials
					</button>
					<button
						@click.prevent="buttonSelector('seeds')"
						type="button"
						class="border border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 focus:bg-red-500"
					>
						Seeds
					</button>
				</div>
				<div class="p-2">
					<ul v-if="activeTab === 'fertilizers'">
						<li
							v-for="fertilizer in cropDetail.fertilizerConjunctions"
							:key="fertilizer.id"
						>
							• {{ fertilizer.Item.name }}
						</li>
					</ul>
					<ul v-if="activeTab === 'pesticides'">
						<li
							v-for="pesticides in cropDetail.PesticideConjunctions"
							:key="pesticides.id"
						>
							• {{ pesticides.Item.name }}
						</li>
					</ul>
					<ul v-if="activeTab === 'materials'">
						<li
							v-for="material in cropDetail.materialConjunctions"
							:key="material.id"
						>
							• {{ material.Item.name }}
						</li>
					</ul>
					<ul v-if="activeTab === 'seeds'">
						<li
							v-for="seeds in cropDetail.SeedConjunctions"
							:key="seeds.id"
						>
							• {{ seeds.Item.name }}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>

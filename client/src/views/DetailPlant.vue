<script>
import { mapActions, mapState } from "pinia";
import { useCropStore } from "../stores/crop";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";
import TableRow4Colum from "../components/TableRow/TableRow4Colum.vue";

export default {
	name: "DetailPlant",
	data() {
		return {
			activeTab: "",
		};
	},
	methods: {
		...mapActions(useCropStore, ["getCropById", "deleteCrop"]),
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
	components: { RedButton, BlueButton, TableRow4Colum },
};
</script>

<template>
	<!-- <pre>{{ activeTab }}</pre> -->
	<section class="w-full">
		<div class="flex flex-col px-10 bg-slate-100">
			<div class="flex flex-row h-[100px] mb-3">
				<div
					class="w-[40%] flex justify-start items-end text-5xl font-bold"
				>
					{{ cropDetail.plant.name }}
				</div>
				<div class="w-[60%] flex flex-row justify-end items-end gap-3">
					<div @click="deleteCrop(cropDetail.id)">
						<RedButton :type="'button'" :text="'DELETE'" />
					</div>
					<div>
						<BlueButton :type="'button'" :text="'EDIT'" />
					</div>
				</div>
			</div>
			<div class="h-[180px] flex flex-row border-2 border-black">
				<div
					class="w-[33.3333333%] bg-yellow-500 border-black border-[3px] rounded-lg m-3 flex flex-col justify-center items-center gap-2"
				>
					<div class="flex flex-row gap-2 justify-end items-end w-[90%]">
						<div
							class="flex flex-col border-2 bg-yellow-300 border-black pl-3 rounded-lg w-[80%]"
						>
							<div class="text-xl font-bold">Code</div>
							<div class="text-lg font-semibold">
								{{ cropDetail?.plant.code }}
							</div>
						</div>
						<div
							class="flex flex-col border-2 bg-yellow-300 border-black pl-3 rounded-lg w-[80%]"
						>
							<div class="text-xl font-bold">Seedling Age</div>
							<div class="text-lg font-semibold">
								{{ cropDetail?.seedlingAge }}
							</div>
						</div>
					</div>

					<div
						class="flex flex-col border-2 bg-yellow-300 border-black pl-3 rounded-lg w-[90%]"
					>
						<div class="text-xl font-bold">Harvest Age</div>
						<div class="text-lg font-semibold">
							{{ cropDetail?.harvestAge }}
						</div>
					</div>
				</div>
				<div
					class="w-[33.3333333%] bg-yellow-500 border-black border-[3px] rounded-lg m-3 flex flex-col justify-center items-center gap-2"
				>
					<div
						class="flex flex-col border-2 bg-yellow-300 border-black pl-3 rounded-lg w-[80%]"
					>
						<div class="text-xl font-bold">Harvest Time</div>
						<div class="text-lg font-semibold">
							{{ cropDetail?.harvestTime }}
						</div>
					</div>
					<div
						class="flex flex-col border-2 bg-yellow-300 border-black pl-3 rounded-lg w-[80%]"
					>
						<div class="text-xl font-bold">Crop Age</div>
						<div class="text-lg font-semibold">
							{{ cropDetail?.cropAge }}
						</div>
					</div>
				</div>
				<div
					class="w-[33.3333333%] bg-yellow-500 border-black border-[3px] rounded-lg m-3 flex flex-col justify-center items-center gap-2"
				>
					<div
						class="flex flex-col border-2 bg-yellow-300 border-black pl-3 rounded-lg w-[80%]"
					>
						<div class="text-xl font-bold">
							Production Weight per Plant
						</div>
						<div class="text-lg font-semibold">
							{{ cropDetail?.cropProdWeight }}
						</div>
					</div>
					<div
						class="flex flex-col border-2 bg-yellow-300 border-black pl-3 rounded-lg w-[80%]"
					>
						<div class="text-xl font-bold">Plant Type</div>
						<div class="text-lg font-semibold">
							{{ cropDetail?.PlantType.name }}
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col mt-3">
				<div class="flex flex-row w-full gap-2">
					<button
						@click.prevent="buttonSelector('pesticides')"
						type="button"
						class="border active:bg-red-300 hover:bg-red-400 focus:bg-red-500 border-black p-1 w-[7%] text-center rounded-md focus:text-red-100"
					>
						Pesticides
					</button>
					<button
						@click.prevent="buttonSelector('fertilizers')"
						type="button"
						class="border border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100"
					>
						Fertilizers
					</button>
					<button
						@click.prevent="buttonSelector('materials')"
						type="button"
						class="border border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100"
					>
						Materials
					</button>
					<button
						@click.prevent="buttonSelector('seeds')"
						type="button"
						class="border border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100"
					>
						Seeds
					</button>
				</div>
				<div class="p-2">
					<div v-if="activeTab === 'fertilizers'">
						<thead>
							<tr>
								<th>Name</th>
								<th>Dose</th>
								<th>UOM</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							<TableRow4Colum 
							v-for="(fertilizer, index) in cropDetail.fertilizerConjunctions" 
							:key="fertilizer.id" :fertilizer="fertilizer" :index="index"
							/>
						</tbody>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

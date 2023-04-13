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
			role: localStorage.getItem("role"),
			cropData: {
				id: 0,
				arcStatus: "",
			},
		};
	},
	methods: {
		...mapActions(useCropStore, [
			"getCropById",
			"deleteCrop",
			"getCropByIdForEdit",
			"patchCrop",
		]),
		buttonSelector(value) {
			this.activeTab = value;
		},
		patchLocal() {
			this.cropData.id = this.cropDetail.id;
			if (this.cropDetail.arcStatus === "archived") {
				this.cropData.arcStatus = "avail";
			} else {
				this.cropData.arcStatus = "archived";
			}
			console.log(this.cropData, "<<< ini cropData");
			this.patchCrop(this.cropData);
		},
	},
	computed: {
		...mapState(useCropStore, ["cropDetail", "editFlag"]),
		archive() {
			if (this.cropDetail.arcStatus === "archived") {
				return 'avail'
			} else {
				return 'archived'
			}
		},
	},
	created() {
		this.getCropById(this.$route.params.id);
	},
	components: { RedButton, BlueButton, TableRow4Colum },
};
</script>

<template>
	<!-- <pre>{{ role }}</pre> -->
	<section class="w-full">
		<div class="flex flex-col px-10 bg-slate-100">
			<div class="w-full flex justify-end items-end pt-4">
				<div class="text-2xl font-bold w-[8%]">STATUS:</div>
				<div
					class="w-[13%] border-[3px] rounded-md border-slate-800 bg-yellow-300 font-semibold text-center tracking-wide"
				>
					{{ cropDetail.status }} - {{ cropDetail.arcStatus }}
				</div>
			</div>
			<div class="flex flex-row h-[50px] mb-3">
				<div
					class="w-[40%] flex justify-start items-end text-5xl font-bold"
				>
					{{ cropDetail?.plant?.name }}
				</div>
				<div class="w-[60%] flex flex-row justify-end items-end gap-3">
					<div @click="patchLocal">
						<RedButton :type="'button'" :text="archive" />
					</div>
					<div @click="deleteCrop(cropDetail.id)" v-if="role === 'super'">
						<RedButton :type="'button'" :text="'DELETE'" />
					</div>
					<div
						@click="getCropByIdForEdit(cropDetail.id)"
						v-if="role === 'super' || cropDetail.status === 'draft'"
					>
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
				<div class="pt-2">
					<div
						v-if="activeTab === 'fertilizers'"
						class="bg-yellow-400 w-[90%] flex flex-col"
					>
						<thead>
							<tr class="flex flex-row w-full bg-red-600">
								<th class="w-[43%] bg-slate-400 border-black border">
									Name
								</th>
								<th class="w-[10%] bg-green-600 border-y border-black">
									Dose
								</th>
								<th class="w-[10%] bg-white border border-black">
									UOM
								</th>
								<th class="w-[37%] border border-black">Description</th>
							</tr>
						</thead>
						<tbody>
							<TableRow4Colum
								v-for="(
									fertilizer, index
								) in cropDetail.fertilizerConjunctions"
								:key="fertilizer.id"
								:fertilizer="fertilizer"
								:index="index"
							/>
						</tbody>
					</div>
					<div
						v-if="activeTab === 'pesticides'"
						class="bg-yellow-400 w-[90%] flex flex-col"
					>
						<thead>
							<tr class="flex flex-row w-full bg-red-600">
								<th class="w-[22%] bg-slate-400 border-black border">
									Name
								</th>
								<th class="w-[21%] bg-slate-400 border-black border">
									Category
								</th>
								<th class="w-[10%] bg-green-600 border-y border-black">
									Dose
								</th>
								<th class="w-[10%] bg-white border border-black">
									UOM
								</th>
								<th class="w-[37%] border border-black">Description</th>
							</tr>
						</thead>
						<tbody>
							<TableRow4Colum
								v-for="(
									pesticide, index
								) in cropDetail.PesticideConjunctions"
								:key="pesticide.id"
								:pesticide="pesticide"
								:index="index"
							/>
						</tbody>
					</div>
					<div
						v-if="activeTab === 'materials'"
						class="bg-yellow-400 w-[90%] flex flex-col"
					>
						<thead>
							<tr class="flex flex-row w-full bg-red-600">
								<th class="w-[43%] bg-slate-400 border-black border">
									Name
								</th>
								<th class="w-[10%] bg-green-600 border-y border-black">
									Dose
								</th>
								<th class="w-[10%] bg-white border border-black">
									UOM
								</th>
								<th class="w-[37%] border border-black">Description</th>
							</tr>
						</thead>
						<tbody>
							<TableRow4Colum
								v-for="(
									materials, index
								) in cropDetail.materialConjunctions"
								:key="materials.id"
								:material="materials"
								:index="index"
							/>
						</tbody>
					</div>
					<div
						v-if="activeTab === 'seeds'"
						class="bg-yellow-400 w-[90%] flex flex-col"
					>
						<thead>
							<tr class="flex flex-row w-full bg-red-600">
								<th class="w-[43%] bg-slate-400 border-black border">
									Name
								</th>
								<th class="w-[57%] border border-black">Brand</th>
							</tr>
						</thead>
						<tbody>
							<TableRow4Colum
								v-for="(seed, index) in cropDetail.SeedConjunctions"
								:key="seed.id"
								:seed="seed"
								:index="index"
							/>
						</tbody>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

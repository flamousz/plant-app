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
			activeTab: "pesticides",
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
				return "avail";
			} else {
				return "archived";
			}
		},
		firstPlantAge() {
			let total = this.cropDetail.seedlingAge + this.cropDetail.harvestAge;

			return total;
		},
		finalPlantAge() {
			let total = this.firstPlantAge + this.cropDetail.harvestTime;

			return total;
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
	<!-- <pre>{{ cropDetail }}</pre> -->
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
					<div @click="patchLocal" v-if="role !== 'super'">
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
			<div
				class="h-[570px] flex flex-col-reverse border-2 border-black bg-slate-300"
			>
				<div
					class="w-[30%] h-[240px] bg-yellow-500 border-black border-[3px] rounded-lg m-2 p-0 flex flex-col justify-center items-center gap-2"
				>
					<div class="flex flex-row gap-2 justify-end items-end w-[90%]">
						<div
							class="flex flex-col border-2 bg-yellow-300 border-black px-3 rounded-lg w-[80%]"
						>
							<div class="text-xl font-bold">Code</div>
							<div class="text-lg font-semibold text-center">
								{{ cropDetail?.plant?.code }}
							</div>
						</div>
						<div
							class="flex flex-col border-2 bg-yellow-300 border-black px-1 rounded-lg w-[80%]"
						>
							<div class="text-xl font-bold">Type of Plant</div>
							<div class="text-lg font-semibold">
								{{ cropDetail?.PlantType?.name }}
							</div>
						</div>
					</div>
					<div
						class="flex flex-col border-2 bg-yellow-300 border-black pl-2 rounded-lg w-[90%]"
					>
						<div class="text-xl font-bold">
							Production Weight per Plant
						</div>
						<div class="text-lg font-semibold">
							{{ cropDetail?.cropProdWeight }} Kg
						</div>
					</div>
					<div class="flex flex-row gap-2 justify-end items-end w-[90%]">
						<div
							class="flex flex-col border-2 bg-yellow-300 border-black px-3 rounded-lg w-[80%]"
						>
							<div class="text-xl font-bold">Fallacy Nursery</div>
							<div class="text-lg font-semibold text-center">
								{{ cropDetail?.fallacyNursery }} %
							</div>
						</div>
						<div
							class="flex flex-col border-2 bg-yellow-300 border-black px-1 rounded-lg w-[80%]"
						>
							<div class="text-xl font-bold">Plant per Metre</div>
							<div class="text-lg font-semibold">
								{{ cropDetail?.plantPerMetre }} m<sup>2</sup>
							</div>
						</div>
					</div>
				</div>
				<div
					class="h-[300px] bg-slate-100 border-black border-[3px] pt-14 rounded-lg m-2 flex flex-row justify-center items-center gap-1 p-2"
				>
					<div class="flex flex-col w-[11%]">
						<div class="w-[100%] h-full">
							<img
								src="../assets/Initialseedling.png"
								alt="Initial seedling"
							/>
						</div>
						<div class="w-full text-sm text-center">(HSS + HST)</div>
						<div class="w-full text-center h-full">1st Day</div>
					</div>
					<div class="w-[11%] h-[132px]">
						<div class="w-[100%] text-sm text-center">(HSS)</div>
						<div class="w-full text-center">
							1 - {{ cropDetail?.seedlingAge }} Day
						</div>
						<div class="w-full">
							<img src="../assets/arrow.png" alt="arrow" />
						</div>
					</div>
					<div class="w-[11%] h-[250px] text-center mb-6">
						<div class="w-[100%] font-bold">Seedling Age</div>
						<div class="  ">
							{{ cropDetail?.seedlingAge }}th Day (HSS)
						</div>
						<div class="">
							<img
								src="../assets/2nd-process.png"
								alt="Initial seedling"
							/>
						</div>
						<div class="">(HSS+ HST)</div>
						<div class="">{{ cropDetail?.seedlingAge }}th Day</div>
					</div>
					<div class="w-[11%] h-[132px]">
						<div class="w-full mt-11">
							<img src="../assets/arrow.png" alt="arrow" />
						</div>
					</div>
					<div class="w-[11%] text-center mb-28">
						<div class="h-full font-bold">Plant storage displacement</div>
						<div class="h-full">0 Day (HST)</div>
						<div class="w-[100%] h-full">
							<img
								src="../assets/3rd-process.png"
								alt="Initial seedling"
							/>
						</div>
					</div>
					<div class="w-[11%] h-[132px]">
						<div class="w-[100%] text-sm text-center">(HST)</div>
						<div class="w-full text-center">
							1 - {{ cropDetail?.harvestAge }} Day
						</div>
						<div class="w-full">
							<img src="../assets/arrow.png" alt="arrow" />
						</div>
					</div>
					<div class="w-[11%] h-[250px] text-center mb-6">
						<div class="w-[100%] font-bold">Harvest Age</div>
						<div class="  ">{{ cropDetail?.harvestAge }}th Day (HST)</div>
						<div class="">
							<img
								src="../assets/4th-process.png"
								alt="Initial seedling"
							/>
						</div>
						<div class="">(HSS + HST)</div>
						<div class="">{{ firstPlantAge }}th Day</div>
					</div>
					<div class="w-[11%] h-[132px] mb-9">
						<div class="w-[100%] text-sm text-center font-bold">
							Harvest Time
						</div>
						<div class="w-[100%] text-sm text-center">(HST)</div>
						<div class="w-full text-center">
							{{ cropDetail?.harvestTime }} Day
						</div>
						<div class="w-full">
							<img src="../assets/arrow.png" alt="arrow" />
						</div>
					</div>
					<div class="w-[11%] h-[250px] text-center mb-6">
						<div class="w-[100%] font-bold">Plant Age</div>
						<div class="  ">{{ cropDetail?.cropAge }}th Day (HST)</div>
						<div class="">
							<img
								src="../assets/5th-process.png"
								alt="Initial seedling"
							/>
						</div>
						<div class="">(HSS+ HST)</div>
						<div class="">{{ finalPlantAge }}th Day</div>
					</div>
				</div>
			</div>
			<div
				class="flex flex-col mt-3 relative bg-slate-300 mb-4 h-[300px] p-2 border-2 border-black rounded overflow-auto"
			>
				<div class="flex flex-row w-full gap-2 sticky top-0 bg-slate-300">
					<button
						@click.prevent="buttonSelector('pesticides')"
						type="button"
						class="border active:bg-red-300 hover:bg-red-400 focus:bg-red-500 border-black p-1 w-[7%] text-center rounded-md focus:text-red-100"
						:class="{
							'bg-red-500': activeTab === 'pesticides',
							'text-red-100': activeTab === 'pesticides',
						}"
					>
						Pesticides
					</button>
					<button
						@click.prevent="buttonSelector('fertilizers')"
						type="button"
						class="border border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100"
						:class="{
							'bg-red-500': activeTab === 'fertilizers',
							'text-red-100': activeTab === 'fertilizers',
						}"
					>
						Fertilizers
					</button>
					<button
						@click.prevent="buttonSelector('materials')"
						type="button"
						class="border border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100"
						:class="{
							'bg-red-500': activeTab === 'materials',
							'text-red-100': activeTab === 'materials',
						}"
					>
						Materials
					</button>
				</div>
				<div class="pt-2">
					<div
						v-if="activeTab === 'fertilizers'"
						class="bg-slate-50 w-[90%] flex flex-col"
					>
						<thead>
							<tr class="flex flex-row w-full bg-slate-400">
								<th class="w-[23%] border-black border">Name</th>
								<th class="w-[10%] border-y border-black">Dose</th>
								<th class="w-[10%] border border-black">UOM</th>
								<th class="w-[47%] border border-black">Description</th>
								<th class="w-[10%] border border-black">Type</th>
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
						class="bg-slate-50 w-[90%] flex flex-col"
					>
						<thead>
							<tr class="flex flex-row w-full bg-slate-400">
								<th class="w-[23%] border-black border">Name</th>
								<th class="w-[10%] border-y border-black">Dose</th>
								<th class="w-[10%] border border-black">UOM</th>
								<th class="w-[47%] border border-black">Description</th>
								<th class="w-[10%] border border-black">Type</th>
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
						class="bg-slate-50 w-[90%] flex flex-col"
					>
						<thead>
							<tr class="flex flex-row w-full bg-slate-400">
								<th class="w-[23%] border-black border">Name</th>
								<th class="w-[10%] border-y border-black">Dose</th>
								<th class="w-[10%] border border-black">UOM</th>
								<th class="w-[47%] border border-black">Description</th>
								<th class="w-[10%] border border-black">Type</th>
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
				</div>
			</div>
		</div>
	</section>
</template>

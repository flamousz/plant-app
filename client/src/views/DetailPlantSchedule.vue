<script>
import { mapActions, mapState } from "pinia";
import { useCropStore } from "../stores/crop";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";
import TableRow4Colum from "../components/TableRow/TableRow4Colum.vue";
import { usePlantScheduleStore } from "../stores/plantschedule";

export default {
	name: "DetailPlantSchedule",
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
		...mapActions(usePlantScheduleStore, [
			"fetchPlantSchedulesById",
			"fetchHarvestRealization",
			'fetchPlantSchedulesByIdForEdit'
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
		...mapState(usePlantScheduleStore, [
			"plantSchedulesDetail",
			"harvestRealization",
		]),
		archive() {
			if (this.cropDetail.arcStatus === "archived") {
				return "avail";
			} else {
				return "archived";
			}
		},
		harvestTotalExpectation() {
			const value =
				this.plantSchedulesDetail.PlantSheet.cropProdWeight *
				this.plantSchedulesDetail.totalPopulation;

			return value;
		},
		harvestPerDayExpectation() {
			const value =
				this.harvestTotalExpectation /
				this.plantSchedulesDetail.PlantSheet.harvestTime;

			return value;
		},
		firstPlantAge() {
			let total =
				this.plantSchedulesDetail?.PlantSheet?.harvestAge +
				this.plantSchedulesDetail?.PlantSheet?.seedlingAge;
			return total;
		},
		finalPlantAge() {
			let total =
				this.firstPlantAge +
				this.plantSchedulesDetail?.PlantSheet?.harvestTime;

			return total;
		},
	},
	created() {
		this.fetchPlantSchedulesById(this.$route.params.id);
		this.fetchHarvestRealization(this.$route.params.id);
	},
	components: { RedButton, BlueButton, TableRow4Colum },
};
</script>

<template>
	<!-- <pre>{{ harvestTotalExpectation }}</pre>
	<pre>{{ harvestPerDayExpectation }}</pre> -->
	<section class="w-full">
		<div class="flex flex-col px-10 bg-slate-100">
			<!-- <div class="w-full flex justify-end items-end pt-4">
				<div class="text-2xl font-bold w-[8%]">STATUS:</div>
				<div
					class="w-[13%] border-[3px] rounded-md border-slate-800 bg-yellow-300 font-semibold text-center tracking-wide"
				>
					{{ cropDetail.status }} - {{ cropDetail.arcStatus }}
				</div>
			</div> -->
			<div class="flex flex-row h-[50px] mb-3">
				<div
					class="w-[40%] flex justify-start items-end text-5xl font-bold"
				>
					{{ plantSchedulesDetail?.PlantSheet?.plant?.name }}
				</div>
				<div class="w-[60%] flex flex-row justify-end items-end gap-3">
					<!-- <div @click="patchLocal" v-if="role !== 'super'">
						<RedButton :type="'button'" :text="archive" />
					</div>
					<div @click="deleteCrop(cropDetail.id)" v-if="role === 'super'">
						<RedButton :type="'button'" :text="'DELETE'" />
					</div> -->
					<!-- <div
						@click="getCropByIdForEdit(cropDetail.id)"
						v-if="role === 'super' || cropDetail.status === 'draft'"
					>
						<BlueButton :type="'button'" :text="'EDIT'" />
					</div> -->
					<div
						@click="fetchPlantSchedulesByIdForEdit(plantSchedulesDetail.id)"
					>
						<BlueButton :type="'button'" :text="'VALIDATION'" />
					</div>
				</div>
			</div>
			<div
				class="h-[443px] flex flex-col-reverse border-2 border-black bg-slate-300"
			>
				<div class="flex flex-row justify-center items-center mb-2">
					<div
						class="bg-yellow-500 h-[90px] border-black border-[3px] w-[18%] rounded-lg m-2 p-0 flex flex-col justify-center items-center gap-2"
					>
						<div
							class="flex flex-col border-2 bg-yellow-300 border-black px-3 rounded-lg w-[85%]"
						>
							<div class="text-xl font-bold pl-[5px]">Code</div>
							<div class="text-lg font-semibold text-center">
								{{ plantSchedulesDetail?.PlantSheet?.plant?.code }}
							</div>
						</div>
					</div>
					<div
						class="bg-yellow-500 h-[90px] border-black border-[3px] w-[29%] rounded-lg m-2 p-0 flex flex-col justify-center items-center gap-2"
					>
						<div
							class="flex flex-col border-2 bg-yellow-300 border-black px-3 rounded-lg w-[83%]"
						>
							<div class="text-xl font-bold">
								Production Weight per Plant
							</div>
							<div class="text-lg font-semibold">
								{{ plantSchedulesDetail?.PlantSheet?.cropProdWeight }}
								Kg
							</div>
						</div>
					</div>
					<div
						class="bg-yellow-500 h-[90px] border-black border-[3px] w-[16.5%] rounded-lg m-2 p-0 flex flex-col justify-center items-center gap-2"
					>
						<div
							class="flex flex-col border-2 justify-center items-center bg-yellow-300 border-black rounded-lg w-[70%]"
						>
							<div class="text-xl font-bold">Type of Plant</div>
							<div class="text-lg font-semibold">
								{{ plantSchedulesDetail?.PlantSheet?.PlantType?.name }}
							</div>
						</div>
					</div>
					<div
						class="bg-yellow-500 h-[90px] border-black border-[3px] w-[16.5%] rounded-lg m-2 p-0 flex flex-col justify-center items-center gap-2"
					>
						<div
							class="flex flex-col border-2 justify-center items-center bg-yellow-300 border-black rounded-lg w-[70%]"
						>
							<div class="text-xl font-bold">Population</div>
							<div class="text-lg font-semibold">
								{{ plantSchedulesDetail?.totalPopulation }}
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
							1 - {{ plantSchedulesDetail?.PlantSheet?.seedlingAge }} Day
						</div>
						<div class="w-full">
							<img src="../assets/arrow.png" alt="arrow" />
						</div>
					</div>
					<div class="w-[11%] h-[250px] text-center mb-6">
						<div class="w-[100%] font-bold">Seedling Age</div>
						<div class="  ">
							{{ plantSchedulesDetail?.PlantSheet?.seedlingAge }}th Day
							(HSS)
						</div>
						<div class="">
							<img
								src="../assets/2nd-process.png"
								alt="Initial seedling"
							/>
						</div>
						<div class="">(HSS+ HST)</div>
						<div class="">
							{{ plantSchedulesDetail?.PlantSheet?.seedlingAge }}th Day
						</div>
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
							1 - {{ plantSchedulesDetail?.PlantSheet?.harvestAge }} Day
						</div>
						<div class="w-full">
							<img src="../assets/arrow.png" alt="arrow" />
						</div>
					</div>
					<div class="w-[11%] h-[250px] text-center mb-6">
						<div class="w-[100%] font-bold">Harvest Age</div>
						<div class="  ">
							{{ plantSchedulesDetail?.PlantSheet?.harvestAge }}th Day
							(HST)
						</div>
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
							{{ plantSchedulesDetail?.PlantSheet?.harvestTime }} Day
						</div>
						<div class="w-full">
							<img src="../assets/arrow.png" alt="arrow" />
						</div>
					</div>
					<div class="w-[11%] h-[250px] text-center mb-6">
						<div class="w-[100%] font-bold">Plant Age</div>
						<div class="  ">
							{{ plantSchedulesDetail?.PlantSheet?.cropAge }}th Day (HST)
						</div>
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
				<div class="flex flex-row w-full gap-2 sticky top-0">
					<button
						@click.prevent="buttonSelector('pesticides')"
						type="button"
						class="border bg-slate-300 active:bg-red-300 hover:bg-red-400 focus:bg-red-500 border-black p-1 w-[7%] text-center rounded-md focus:text-red-100"
					>
						Pesticides
					</button>
					<button
						@click.prevent="buttonSelector('fertilizers')"
						type="button"
						class="border bg-slate-300 border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100"
					>
						Fertilizers
					</button>
					<button
						@click.prevent="buttonSelector('materials')"
						type="button"
						class="border bg-slate-300 border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100"
					>
						Materials
					</button>
					<button
						@click.prevent="buttonSelector('seeds')"
						type="button"
						class="border bg-slate-300 border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100"
					>
						Seeds
					</button>
					<button
						@click.prevent="buttonSelector('realization')"
						type="button"
						class="border bg-slate-300 border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100"
					>
						Realization
					</button>
					<button
						@click.prevent="buttonSelector('estimation')"
						type="button"
						class="border bg-slate-300 border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100"
					>
						Estimation
					</button>
				</div>
				<div class="pt-2">
					<div
						v-if="activeTab === 'estimation'"
						class="bg-slate-400 bg-opacity-50 w-[100%] h-[220px] rounded-md mt-2 flex flex-row justify-center items-center gap-3"
					>
						<div
							class="bg-yellow-300 h-[120px] border-black border-[3px] w-[18%] rounded-lg  flex flex-col justify-center items-center gap-2"
						>
							<div
								class="flex flex-col border-2 bg-yellow-500 border-black px-3 rounded-lg w-[85%]"
							>
								<div class="text-xl font-bold pl-[5px] text-center">Total Harvest Estimation</div>
								<div class="text-lg font-semibold text-center">
									{{ harvestTotalExpectation }} Kg
								</div>
							</div>
						</div>
						<div
						class="bg-yellow-300 h-[120px] border-black border-[3px] w-[18%] rounded-lg  flex flex-col justify-center items-center gap-2"
					>
						<div
							class="flex flex-col border-2 bg-yellow-500 border-black px-3 rounded-lg w-[85%]"
						>
							<div class="text-xl font-bold pl-[5px] text-center">Harvest per Day Estimation</div>
							<div class="text-lg font-semibold text-center">
								{{ harvestPerDayExpectation }} Kg
							</div>
						</div>
					</div>
					</div>
					<div
						v-if="activeTab === 'realization'"
						class="w-[90%] flex flex-col"
					>
						<RouterLink
							:to="{
								path: '/harvestoutcome/form',
								query: {
									id: $route.params.id,
									harvestExpectation: harvestPerDayExpectation,
								},
							}"
							class="z-40 fixed bottom-7 left-13 flex opacity-50 hover:opacity-90"
						>
							<BlueButton :type="'button'" :text="'+ Realization'" />
						</RouterLink>
						<thead>
							<tr class="flex flex-row w-full">
								<th class="w-[4.661%] bg-slate-400 border-black border">
									No
								</th>
								<th class="w-[20.89%] bg-slate-400 border border-black">
									Harvest Date
								</th>
								<th class="w-[15%] bg-slate-400 border border-black">
									Letter Number
								</th>
								<th class="w-[20%] border bg-slate-400 border-black">
									Harvest Weight Estimation
								</th>
								<th class="w-[20%] border bg-slate-400 border-black">
									Harvest Weight Realization
								</th>
							</tr>
						</thead>
						<tbody>
							<TableRow4Colum
								v-for="(realization, index) in harvestRealization"
								:key="realization.id"
								:realization="realization"
								:index="index"
							/>
						</tbody>
					</div>
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
								v-for="(fertilizer, index) in plantSchedulesDetail
									?.PlantSheet?.fertilizerConjunctions"
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
								v-for="(pesticide, index) in plantSchedulesDetail
									?.PlantSheet?.PesticideConjunctions"
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
								v-for="(materials, index) in plantSchedulesDetail
									?.PlantSheet?.materialConjunctions"
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
								v-for="(seed, index) in plantSchedulesDetail?.PlantSheet
									?.SeedConjunctions"
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

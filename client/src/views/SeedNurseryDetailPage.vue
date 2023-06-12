<script >
import { mapActions, mapState } from "pinia";
import TableRow4Colum from "../components/TableRow/TableRow4Colum.vue";
import { useSeedNurseryStore } from "../stores/seedNursery";
export default {
	name: "SeedNurseryDetailPage",
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
		formatDate(date) {
			if (!date) {
				return "";
			}
			return new Date(date).toLocaleDateString("en-AU", {
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		},
		formatDateMinusOneday(date) {
			if (!date) {
				return "";
			}

			const modifiedDate = new Date(date);
			modifiedDate.setDate(modifiedDate.getDate() - 1);

			return modifiedDate.toLocaleDateString("en-AU", {
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		},
		...mapActions(useSeedNurseryStore, ["fetchSeedNurseryById"]),
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
		...mapState(useSeedNurseryStore, ["seednurseryDetail"]),
		archive() {
			if (this.cropDetail.arcStatus === "archived") {
				return "avail";
			} else {
				return "archived";
			}
		},
		harvestTotalExpectation() {
			const value =
				this.plantSchedulesDetail?.PlantSheet?.cropProdWeight *
				this.plantSchedulesDetail.totalPopulation;

			return value;
		},
		harvestPerDayExpectation() {
			const value =
				this.harvestTotalExpectation /
				this.plantSchedulesDetail?.PlantSheet?.harvestTime;

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
		this.fetchSeedNurseryById(this.$route.params.id);
	},
	watch: {
		plantSchedulesDetail(newVal, oldVal) {
			if (newVal.seedlingDate) {
				this.calendarData();
			}
		},
	},
	components: { TableRow4Colum },
};
</script>

<template>
	<!-- <pre>{{ seednurseryDetail }}</pre> -->
	<section class="w-full">
		<div class="flex flex-col px-10 bg-slate-100 gap-3">
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
					{{ seednurseryDetail?.PlantSchedule?.PlantSheet?.plant?.name }}
					Nursery
				</div>
				<!-- <div class="w-[60%] flex flex-row justify-end items-end gap-3">
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
				</div> -->
			</div>
			<section
				id="upper-block"
				class="h-[300px] flex flex-col-reverse border-2 border-black bg-slate-300 rounded-md"
			>
				<div class="flex flex-row justify-between">
					<section
						id="yellow-box-information"
						class="w-[30%] bg-slate-100 border-black border-[3px] rounded-lg p-2 m-2 pt-8"
					>
						<div class="flex flex-col">
							<div class="flex flex-row w-full">
								<div
									class="bg-yellow-500 h-[90px] border-black border-[3px] w-[50%] rounded-lg m-2 p-0 flex flex-col justify-center items-center gap-2"
								>
									<div
										class="flex flex-col w-[90%] border-2 justify-center items-center bg-yellow-300 border-black rounded-lg"
									>
										<div class="text-xl font-bold">Prepared Seed</div>
										<div class="text-lg font-semibold">
											{{
												seednurseryDetail?.PlantSchedule
													?.seedNursery
											}}
											seed
										</div>
									</div>
								</div>
								<div
									class="bg-yellow-500 h-[90px] w-[50%] border-black border-[3px] rounded-lg m-2 p-0 flex flex-col justify-center items-center gap-2"
								>
									<div
										class="flex flex-col border-2 justify-center items-center w-[80%] bg-yellow-300 border-black rounded-lg"
									>
										<div class="text-xl font-bold">Population</div>
										<div class="text-lg font-semibold">
											{{
												seednurseryDetail?.PlantSchedule
													?.totalPopulation
											}}
											crop
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="flex flex-row">
							<div
								class="bg-yellow-500 h-[90px] border-black border-[3px] w-[45.5%] rounded-lg m-2 flex flex-col justify-center items-center gap-2"
							>
								<div
									class="flex flex-col border-2 bg-yellow-300 border-black rounded-lg w-[90%]"
								>
									<div class="text-xl text-center font-bold pl-[5px]">
										Seedling Date
									</div>
									<div
										class="text-lg font-semibold text-center w-[100%]"
									>
										{{
											formatDate(
												seednurseryDetail?.PlantSchedule
													?.seedlingDate
											)
										}}
									</div>
								</div>
							</div>
							<div
								class="bg-yellow-500 h-[90px] border-black border-[3px] w-[45.5%] rounded-lg m-2 flex flex-col justify-center items-center gap-2"
							>
								<div
									class="flex flex-col border-2 bg-yellow-300 border-black rounded-lg w-[90%]"
								>
									<div class="text-xl text-center font-bold pl-[5px]">
										Planting Date
									</div>
									<div
										class="text-lg font-semibold text-center w-[100%]"
									>
										{{
											formatDate(
												seednurseryDetail?.PlantSchedule
													?.plantingDate
											)
										}}
									</div>
								</div>
							</div>
						</div>
					</section>
					<section
						id="graphic-information"
						class="h-[280px] w-[50%] bg-slate-100 border-black border-[3px] rounded-lg m-2 flex flex-row gap-1 p-2"
					>
						<div class="flex flex-col w-[33%] text-center mb-6">
							<div class="font-bold">First Day Nursery</div>
							<div class="">1 Day (HSS)</div>
							<div class="flex justify-center">
								<img
									class="w-[80%]"
									src="../assets/Initialseedling.png"
									alt="Initial seedling"
								/>
							</div>
							<div>
								{{
									formatDate(
										seednurseryDetail?.PlantSchedule?.seedlingDate
									)
								}}
							</div>
						</div>
						<div class="flex justify-center flex-col w-[33%]">
							<div class="text-sm text-center">(HSS)</div>
							<div class="text-center">
								1 -
								{{
									seednurseryDetail?.PlantSchedule?.PlantSheet
										?.seedlingAge
								}}
								Day
							</div>
							<div class="flex justify-center">
								<img
									src="../assets/arrow.png"
									class="w-[100%]"
									alt="arrow"
								/>
							</div>
						</div>
						<div class="text-center mb-6 w-[33%]">
							<div class="font-bold">Last Day Nursery</div>
							<div class="  ">
								{{
									seednurseryDetail?.PlantSchedule?.PlantSheet
										?.seedlingAge
								}}th Day (HSS)
							</div>
							<div class="flex justify-center">
								<img
									class="w-[80%]"
									src="../assets/2nd-process.png"
									alt="Initial seedling"
								/>
							</div>
							<div>
								{{
									formatDateMinusOneday(
										seednurseryDetail?.PlantSchedule?.plantingDate
									)
								}}
							</div>
						</div>
					</section>
				</div>
			</section>
			<div
				class="flex flex-col relative bg-slate-300 h-[300px] mb-5 p-2 border-2 border-black rounded overflow-auto"
			>
				<section
					id="breadcrumbs-list"
					class="flex flex-row w-full gap-2 sticky top-0"
				>
					<button
						@click.prevent="buttonSelector('pesticides')"
						type="button"
						:class="{
							'text-red-100': activeTab === 'pesticides',
							'bg-red-500': activeTab === 'pesticides',
						}"
						class="border active:bg-red-300 hover:bg-red-400 border-black p-1 w-[7%] text-center rounded-md"
					>
						Pesticides
					</button>
					<button
						@click.prevent="buttonSelector('fertilizers')"
						type="button"
						:class="{
							'text-red-100': activeTab === 'fertilizers',
							'bg-red-500': activeTab === 'fertilizers',
						}"
						class="border border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400"
					>
						Fertilizers
					</button>
					<button
						@click.prevent="buttonSelector('materials')"
						type="button"
						:class="{
							'text-red-50': activeTab === 'materials',
							'bg-red-500': activeTab === 'materials',
						}"
						class="border border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400"
					>
						Materials
					</button>
				</section>
				<section id="table-conjunction" class="pt-2">
					<div
						v-if="activeTab === 'fertilizers'"
						class="w-[90%] flex flex-col"
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
								v-for="(fertilizersNursery, index) in seednurseryDetail
									?.PlantSchedule?.PlantSheet?.fertilizerConjunctions"
								:key="fertilizersNursery.id"
								:fertilizersNursery="fertilizersNursery"
								:index="index"
							/>
						</tbody>
					</div>
					<div
						v-if="activeTab === 'pesticides'"
						class="w-[90%] flex flex-col"
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
								v-for="(pesticideNursery, index) in seednurseryDetail
									?.PlantSchedule?.PlantSheet?.PesticideConjunctions"
								:key="pesticideNursery.id"
								:pesticideNursery="pesticideNursery"
								:index="index"
							/>
						</tbody>
					</div>
					<div
						v-if="activeTab === 'materials'"
						class="w-[90%] flex flex-col"
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
								v-for="(materials, index) in seednurseryDetail
									?.PlantSchedule?.PlantSheet?.materialConjunctions"
								:key="materials.id"
								:material="materials"
								:index="index"
							/>
						</tbody>
					</div>
				</section>
			</div>
		</div>
	</section>
	<!-- <pre>{{ seednurseryDetail }}</pre> -->
</template>

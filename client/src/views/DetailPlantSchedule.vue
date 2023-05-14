<script>
import { mapActions, mapState } from "pinia";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";
import TableRow4Colum from "../components/TableRow/TableRow4Colum.vue";
import { usePlantScheduleStore } from "../stores/plantschedule";

export default {
	name: "DetailPlantSchedule",
	data() {
		return {
			activeTab: "pesticides",
			role: localStorage.getItem("role"),
			cropData: {
				id: 0,
				arcStatus: "",
			},
			markers: [],
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
				day: 'numeric'
			});
		},
		calendarData() {
			if (this.plantSchedulesDetail.seedlingDate) {
				const seedlingDate = new Date(
					this.plantSchedulesDetail.seedlingDate
				);
				const plantingDate = new Date(
					this.plantSchedulesDetail.plantingDate
				);
				const plantingDateMinusOneDay = plantingDate.setDate(
					plantingDate.getDate() - 1
				);
				for (
					let d = seedlingDate;
					d <= plantingDateMinusOneDay;
					d.setDate(d.getDate() + 1)
				) {
					let seedlingDateObj = {
						date: new Date(d),
						type: "line",
						tooltip: [
							{ text: "Seedling Date to Planting Date", color: "blue" },
						],
						color: "blue",
					};
					this.markers.push(seedlingDateObj);
				}

				const harvestDate = new Date(this.plantSchedulesDetail.harvestDate);
				const harvestDateMinusOneDay = harvestDate.setDate(
					harvestDate.getDate() - 1
				);
				for (
					let d = plantingDate;
					d <= harvestDateMinusOneDay;
					d.setDate(d.getDate() + 1)
				) {
					let harvestDateObj = {
						date: new Date(d),
						type: "line",
						tooltip: [
							{ text: "Planting Date to Harvest Date", color: "red" },
						],
						color: "red",
					};
					this.markers.push(harvestDateObj);
				}
				const unloadDate = new Date(this.plantSchedulesDetail.unloadDate);
				const unloadDateMinusOneDay = unloadDate.setDate(
					unloadDate.getDate() - 1
				);
				for (
					let d = harvestDate;
					d <= unloadDateMinusOneDay;
					d.setDate(d.getDate() + 1)
				) {
					let unloadDateObj = {
						date: new Date(d),
						type: "line",
						tooltip: [
							{ text: "Harvest Date to Unload Date", color: "yellow" },
						],
						color: "yellow",
					};
					this.markers.push(unloadDateObj);
				}
				this.markers.push({
					date: this.plantSchedulesDetail.unloadDate,
					type: "line",
					tooltip: [{ text: "Unload Date", color: "green" }],
					color: "green",
				});
			} else if (!this.plantSchedulesDetail.seedlingDate) {
				console.log(
					"masuk ke calendarData function dan seedling date belum ada"
				);
			}
		},
		...mapActions(usePlantScheduleStore, [
			"fetchPlantSchedulesById",
			"fetchHarvestRealization",
			"fetchPlantSchedulesByIdForEdit",
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
	mounted() {
		if (this.cropAreaReady) {
			console.log("masuk ke mounted");
			console.log(
				this.plantSchedulesDetail.CropArea,
				"<< this.plantSchedulesDetail di mounted"
			);
			const map = L.map("map").setView([-7.201704, 107.601358], 17);
			const opt = JSON.parse(this.plantSchedulesDetail.CropArea.map);

			opt.forEach((Coords) => {
				[Coords[0], Coords[1]] = [Coords[1], Coords[0]];
			});
			const polygon = L.polygon(opt, {
				color: "#5fa85d",
				fillColor: "#8ef78b",
				fillOpacity: 1,
			}).addTo(map);

			// polygon.bindPopup(
			// 	`<b>${this.plantSchedulesDetail.CropArea.name}</b><br>Area: ${this.plantSchedulesDetail.CropArea.area} m<sup>2</sup>`
			// );

			let popup = L.popup()
				.setLatLng(opt[0])
				.setContent(
					`<b>${this.plantSchedulesDetail.CropArea.name}</b><br>Area: ${this.plantSchedulesDetail.CropArea.area} m<sup>2</sup>`
				)
				.openOn(map);

			console.log(opt, "<<< ini opt");
			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution:
					'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
				maxZoom: 20,
			}).addTo(map);
		}
	},
	computed: {
		...mapState(usePlantScheduleStore, [
			"plantSchedulesDetail",
			"harvestRealization",
			"editFlag",
		]),
		cropAreaReady() {
			return this.plantSchedulesDetail.CropArea.map.length > 0;
		},
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
		this.fetchPlantSchedulesById(this.$route.params.id);
		this.fetchHarvestRealization(this.$route.params.id);
	},
	watch: {
		plantSchedulesDetail(newVal, oldVal) {
			if (newVal.seedlingDate) {
				this.calendarData();
			}
		},
	},
	components: { RedButton, BlueButton, TableRow4Colum },
};
</script>

<template>
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
					{{ plantSchedulesDetail?.PlantSheet?.plant?.name
					}}<span class="text-slate-100">{{ cropAreaReady }}</span>
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
						@click="
							fetchPlantSchedulesByIdForEdit(plantSchedulesDetail.id)
						"
					>
						<BlueButton :type="'button'" :text="'VALIDATION'" />
					</div>
				</div>
			</div>
			<section
				id="upper-block"
				class="h-[360px] flex flex-col-reverse border-2 border-black bg-slate-300 rounded-md"
			>
				<div class="flex flex-row justify-between">
					<div class="w-[30%] h-[340px] bg-slate-100 border-black border-[3px] rounded-lg p-2 m-2">
						<div class="flex flex-col">
							<div
								class="bg-yellow-500 h-[90px] border-black border-[3px] rounded-lg m-2 p-0 w-[95%] flex flex-col justify-center items-center gap-2"
							>
								<div
									class="flex flex-col border-2 bg-yellow-300 border-black px-3 rounded-lg"
								>
									<div class="text-xl font-bold">
										Production Weight per Plant
									</div>
									<div class="text-lg font-semibold">
										{{
											plantSchedulesDetail?.PlantSheet
												?.cropProdWeight
										}}
										Kg
									</div>
								</div>
							</div>
							<div class="flex flex-row w-full">
								<div
									class="bg-yellow-500 h-[90px] border-black border-[3px] w-[50%] rounded-lg m-2 p-0 flex flex-col justify-center items-center gap-2"
								>
									<div
										class="flex flex-col w-[90%] border-2 justify-center items-center bg-yellow-300 border-black rounded-lg"
									>
										<div class="text-xl font-bold">Type of Plant</div>
										<div class="text-lg font-semibold">
											{{
												plantSchedulesDetail?.PlantSheet?.PlantType
													?.name
											}}
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
											{{ plantSchedulesDetail?.totalPopulation }}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div>
							<div
								class="bg-yellow-500 h-[90px] border-black border-[3px] w-[45.5%] rounded-lg m-2  flex flex-col justify-center items-center gap-2"
							>
								<div
									class="flex flex-col border-2 bg-yellow-300 border-black  rounded-lg w-[90%]"
								>
									<div class="text-xl text-center font-bold pl-[5px]">Code</div>
									<div class="text-lg font-semibold text-center w-[100%]">
										{{ plantSchedulesDetail?.code }}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						class="h-[340px] w-[70%] bg-slate-100 border-black border-[3px] pt-[57px] rounded-lg m-2 flex flex-row  gap-1 p-2"
					>
						<div class=" h-[250px] text-center mb-6">
							<div class=" font-bold">
								Planting Date
							</div>
							<div class="">0 Day (HST)</div>
							<div >
								<img
									src="../assets/3rd-process.png"
									alt="Initial seedling"
								/>
							</div>
							<div >{{ formatDate(plantSchedulesDetail?.plantingDate) }}</div>
						</div>
						<div class=" h-[100px] w-[300px]  mt-[77px]">
							<div class="w-[100%] text-sm text-center">(HST)</div>
							<div class="w-full text-center">
								1 -
								{{ plantSchedulesDetail?.PlantSheet?.harvestAge }} Day
							</div>
							<div class="w-full">
								<img src="../assets/arrow.png" alt="arrow" />
							</div>
						</div>
						<div class=" h-[250px] text-center mb-6">
							<div class="w-[100%] font-bold">Harvest Date</div>
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
							<div >{{ formatDate(plantSchedulesDetail?.harvestDate) }}</div>
						</div>
						<div class=" h-[100px] w-[300px] mt-[57px]">
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
						<div class=" h-[250px] text-center mb-6">
							<div class="w-[100%] font-bold">Unload Date</div>
							<div class="  ">
								{{ plantSchedulesDetail?.PlantSheet?.cropAge }}th Day
								(HST)
							</div>
							<div class="">
								<img
									src="../assets/5th-process.png"
									alt="Initial seedling"
								/>
							</div>
							<div >{{ formatDate(plantSchedulesDetail?.unloadDate) }}</div>
							
						</div>
					</div>
				</div>
			</section>
			<section class="h-[400px] flex flex-col border-2  border-black bg-slate-300 rounded-md">
				<div class="flex flex-row w-full mb-2 h-full justify-center items-center">
					<div
						id="map-section"
						class="w-full flex flex-col h-full m-[14px]"
					>
						<div class="flex justify-center h-[20%] w-full items-center">
							<h2 class="text-5xl font-semibold">
								Location of Plant Schedule
							</h2>
						</div>
						<div class="h-[80%] w-full bg-slate-200" id="map"></div>
					</div>
				</div>
			</section>
			<section
				id="calendar-section"
				class="h-[410px] border-2 w-full rounded-md border-black bg-slate-300  flex flex-row"
			>
				<div class="flex flex-col w-[30%]">
					<div class="h-[20%] w-full flex justify-center items-center">
						<h2 class="text-5xl font-semibold pt-8">Estimation</h2>
					</div>
					<div class="flex flex-col h-[80%]">
						<div
							class="bg-yellow-300 h-[120px] border-black border-[3px] m-4 rounded-lg flex flex-col justify-center items-center gap-2"
						>
							<div
								class="flex flex-col border-2 bg-yellow-500 justify-center items-center border-black h-[75%] rounded-lg w-[90%]"
							>
								<div class="text-xl font-bold">
									Total Harvest Estimation
								</div>
								<div class="text-lg font-semibold">
									{{ harvestTotalExpectation }} Kg
								</div>
							</div>
						</div>
						<div
							class="bg-yellow-300 h-[120px] border-black border-[3px] m-4 rounded-lg flex flex-col justify-center items-center gap-2"
						>
							<div
								class="flex flex-col border-2 bg-yellow-500 justify-center items-center border-black h-[75%] rounded-lg w-[90%]"
							>
								<div class="text-xl font-bold">
									Harvest per Day Estimation
								</div>
								<div class="text-lg font-semibold">
									{{ harvestPerDayExpectation }} Kg
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class="w-[70%] flex flex-col justify-center items-center gap-3"
				>
					<div class="text-5xl font-semibold">
						<h2>Detail Schedule</h2>
					</div>
					<div>
						<VueDatePicker
							inline
							auto-apply
							range
							multi-calendars
							:enable-time-picker="false"
							:markers="markers"
						>
							<template #left-sidebar class="">
								<ul class="p-2">
									<li class="h-14 w-60">
										- <span class="text-blue-400">Blue Line </span>
										<p class="w-full pl-3">
											Seedling Date to Planting Date
										</p>
									</li>
									<li class="h-14 w-60">
										- <span class="text-red-400">Red Line </span>
										<p class="w-full pl-3">
											Planting Date to Harvest Date
										</p>
									</li>
									<li class="h-14 w-60">
										-
										<span class="text-yellow-400">Yellow Line </span>
										<p class="w-full pl-3">
											Harvest Date to Unload Date
										</p>
									</li>
									<li class="h-14 w-60">
										- <span class="text-green-400">Green Line </span>
										<p class="w-full pl-3">Unload Date</p>
									</li>
								</ul>
							</template>
						</VueDatePicker>
					</div>
				</div>
			</section>
			<div
				class="flex flex-col  relative bg-slate-300 h-[300px] mb-5 p-2 border-2 border-black rounded overflow-auto"
			>
				<div class="flex flex-row w-full gap-2 sticky top-0">
					<button
						@click.prevent="buttonSelector('pesticides')"
						type="button"
						:class="{'text-red-100': activeTab === 'pesticides', 'bg-[#EE6363]': activeTab === 'pesticides'}"
						class="border bg-slate-300 active:bg-red-300 hover:bg-red-400  border-black p-1 w-[7%] text-center rounded-md "
					>
						Pesticides
					</button>
					<button
						@click.prevent="buttonSelector('fertilizers')"
						type="button"
						:class="{'text-red-100': activeTab === 'fertilizers', 'bg-[#EE6363]': activeTab === 'fertilizers'}"
						class="border bg-slate-300 border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400 "
					>
						Fertilizers
					</button>
					<button
						@click.prevent="buttonSelector('materials')"
						type="button"
						:class="{'text-red-100': activeTab === 'materials', 'bg-[#EE6363]': activeTab === 'materials'}"
						class="border bg-slate-300 border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400 "
					>
						Materials
					</button>
					<button
						@click.prevent="buttonSelector('realization')"
						type="button"
						:class="{'text-red-100': activeTab === 'realization', 'bg-[#EE6363]': activeTab === 'realization'}"
						class="border bg-slate-300 border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400 "
					>
						Realization
					</button>
					<!-- <button
						@click.prevent="buttonSelector('estimation')"
						type="button"
						class="border bg-slate-300 border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100"
					>
						Estimation
					</button> -->
				</div>
				<div class="pt-2">
					<!-- <div
						v-if="activeTab === 'estimation'"
						class="bg-slate-400 bg-opacity-50 w-[100%] h-[220px] rounded-md mt-2 flex flex-row justify-center items-center gap-3"
					>
						<div
							class="bg-yellow-300 h-[120px] border-black border-[3px] w-[18%] rounded-lg flex flex-col justify-center items-center gap-2"
						>
							<div
								class="flex flex-col border-2 bg-yellow-500 border-black px-3 rounded-lg w-[85%]"
							>
								<div class="text-xl font-bold pl-[5px] text-center">
									Total Harvest Estimation
								</div>
								<div class="text-lg font-semibold text-center">
									{{ harvestTotalExpectation }} Kg
								</div>
							</div>
						</div>
						<div
							class="bg-yellow-300 h-[120px] border-black border-[3px] w-[18%] rounded-lg flex flex-col justify-center items-center gap-2"
						>
							<div
								class="flex flex-col border-2 bg-yellow-500 border-black px-3 rounded-lg w-[85%]"
							>
								<div class="text-xl font-bold pl-[5px] text-center">
									Harvest per Day Estimation
								</div>
								<div class="text-lg font-semibold text-center">
									{{ harvestPerDayExpectation }} Kg
								</div>
							</div>
						</div>
					</div> -->
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
				</div>
			</div>
		</div>
	</section>
</template>

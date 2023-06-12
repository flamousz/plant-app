<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { usePlantScheduleStore } from "../stores/plantschedule";
import { useItemStore } from "../stores/item";
import { useCropAreaStore } from "../stores/cropArea";
import BlueButton from "../components/Buttons/BlueButton.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import SideBar from "../components/SideBar.vue";
import ExportButton from "../components/Buttons/ExportButton.vue";
import { useCsvStore } from "../stores/csv";

export default {
	name: "PlantSchedulePage",
	data() {
		return {
			modifiedData: [],
			itemsData: {
				filterPlant: "",
				filterLocation: "",
				commonDate: null,
				filterDate: "",
			},
		};
	},
	methods: {
		...mapActions(usePlantScheduleStore, ["fetchPlantSchedules"]),
		...mapActions(useItemStore, ["fetchPlant"]),
		...mapActions(useCropAreaStore, ["fetchAllCropArea"]),
		...mapActions(useCsvStore, ["postExportTaskMaster"]),
		deleteObjectPropertiesOfType(obj, type) {
			Object.keys(obj).forEach((key) => {
				if (typeof obj[key] === type && obj[key] !== null) {
					delete obj[key];
				}
			});
		},
		localPostExport(val) {
			let multipliedVal = [];
			val.forEach((obj) => {
				let fertilizerCount = 0;
				if (obj.PlantSheet) {
					fertilizerCount = obj.PlantSheet.fertilizerConjunctions.length;
				}
				let pesticideCount = 0;
				if (obj.PlantSheet) {
					pesticideCount = obj.PlantSheet.PesticideConjunctions.length;
				}
				let materialCount = 0;
				if (obj.PlantSheet) {
					materialCount = obj.PlantSheet.materialConjunctions.length;
				}
				let plantsheetTaskCount = 0;
				if (obj.PlantSheet) {
					plantsheetTaskCount = obj.PlantSheet.PlantsheetTaskConjunctions.length;
				}
				let harvestOutcomesCount = 0;
				if (obj.PlantsheetTaskConjunctions) {
					harvestOutcomesCount = obj.HarvestOutcomes.length;
				}
				const maxCount = Math.max(
					fertilizerCount,
					pesticideCount,
					materialCount,
					plantsheetTaskCount,
					harvestOutcomesCount
				);

				for (let i = 0; i < maxCount; i++) {
					const modifiedItem = {
						id: i === 0 ? obj.id : "",
						plant: i === 0 ? obj.PlantSheet.plant.name : "",
						code: i === 0 ? obj.code : "",
						PlantType: i === 0 ? obj.PlantSheet.PlantType.name : "",
						seedlingAge: i === 0 ? obj.PlantSheet.seedlingAge : "",
						harvestAge: i === 0 ? obj.PlantSheet.harvestAge : "",
						harvestTime: i === 0 ? obj.PlantSheet.harvestTime : "",
						cropAge: i === 0 ? obj.PlantSheet.cropAge : "",
						plantPerMetre: i === 0 ? obj.PlantSheet.plantPerMetre : "",
						fallacyNursery: i === 0 ? obj.PlantSheet.fallacyNursery : "",
						cropProdWeight: i === 0 ? obj.PlantSheet.cropProdWeight : "",
						seedlingDate:
							i === 0 ? this.formatDate(obj.seedlingDate) : "",
						plantingDate:
							i === 0 ? this.formatDate(obj.plantingDate) : "",
						harvestDate: i === 0 ? this.formatDate(obj.harvestDate) : "",
						unloadDate: i === 0 ? this.formatDate(obj.unloadDate) : "",
						totalPopulation: i === 0 ? obj.totalPopulation : "",
						statusPlantSchedule: i === 0 ? obj.statusPlantSchedule : "",
						BlockName: i === 0 ? obj.CropArea.name : "",
						BlockArea: i === 0 ? obj.CropArea.area : "",
						BlockType: i === 0 ? obj.CropArea.type : "",
						BlockDetailLocation: i === 0 ? obj.CropArea.detailplace : "",
						"task.name": "",
						"task.day": "",
						"task.description": "",
						"task.TaskPerMinute": "",
						"task.toolCategory": "",
						"task.toolName": "",
						"pesticide.name": "",
						"pesticide.standardqty": "",
						"pesticide.Uom": "",
						"pesticide.description": "",
						"pesticide.type": "",
						"fertilizer.name": "",
						"fertilizer.standardqty": "",
						"fertilizer.Uom": "",
						"fertilizer.description": "",
						"fertilizer.type": "",
						"material.name": "",
						"material.standardqty": "",
						"material.Uom": "",
						"material.description": "",
						"material.type": "",
						"harvestOutcome.letterNumber": "",
						"harvestOutcome.harvestDate": "",
						"harvestOutcome.harvestWeightEst": "",
						"harvestOutcome.harvestWeightReal": "",
					};
					if (i < harvestOutcomesCount) {
						const harvestOutcome = obj.HarvestOutcomes[i];
						modifiedItem["harvestOutcome.letterNumber"] =
							harvestOutcome?.letterNumber;
						modifiedItem["harvestOutcome.harvestDate"] =
							harvestOutcome?.harvestDate;
						modifiedItem["harvestOutcome.harvestWeightEst"] =
							harvestOutcome?.harvestWeightEst;
						modifiedItem["harvestOutcome.harvestWeightReal"] =
							harvestOutcome?.Task?.harvestWeightReal;
					}
					if (i < plantsheetTaskCount) {
						const taskConjunction = obj.PlantSheet.PlantsheetTaskConjunctions[i];
						modifiedItem["task.name"] = taskConjunction?.Task?.name;
						modifiedItem["task.day"] = taskConjunction?.day;
						modifiedItem["task.description"] =
							taskConjunction?.description;
						modifiedItem["task.TaskPerMinute"] =
							taskConjunction?.Task?.TaskPerMinute;
						modifiedItem["task.toolCategory"] =
							taskConjunction?.Task?.description;
						modifiedItem["task.toolName"] = taskConjunction?.Item?.name;
					}
					if (i < fertilizerCount) {1
						const fertilizerConjunction =
							obj.PlantSheet.fertilizerConjunctions[i];
						modifiedItem["fertilizer.name"] =
							fertilizerConjunction?.Item?.name;
						modifiedItem["fertilizer.standardqty"] =
							fertilizerConjunction?.Item?.standardqty;
						modifiedItem["fertilizer.Uom"] =
							fertilizerConjunction?.Item?.Uom?.name;
						modifiedItem["fertilizer.description"] =
							fertilizerConjunction?.Item?.description;
						modifiedItem["fertilizer.type"] = fertilizerConjunction?.type;
					}
					if (i < pesticideCount) {
						const pesticideConjunction =
							obj.PlantSheet.PesticideConjunctions[i];
						modifiedItem["pesticide.name"] =
							pesticideConjunction?.Item?.name;
						modifiedItem["pesticide.standardqty"] =
							pesticideConjunction?.Item?.standardqty;
						modifiedItem["pesticide.Uom"] =
							pesticideConjunction?.Item?.Uom?.name;
						modifiedItem["pesticide.description"] =
							pesticideConjunction?.Item?.description;
						modifiedItem["pesticide.type"] = pesticideConjunction?.type;
					}
					if (i < materialCount) {
						const materialConjunction =
							obj.PlantSheet.materialConjunctions[i];
						modifiedItem["material.name"] =
							materialConjunction?.Item?.name;
						modifiedItem["material.standardqty"] =
							materialConjunction?.Item?.standardqty;
						modifiedItem["material.Uom"] =
							materialConjunction?.Item?.Uom?.name;
						modifiedItem["material.description"] =
							materialConjunction?.Item?.description;
						modifiedItem["material.type"] = materialConjunction?.type;
					}
					multipliedVal.push(modifiedItem);
				}
			});


			this.modifiedData = multipliedVal;
			this.postExportTaskMaster(this.modifiedData);
		},
		formatDate(date) {
			if (!date) {
				return "";
			}
			return new Date(date).toLocaleDateString("en-AU", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		},
		queryAction(params, value, selectedDate) {
			console.log("masuk query action");
			console.log(params, value, "<<< params, value");
			console.log(this.itemsData.commonDate, "<< commonDate");
			if (params === "filterPlant") {
				console.log("masuk ke if filterPlant");
				this.itemsData.filterPlant = value;
			}
			if (params === "filterLocation") {
				console.log("masuk ke if filterLocation");
				this.itemsData.filterLocation = value;
			}
			if (params === "commonDate") {
				console.log("masuk ke if commondate");
				console.log(value, "<< ini value");
				this.itemsData.filterDate = selectedDate;
				this.itemsData.commonDate = value;
			}
			this.query = {
				filterDate: this.itemsData.filterDate,
				filterPlant: this.itemsData.filterPlant,
				filterLocation: this.itemsData.filterLocation,
				commonDate: this.itemsData.commonDate,
			};
			this.fetchPlantSchedules();
		},
	},
	computed: {
		...mapState(usePlantScheduleStore, ["plantSchedules"]),
		...mapState(useItemStore, ["plants"]),
		...mapWritableState(usePlantScheduleStore, ["query"]),
		...mapState(useCropAreaStore, ["cropArea"]),
	},
	created() {
		this.fetchAllCropArea();
		this.fetchPlant();
		this.fetchPlantSchedules();
		// console.log(typeof this.plantSchedules[0].seedlingDate, '<<< seedlingDate');
	},
	components: { BlueButton, SideBar, ExportButton },
};
</script>

<template>
	<!-- <div class="flex flex-row gap-1">
		<pre>plantSchedules{{ plantSchedules }}</pre>
		<pre>modifiedData{{ modifiedData }}</pre>
	</div> -->

	<!-- <pre>{{ itemsData.filterDate }}</pre> -->
	<!-- <SideBar/> -->
	<div class="bg-blue-100 p-4 w-full h-screen flex flex-col static">
		<div class="z-40 fixed bottom-6 right-7 flex opacity-50 hover:opacity-90">
			<RouterLink to="/plantschedule/form"
				><BlueButton :type="'button'" :text="'+ Schedule'"
			/></RouterLink>
		</div>
		<div class="flex flex-row justify-between items-start gap-2 mb-2">
			<div class="flex flex-row gap-2">
				<div @click.prevent="localPostExport(plantSchedules)">
					<ExportButton />
				</div>
				<div class="flex flex-row gap-1">
					<div>
						<select
							@change="
								queryAction('filterLocation', itemsData.filterLocation)
							"
							v-model="itemsData.filterLocation"
						>
							<option value="" disabled selected>
								--Select Location--
							</option>
							<option v-for="item in cropArea" :value="item.name">
								{{ item.name }}
							</option>
						</select>
					</div>
				</div>
				<div class="flex flex-row gap-1 pl-4">
					<div class="flex flex-col">
						<div>
							<select v-model="itemsData.filterDate">
								<option value="" disabled selected>
									--Select Date Type--
								</option>
								<option value="seedlingDate">Seedling Date</option>
								<option value="plantingDate">Planting Date</option>
								<option value="harvestDate">Harvest Date</option>
								<option value="unloadDate">Unload Date</option>
							</select>
						</div>
					</div>
					<VueDatePicker
						v-model="itemsData.commonDate"
						close-on-scroll
						range
						:enable-time-picker="false"
						@update:model-value="
							queryAction(
								'commonDate',
								itemsData.commonDate,
								itemsData.filterDate
							)
						"
					>
						<template #trigger>
							<img
								class="cursor-pointer w-[42%]"
								src="../assets/icons8-baby-calendar-64.png"
								alt="baby calendar"
							/>
						</template>
					</VueDatePicker>
				</div>
			</div>
			<div class="flex flex-row gap-1">
				<div>
					<select
						@change="queryAction('filterPlant', itemsData.filterPlant)"
						v-model="itemsData.filterPlant"
					>
						<option value="" disabled selected>---Select Plant---</option>
						<option
							v-for="item in plants"
							:key="item.id"
							:value="item.name"
						>
							{{ item.name }}
						</option>
					</select>
				</div>
			</div>
		</div>
		<table class="w-full">
			<thead
				class="bg-gray-400 h-10 whitespace-nowrap border-b-2 tracking-wide text-center border-gray-700"
			>
				<tr class="rounded-t-3xl">
					<th class="rounded-tl-md w-2">No</th>
					<th class="w-10">Name</th>
					<th class="w-10">Seedling Date</th>
					<th class="w-10">Planting Date</th>
					<th class="w-10">Harvest Date</th>
					<th class="w-10">Unload Date</th>
					<th class="w-10">Location</th>
					<th class="w-10">Population</th>
				</tr>
			</thead>
			<tbody
				class="bg-slate-100 text-center tracking-wider divide-y divide-gray-600"
			>
				<tr
					class="whitespace-nowrap hover:bg-slate-200"
					v-for="(item, index) in plantSchedules"
					@click.prevent="this.$router.push(`/plantschedule/${item.id}`)"
					:key="item.id"
				>
					<td class="h-14">
						{{ index + 1 }}
					</td>
					<td class="h-14">{{ item?.PlantSheet?.plant?.name }}</td>
					<td class="h-14">{{ formatDate(item?.seedlingDate) }}</td>
					<td class="h-14">{{ formatDate(item?.plantingDate) }}</td>
					<td class="h-14">{{ formatDate(item?.harvestDate) }}</td>
					<td class="h-14">{{ formatDate(item?.unloadDate) }}</td>
					<td class="h-14">{{ item?.CropArea?.name }}</td>
					<td class="h-14">{{ item?.totalPopulation }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

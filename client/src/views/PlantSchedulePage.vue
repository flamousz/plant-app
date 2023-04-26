<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { usePlantScheduleStore } from "../stores/plantschedule";
import { useItemStore } from "../stores/item";
import { useCropAreaStore } from "../stores/cropArea";
import BlueButton from "../components/Buttons/BlueButton.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

export default {
	name: "PlantSchedulePage",
	data() {
		return {
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
	components: { BlueButton },
};
</script>

<template>
	<pre>{{ itemsData.filterDate }}</pre>
	<div class="bg-blue-100 p-4 w-full h-screen flex flex-col static">
		<div class="z-40 fixed bottom-6 right-7 flex opacity-50 hover:opacity-90">
			<RouterLink to="/categoryform"
				><BlueButton :type="'button'" :text="'+ Schedule'"
			/></RouterLink>
		</div>
		<div class="flex flex-row justify-between items-start gap-2 mb-2">
			<div class="flex flex-row gap-2">
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
						<div >
							<select v-model="itemsData.filterDate" >
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
					@click.prevent="this.$router.push(`/categorydetail/${item.id}`)"
					:key="item.id"
				>
					<td class="h-14">
						{{ index + 1 }}
					</td>
					<td class="h-14">{{ item?.PlantSheet.plant.name }}</td>
					<td class="h-14">{{ formatDate(item?.seedlingDate) }}</td>
					<td class="h-14">{{ formatDate(item?.plantingDate) }}</td>
					<td class="h-14">{{ formatDate(item?.harvestDate) }}</td>
					<td class="h-14">{{ formatDate(item?.unloadDate) }}</td>
					<td class="h-14">{{ item?.CropArea.name }}</td>
					<td class="h-14">{{ item?.totalPopulation }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

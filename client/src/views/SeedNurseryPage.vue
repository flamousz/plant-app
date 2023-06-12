<script>
import { mapActions, mapState } from "pinia";
import { useSeedStore } from "../stores/seed";
import { useSeedNurseryStore } from "../stores/seedNursery";
import { useCsvStore } from "../stores/csv";
import ExportButton from "../components/Buttons/ExportButton.vue";

/**
 * No	Plant	Date	Block	HST	Task	Duration	Fixed Duration	
Work Time
Start
Finish
Employee	Status

// udshf 239uhksd iwdhf92hiu soz03h ihuxcv iuhwe4857 iuhds1038 iuhznqui 9328 

please modify the code to add new property with name 'employees' and the value of property with typeof string  based on iteration od each index EmployeeTaskPlantsheettaskScheduleConjunctions property with value EmployeeTaskPlantsheettaskScheduleConjunctions[i].employeecon.empl

The new code adds the 'employees' property to each item in the 'modifiedVal' array. It iterates over the 'EmployeeTaskPlantsheettaskScheduleConjunctions' array of each item using the map function. For each conjunction, it retrieves the value of 'employeecon.empl' and adds it to the 'employees' array. Finally, it applies a filter to keep only the values of type 'string'.

Make sure to uncomment the line // this.postExportTaskMaster(this.modifiedData); if you want to call the postExportTaskMaster function with the modified data.

I hope this modification helps! Let me know if you have any further questions.

sometime EmployeeTaskPlantsheettaskScheduleConjunctions is empty array please handle that case too
 */


export default {
	name: "SeedNurseryPage",
	data() {
		return {
			modifiedData: [],
			itemsData: {
				id: null,
				SeedId: null,
			},
		};
	},
	methods: {
		...mapActions(useSeedNurseryStore, [
			"fetchSeedNursery",
			"patchSeedNursery",
		]),
		...mapActions(useCsvStore, ["postExportTaskMaster"]),
		...mapActions(useSeedStore, ["fetchSeed"]),
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
		localPostExport(val) {
			const modifiedVal = val.map((item) => {
				const modifiedItem = { ...item };
				//  optional chaining 
				modifiedItem['plantName'] = modifiedItem['PlantSchedule']?.PlantSheet?.plant?.name;

				Object.keys(modifiedItem).forEach((key) => {
					if (key === "Item") {
						modifiedItem["seedBrand"] = modifiedItem[key].name;
						delete modifiedItem[key];
					} else if (
						typeof modifiedItem[key] === "object" &&
						modifiedItem[key] !== null &&
						"name" in modifiedItem[key]
					) {
						modifiedItem[key] = modifiedItem[key].name;
					}
				});
				
				modifiedItem["seedlingDate"] = modifiedItem["PlantSchedule"]?.seedlingDate
					? this.formatDate(modifiedItem["PlantSchedule"].seedlingDate)
					: undefined;

				modifiedItem["plantingDate"] = modifiedItem["PlantSchedule"]?.plantingDate
					? this.formatDate(modifiedItem["PlantSchedule"].plantingDate)
					: undefined;

				
				
				delete modifiedItem['PlantSchedule']
				delete modifiedItem['SeedId']
				return modifiedItem;
			});

			this.modifiedData = modifiedVal;
			this.postExportTaskMaster(this.modifiedData);
		},
	},
	computed: {
		...mapState(useSeedNurseryStore, ["seedNursery"]),
		...mapState(useSeedStore, ["seed"]),
	},
	created() {
		this.fetchSeedNursery();
		this.fetchSeed();
	},
	components: { ExportButton },
};
</script>

<template>
	<!-- <div class="flex flex-row gap-3">
		<pre>{{ seedNursery }}</pre>
		<pre>{{ modifiedData }}</pre>
	</div> -->

	<section
		id="seed-nursery-full-page"
		class="bg-blue-100 p-4 w-full flex flex-col"
	>
		<div class="flex flex-row justify-between items-center">
			<div @click.prevent="localPostExport(seedNursery)">
				<ExportButton />
			</div>
		</div>
		<table class="w-full">
			<thead
				class="bg-gray-400 h-10 whitespace-nowrap border-b-2 tracking-wide text-center border-gray-700"
			>
				<tr class="rounded-t-3xl">
					<th class="rounded-tl-md w-2">No</th>
					<th class="w-10">Name</th>
					<th class="w-10">Code</th>
					<th class="w-10">Seedling Date</th>
					<th class="w-10">Planting Date</th>
					<th class="w-10">Seed Brand</th>
				</tr>
			</thead>
			<tbody
				class="bg-slate-100 text-center tracking-wider divide-y divide-gray-600"
			>
				<tr
					class="whitespace-nowrap hover:bg-slate-200"
					v-for="(item, index) in seedNursery"
					:key="item.id"
				>
					<td class="h-14">
						{{ index + 1 }}
					</td>
					<td
						class="h-14"
						@click.prevent="this.$router.push(`/seednursery/${item.id}`)"
					>
						{{ item?.PlantSchedule.PlantSheet.plant.name }}
					</td>
					<td class="h-14">{{ item?.PlantSchedule.code }}</td>
					<td class="h-14">
						{{ formatDate(item?.PlantSchedule?.seedlingDate) }}
					</td>
					<td class="h-14">
						{{ formatDate(item?.PlantSchedule?.plantingDate) }}
					</td>
					<td v-if="item.SeedId" class="h-14">
						{{ item.Item.name }} - {{ item.Item.description }}
					</td>
					<td
						v-if="!item.SeedId"
						class="h-14 flex flex-row gap-2 justify-center items-center"
					>
						<select id="seed-option" v-model="itemsData.SeedId">
							<option
								v-for="item in seed"
								:key="item.id"
								:value="item.id"
							>
								{{ item.name }} - {{ item.description }}
							</option>
						</select>
						<button
							@click.prevent="
								patchSeedNursery(item.id, itemsData.SeedId)
							"
							class="border-2 border-black rounded-md h-[35px] px-2 bg-red-300 hover:bg-red-400 active:bg-red-500"
						>
							submit
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
	<!-- <pre>{{ seedNursery }}</pre>
	<pre>{{ seed }}</pre> -->
</template>

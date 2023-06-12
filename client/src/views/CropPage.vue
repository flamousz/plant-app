<script >
import { mapActions, mapState, mapWritableState } from "pinia";
import TableRowCrop from "../components/TableRow/TableRowCrop.vue";
import { useCropStore } from "../stores/crop";
import BlueButton from "../components/Buttons/BlueButton.vue";
import { useCsvStore } from "../stores/csv";
import ExportButton from "../components/Buttons/ExportButton.vue";

export default {
	data() {
		return {
			modifiedItem: [],
		};
	},
	name: "CropPage",
	methods: {
		...mapActions(useCropStore, ["fetchCrop"]),
		...mapActions(useCsvStore, ["postExportTaskMaster"]),
		queryAction(value) {
			this.query = {
				filter: value,
			};
			this.fetchCrop();
		},
		/*
			but before deleting property with typof array 
		*/
		localPostExport(val) {
			// const modifiedVal = val.map((item) => {
			// 	const modifiedItem = { ...item };
			// 	Object.keys(modifiedItem).forEach((key) => {
			// 		if (
			// 			typeof modifiedItem[key] === "object" &&
			// 			modifiedItem[key] !== null
			// 		) {
			// 			if (Array.isArray(modifiedItem[key])) {
			// 				// Create a new index based on the length of fertilizerConjunctions
			// 				modifiedItem[key] = modifiedItem[key].map((subItem) => {
			// 					const modifiedSubItem = { ...subItem };
			// 					if ("Item" in modifiedSubItem) {
			// 						modifiedSubItem.Item = { ...modifiedSubItem.Item };
			// 						modifiedSubItem.Item["newIndex"] =
			// 							modifiedSubItem.Item.name.length;
			// 					}
			// 					return modifiedSubItem;
			// 				});
			// 			} else if ("name" in modifiedItem[key]) {
			// 				modifiedItem[key] = modifiedItem[key].name;
			// 			}
			// 		}
			// 	});
			// 	return modifiedItem;
			// });
			let multipliedVal = [];
			val.forEach((obj) => {
				const fertilizerCount = obj.fertilizerConjunctions.length;
				const pesticideCount = obj.PesticideConjunctions.length;
				const materialCount = obj.materialConjunctions.length;
				const taskCount = obj.PlantsheetTaskConjunctions.length;
				const maxCount = Math.max(
					fertilizerCount,
					pesticideCount,
					materialCount,
					taskCount
				);

				for (let i = 0; i < maxCount; i++) {
					const modifiedItem = {
						id: i === 0 ? obj.id : "",
						plant: i === 0 ? obj.plant.name : "",
						seedlingAge: i === 0 ? obj.seedlingAge : "",
						harvestAge: i === 0 ? obj.harvestAge : "",
						harvestTime: i === 0 ? obj.harvestTime : "",
						cropAge: i === 0 ? obj.cropAge : "",
						cropProdWeight: i === 0 ? obj.cropProdWeight : "",
						status: i === 0 ? obj.status : "",
						arcStatus: i === 0 ? obj.arcStatus : "",
						plantPerMetre: i === 0 ? obj.plantPerMetre : "",
						fallacyNursery: i === 0 ? obj.fallacyNursery : "",
						PlantType: i === 0 ? obj.PlantType.name : "",
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
					};

					if (i < taskCount) {
						const taskConjunction = obj.PlantsheetTaskConjunctions[i];
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
					if (i < fertilizerCount) {
						const fertilizerConjunction = obj.fertilizerConjunctions[i];
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
						const pesticideConjunction = obj.PesticideConjunctions[i];
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
						const materialConjunction = obj.materialConjunctions[i];
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
					delete modifiedItem.fertilizerConjunctions;
					delete modifiedItem.PesticideConjunctions;
					multipliedVal.push(modifiedItem);
				}
			});

			this.modifiedItem = multipliedVal;
			this.postExportTaskMaster(this.modifiedItem);
		},
	},
	computed: {
		...mapState(useCropStore, ["crop"]),
		...mapWritableState(useCropStore, ["query"]),
	},
	created() {
		this.fetchCrop();
	},
	components: { TableRowCrop, BlueButton, ExportButton },
};
</script>

<template>
	<!-- <div class="flex flex-row">
		<pre>{{ crop }}</pre>
		<pre>modifiedItem{{ modifiedItem }}</pre>
	</div> -->
	<div class="z-40 fixed bottom-4 opacity-50 hover:opacity-90 right-6 flex">
		<RouterLink to="/formplantsheet"
			><BlueButton :type="'button'" :text="'NEW CROP'"
		/></RouterLink>
	</div>
	<div class="bg-blue-100 p-4 w-full">
		<div class="overflow-auto rounded-lg shadow">
			<div class="flex flex-row justify-between items-center">
				<div @click.prevent="localPostExport(crop)">
					<ExportButton />
				</div>
				<div class="flex flex-row justify-end items-end gap-3 pr-1 mb-2">
					<div class="flex flex-row gap-1">
						<button
							:class="{
								'bg-red-500': query.filter === 'archived',
								'text-red-100': query.filter === 'archived',
							}"
							@click.prevent="queryAction('archived')"
							class="border border-black p-1 w-[100%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100 bg-red-100"
						>
							Archived
						</button>
					</div>
					<div class="flex flex-row gap-1">
						<button
							:class="{
								'bg-red-500': query.filter === 'avail',
								'text-red-100': query.filter === 'avail',
							}"
							@click.prevent="queryAction('avail')"
							class="border border-black p-1 w-[100%] h-[5%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100 bg-red-100"
						>
							Available
						</button>
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
						<th class="w-10">Seedling Age</th>
						<th class="w-10">Harvest Age</th>
						<th class="w-10">Harvest Time</th>
						<th class="w-10">Crop Age</th>
						<th class="w-10">Crop Production Weight</th>
						<th class="w-10">Status</th>
						<th class="w-10">Type</th>
					</tr>
				</thead>
				<tbody
					class="bg-slate-100 text-center tracking-wider divide-y divide-gray-600"
				>
					<TableRowCrop
						v-for="(item, index) in crop"
						:key="item.id"
						:item="item"
						:index="index"
					/>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { usePlantScheduleStore } from "../stores/plantschedule";

export default {
	name: "PlantSchedulePage",
	methods: {
		...mapActions(usePlantScheduleStore, ["fetchPlantSchedules"]),
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
	},
	computed: {
		...mapState(usePlantScheduleStore, ["plantSchedules"]),
	},
	created() {
		this.fetchPlantSchedules();
	},
};
</script>

<template>
	<!-- <pre>{{ plantSchedules }}</pre> -->
	<div class="bg-blue-100 p-4 w-full h-full flex flex-col static">
		<div class="z-40 fixed bottom-6 right-7 flex opacity-50 hover:opacity-90">
			<RouterLink to="/categoryform"
				><BlueButton :type="'button'" :text="'+ Schedule'"
			/></RouterLink>
		</div>
		<div class="flex flex-row justify-between items-end gap-2 mb-2">
			<div class="flex flex-row gap-2">
				<div class="flex flex-row gap-1">
					<div>Location:</div>
					<div>
						<select @change="queryAction('filter', itemsData.status)">
							<option value="" disabled selected>
								--Select Location--
							</option>
							<option value="avail">Available</option>
							<option value="archived">Archived</option>
						</select>
					</div>
				</div>
				<div class="flex flex-row gap-1">
					<div>Date:</div>
					<div>
						<select @change="queryAction('filter', itemsData.status)">
							<option value="" disabled selected>--Select Date--</option>
							<option value="avail">Available</option>
							<option value="archived">Archived</option>
						</select>
					</div>
				</div>
			</div>
			<div class="flex flex-row gap-1">
				<div>Plant:</div>
				<div>
					<select @change="queryAction('filter', itemsData.status)">
						<option value="" disabled selected>---Select Plant---</option>
						<option value="avail">Available</option>
						<option value="archived">Archived</option>
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
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useSeedStore } from "../stores/seed";
import { useSeedNurseryStore } from "../stores/seedNursery";

export default {
	name: "SeedNurseryPage",
	data() {
		return {
			itemsData: {
				id: null,
				SeedId: null,
			},
		};
	},
	methods: {
		...mapActions(useSeedNurseryStore, ['fetchSeedNursery', 'patchSeedNursery']),
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
	},
	computed: {
		...mapState(useSeedNurseryStore, ["seedNursery"]),
		...mapState(useSeedStore, ["seed"]),
	},
	created() {
		this.fetchSeedNursery();
		this.fetchSeed();
	},
};
</script>

<template>
	<section
		id="seed-nursery-full-page"
		class="bg-blue-100 p-4 w-full flex flex-col"
	>
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
					<td class="h-14">
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
					<td v-if="!item.SeedId" class="h-14">
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
						>
							submit
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
	<pre>{{ seedNursery }}</pre>
	<pre>{{ seed }}</pre>
</template>

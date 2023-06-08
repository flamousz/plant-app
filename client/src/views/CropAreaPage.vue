<script>
import { mapActions, mapWritableState, mapState } from "pinia";
import { useCropAreaStore } from "../stores/cropArea";
import BlueButton from "../components/Buttons/BlueButton.vue";
import { useCsvStore } from "../stores/csv";
import ExportButton from "../components/Buttons/ExportButton.vue";

export default {
	name: "CropAreaPage",
	data() {
		return {
			itemsData: {
				status: null,
			},
			pageSize: 8,
			currentPage: 1,
			queries: {
				filter: "",
				search: "",
				page: 1,
			},
		};
	},
	methods: {
		...mapActions(useCropAreaStore, ["fetchCropArea"]),
		...mapActions(useCsvStore, ['postExportTaskMaster']),
		getDisplayedPageNumbers() {
			const maxDisplayedPages = 3;
			let startPage = this.currentPage - Math.floor(maxDisplayedPages / 2);
			if (startPage < 1) {
				startPage = 1;
			}
			let endPage = startPage + maxDisplayedPages - 1;
			if (endPage > this.allpage) {
				endPage = this.allpage;
				startPage = endPage - maxDisplayedPages + 1;
				if (startPage < 1) {
					startPage = 1;
				}
			}
			let displayedPages = [];
			for (let i = startPage; i <= endPage; i++) {
				displayedPages.push(i);
			}
			console.log(displayedPages,'<< ini');
			console.log(startPage,'<< ini startPage');
			console.log(endPage,'<< ini endPage');
			return displayedPages;
		},
		queryAction(params, val) {
			console.log(params, val, "ini query action");
			if (params === "filter") {
				this.queries.page = 1;
				this.queries.filter = val;
			}
			if (params === "page") {
				console.log(params, "masuk ke if params page");
				this.currentPage = val;
				this.queries.page = val;
			}
			if (params === "search") {
				this.queries.page = 1;
				this.queries.search = val;
			}
			this.query = {
				filter: this.queries.filter,
				page: this.queries.page,
				search: this.queries.search,
			};
			this.fetchCropArea();
		},
	},
	computed: {
		...mapWritableState(useCropAreaStore, ["query"]),
		...mapState(useCropAreaStore, ["cropArea", "allpage"]),
	},
	created() {
		this.fetchCropArea();
	},
	components: { BlueButton, ExportButton },
};
</script>

<template>
	<!-- <pre>{{ cropArea }}</pre> -->
	<div class="bg-blue-100 p-4 w-full flex flex-col">
		<div class="z-40 fixed flex bottom-3 right-8">
			<RouterLink to="/croparea/form"
				><BlueButton :type="'button'" :text="'NEW AREA'"
			/></RouterLink>
		</div>
		<div class="flex flex-row justify-between items-center">
			<div @click.prevent="postExportTaskMaster(cropArea)">
				<ExportButton/>
			</div>
			<div class="flex flex-row gap-1">
				<div>Status:</div>
				<div>
					<select
						v-model="itemsData.status"
						@change="queryAction('filter', itemsData.status)"
					>
						<option value="" disabled>---Select Status---</option>
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
					<th class="w-10">Area</th>
					<th class="w-10">Type</th>
					<th class="w-10">Status</th>
				</tr>
			</thead>
			<tbody
				class="bg-slate-100 text-center tracking-wider divide-y divide-gray-600"
			>
				<tr
					class="whitespace-nowrap hover:bg-slate-200"
					@click.prevent="this.$router.push(`/croparea/detail/${item.id}`)"
					v-for="(item, index) in cropArea"
					:key="item.id"
				>
					<td class="h-14">
						{{ (currentPage - 1) * pageSize + index + 1 }}
					</td>
					<td class="h-14">{{ item?.name }}</td>
					<td class="h-14">{{ item?.area }}</td>
					<td class="h-14">{{ item?.type }}</td>
					<td class="h-14">{{ item?.arcStatus }}</td>
				</tr>
			</tbody>
		</table>
		<div>
			<ul class="flex flex-row justify-center gap-3 items-center my-2">
				<li>
					<a
						@click.prevent="queryAction('page', currentPage - 1)"
						href="#"
						class="active:text-red-300 hover:text-red-400 focus:text-red-600"
						>Prev</a
					>
				</li>
				<li
					v-for="pageNumber in getDisplayedPageNumbers()"
					:key="pageNumber"
				>
					<a
						@click.prevent="queryAction('page', pageNumber)"
						href="#"
						:class="{
							'text-red-500 font-bold': currentPage === pageNumber,
						}"
						class="active:text-red-300 hover:text-red-400 focus:text-red-600"
						>{{ pageNumber }}</a
					>
				</li>
				<li>
					<a
						@click.prevent="queryAction('page', currentPage + 1)"
						href="#"
						class="active:text-red-300 hover:text-red-400 focus:text-red-600"
						>Next</a
					>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useItemStore } from "../stores/item";
import BlueButton from "../components/Buttons/BlueButton.vue";
import ExportButton from "../components/Buttons/ExportButton.vue";
import { useCsvStore } from "../stores/csv";

export default {
	name: "ItemPage",
	data() {
		return {
			modifiedData: [],
			itemsData: {
				category: null,
				status: null,
			},
			pageSize: 8,
			currentPage: 1,
			queries: {
				filter: "",
				filterStatus: "",
				search: "",
				page: 1,
			},
		};
	},
	methods: {
		...mapActions(useCsvStore, ["postExportTaskMaster"]),
		...mapActions(useItemStore, ["fetchItem", "fetchCategory"]),
		localPostExport(val) {
			const modifiedVal = val.map((item) => {
				const modifiedItem = { ...item };
				Object.keys(modifiedItem).forEach((key) => {
					if (
						typeof modifiedItem[key] === "object" &&
						modifiedItem[key] !== null &&
						"name" in modifiedItem[key]
					) {
						modifiedItem[key] = modifiedItem[key].name;
					}
				});
				return modifiedItem;
			});
			this.modifiedData = modifiedVal
			this.postExportTaskMaster(this.modifiedData);
		},
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
			return displayedPages;
		},
		queryAction(params, val) {
			console.log(params, val, "ini query action");
			if (params === "filter") {
				this.queries.page = 1;
				this.queries.filter = val;
			}
			if (params === "filterStatus") {
				this.queries.page = 1;
				this.queries.filterStatus = val;
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
				filterStatus: this.queries.filterStatus,
				page: this.queries.page,
				search: this.queries.search,
			};
			this.fetchItem();
		},
	},
	computed: {
		...mapState(useItemStore, ["items", "allpage", "categories"]),
		...mapWritableState(useItemStore, ["query"]),
	},
	created() {
		this.fetchItem();
		this.fetchCategory();
		console.log(this.query, "<< query");
	},
	components: { BlueButton, ExportButton },
};
</script>

<template>
	<!-- <pre>{{ categories }}</pre> -->
	<!-- <pre>{{ itemsData.category }}</pre> -->
	<div class="bg-blue-100 p-4 w-full flex flex-col">
		<div class="z-40 fixed bottom-7 opacity-40 hover:opacity-90 right-8 flex">
			<RouterLink to="/item/form"
				><BlueButton :type="'button'" :text="'NEW ITEM'"
			/></RouterLink>
		</div>
		<div class="flex flex-row justify-between items-center">
			<div @click.prevent="localPostExport(items)">
				<ExportButton />
			</div>
			<div class="flex flex-row justify-end items-end gap-2 mb-2">
				<div class="flex flex-row gap-1">
					<div>Category:</div>
					<div>
						<select
							v-model="itemsData.category"
							@change="queryAction('filter', itemsData.category)"
						>
							<option value="" disabled selected class="text-gray-400">
								---Select Category---
							</option>
							<option
								v-for="item in categories"
								:key="item.id"
								:value="item.id"
							>
								{{ item.name }}
							</option>
						</select>
					</div>
				</div>
				<div class="flex flex-row gap-1">
					<div>Status:</div>
					<div>
						<select
							v-model="itemsData.status"
							@change="queryAction('filterStatus', itemsData.status)"
						>
							<option value="" disabled>---Select Status---</option>
							<option value="avail">Available</option>
							<option value="archived">Archived</option>
						</select>
					</div>
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
					<th class="w-10">Code</th>
					<th class="w-10">Description</th>
					<th class="w-10">Category</th>
					<th class="w-10">Status</th>
				</tr>
			</thead>
			<tbody
				class="bg-slate-100 text-center tracking-wider divide-y divide-gray-600"
			>
				<tr
					class="whitespace-nowrap hover:bg-slate-200"
					@click.prevent="this.$router.push(`/item/detail/${item.id}`)"
					v-for="(item, index) in items"
					:key="item.id"
				>
					<td class="h-14">
						{{ (currentPage - 1) * pageSize + index + 1 }}
					</td>
					<td class="h-14">{{ item?.name }}</td>
					<td class="h-14">{{ item?.code }}</td>
					<td class="h-14">{{ item?.description }}</td>
					<td class="h-14">{{ item?.Category?.name }}</td>
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

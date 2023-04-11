<script>
import { mapActions, mapState } from "pinia";
import RedButton from "../Buttons/RedButton.vue";
import TableRow4Colum from "../TableRow/TableRow4Colum.vue";
import { useCropStore } from "../../stores/crop";
import { useItemStore } from "../../stores/item";
import GreenButton from "../Buttons/GreenButton.vue";

export default {
	name: "FormPlantSheet",
	data() {
		return {
			activeTab: "",
			cropData: {
				plantid: "",
				seedlingAge: "",
				harvestAge: "",
				harvestTime: "",
				cropAge: "",
				cropProdWeight: "",
				planttypeid: "",
				id: "",
				materials: [
					{
						materialid: 0,
						dose: 0,
					},
				],
				fertilizers: [
					{
						fertilizerid: 0,
						dose: 0,
					},
				],
				pesticides: [
					{
						pesticideid: 0,
						dose: null,
					},
				],
				seeds: [
					{
						seedid: [],
					},
				],
			},
		};
	},
	methods: {
		...mapActions(useCropStore, ["postCrop"]),
		...mapActions(useItemStore, [
			"fetchPlant",
			"fetchPlantType",
			"fetchMaterial",
			"fetchFertilizer",
			"fetchSeed",
			"fetchPesticide",
		]),
		handlePutorPost() {
			if (this.editFlag === true) {
				this.putCrop(this.cropData);
			} else if (this.editFlag === false) {
				this.postCrop(this.cropData);
			}
		},
		buttonSelector(value) {
			this.activeTab = value;
		},
		pesticideDoseInputHandler(e, i) {
			this.cropData.pesticides[i].dose = e;
		},
		pesticideInputHandler(e, i) {
			this.cropData.pesticides[i].pesticideid = e;
		},
		addPesticideColumn() {
			this.cropData.pesticides.push({
				pesticideid: 0,
				dose: null,
			});
		},
	},
	computed: {
		...mapState(useCropStore, ["editFlag"]),
		...mapState(useItemStore, [
			"plants",
			"plantTypes",
			"materials",
			"fertilizers",
			"seeds",
			"pesticides",
		]),
	},
	created() {
		this.fetchSeed();
		this.fetchFertilizer();
		this.fetchMaterial();
		this.fetchPlant();
		this.fetchPlantType();
		this.fetchPesticide();
	},
	components: { RedButton, TableRow4Colum, GreenButton },
};
</script>

<template>
	<pre>{{ cropData.pesticides }}</pre>
	<section class="w-full">
		<form @submit.prevent="handlePutorPost">
			<div class="flex flex-col px-10">
				<div class="flex flex-row h-[100px] justify-between mb-3">
					<div class="flex flex-row w-[50%]">
						<div
							class="w-[22%] flex justify-start items-end text-5xl font-bold"
						>
							Plant:
						</div>
						<div
							class="w-[40%] flex justify-start items-end text-xl font-semibold"
						>
							<!-- disini -->
							<select
								v-model="cropData.plantid"
								class="h-auto w-auto bg-yellow-200 rounded-md"
							>
								<option value="" disabled>Enter Plant Name here</option>
								<option
									v-for="item in plants"
									:key="item.id"
									:value="item.id"
								>
									{{ item.name }}
								</option>
							</select>
						</div>
					</div>

					<div class="flex gap-3 flex-row items-end">
						<GreenButton :type="'submit'" :text="'Submit'" />
						<RouterLink to="/crop">
							<button
								class="bg-[#c52b2b] rounded flex hover:bg-red-900 justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px]"
							>
								Cancel
							</button>
						</RouterLink>
					</div>
				</div>
				<div class="h-[180px] flex flex-row border-2 border-black">
					<div
						class="w-[33.3333333%] bg-yellow-500 border-black border-[3px] rounded-lg m-3 flex flex-col justify-center items-center gap-2"
					>
						<div
							class="flex flex-row gap-2 justify-end items-end w-[90%]"
						>
							<div
								class="flex flex-row border-2 bg-yellow-300 gap-2 border-black pl-3 rounded-lg w-[100%]"
							>
								<div class="text-xl font-bold">Seedling Age :</div>
								<div class="text-base font-semibold w-[40%]">
									<input
										id="seedlingAge"
										class="placeholder:text-xs w-[100%] text-center hover:bg-yellow-400 rounded-md bg-yellow-300"
										placeholder="Seedling Age ...."
										name="seedlingAge"
										type="number"
										v-model="cropData.seedlingAge"
									/>
								</div>
							</div>
						</div>

						<div
							class="flex flex-row gap-2 border-2 bg-yellow-300 border-black pl-3 rounded-lg w-[90%]"
						>
							<div class="text-xl font-bold w-[41%]">Harvest Age :</div>
							<div class="text-base font-semibold w-[40%]">
								<input
									id="harvestAge"
									class="placeholder:text-xs w-[100%] text-center hover:bg-yellow-400 rounded-md bg-yellow-300"
									placeholder="Harvest Age ...."
									name="harvestAge"
									type="number"
									v-model="cropData.harvestAge"
								/>
							</div>
						</div>
					</div>
					<div
						class="w-[33.3333333%] bg-yellow-500 border-black border-[3px] rounded-lg m-3 flex flex-col justify-center items-center gap-2"
					>
						<div
							class="flex flex-row gap-2 border-2 bg-yellow-300 border-black pl-3 rounded-lg w-[80%]"
						>
							<div class="text-xl font-bold">Harvest Time :</div>
							<div class="text-base font-semibold w-[40%]">
								<input
									id="harvestTime"
									class="placeholder:text-xs w-[100%] text-center hover:bg-yellow-400 rounded-md bg-yellow-300"
									placeholder="Harvest Time ...."
									name="harvestTime"
									type="number"
									v-model="cropData.harvestTime"
								/>
							</div>
						</div>
						<div
							class="flex flex-row gap-2 border-2 bg-yellow-300 border-black pl-3 rounded-lg w-[80%]"
						>
							<div class="text-xl font-bold w-[46.5%]">Crop Age :</div>
							<div class="text-base font-semibold w-[40%]">
								<input
									id="cropAge"
									class="placeholder:text-xs w-[100%] text-center hover:bg-yellow-400 rounded-md bg-yellow-300"
									placeholder="Crop Age ...."
									name="cropAge"
									type="number"
									v-model="cropData.cropAge"
								/>
							</div>
						</div>
					</div>
					<div
						class="w-[33.3333333%] bg-yellow-500 border-black border-[3px] rounded-lg m-3 flex flex-col justify-center items-center gap-2"
					>
						<div
							class="flex flex-col border-2 bg-yellow-300 border-black pl-3 rounded-lg w-[80%]"
						>
							<div class="text-xl font-bold">
								Production Weight per Plant :
							</div>
							<div class="text-base font-semibold w-[55%]">
								<input
									id="cropProdWeight"
									class="placeholder:text-xs w-[100%] hover:bg-yellow-400 rounded-md bg-yellow-300"
									placeholder="Crop Production Weight..."
									name="cropProdWeight"
									type="number"
									v-model="cropData.cropProdWeight"
								/>
							</div>
						</div>
						<div
							class="flex flex-row gap-2 border-2 bg-yellow-300 border-black pl-3 rounded-lg w-[80%]"
						>
							<div class="text-xl font-bold">Plant Type :</div>
							<select
								v-model="cropData.planttypeid"
								class="h-auto w-auto bg-yellow-300 hover:bg-yellow-400 rounded-md"
							>
								<option value="" disabled>Enter type here</option>
								<option
									v-for="item in plantTypes"
									:key="item.id"
									:value="item.id"
								>
									{{ item.name }}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="flex flex-col mt-3">
					<div class="flex flex-row w-full gap-2">
						<button
							@click.prevent="buttonSelector('pesticides')"
							type="button"
							class="border active:bg-red-300 hover:bg-red-400 focus:bg-red-500 border-black p-1 w-[7%] text-center rounded-md focus:text-red-100"
						>
							Pesticides
						</button>
						<button
							@click.prevent="buttonSelector('fertilizers')"
							type="button"
							class="border border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100"
						>
							Fertilizers
						</button>
						<button
							@click.prevent="buttonSelector('materials')"
							type="button"
							class="border border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100"
						>
							Materials
						</button>
						<button
							@click.prevent="buttonSelector('seeds')"
							type="button"
							class="border border-black p-1 w-[7%] text-center rounded-md active:bg-red-300 hover:bg-red-400 focus:bg-red-500 focus:text-red-100"
						>
							Seeds
						</button>
					</div>
					<div class="pt-2">
						<div
							v-if="activeTab === 'fertilizers'"
							class="bg-yellow-400 w-[90%] flex flex-col"
						></div>
						<div
							v-if="activeTab === 'pesticides'"
							class="w-[90%] flex flex-col"
						>
							<table>
								<thead>
									<tr class="flex flex-row w-full bg-red-600">
										<th
											class="w-[22%] bg-slate-400 border-black border"
										>
											Name
										</th>
										<th
											class="w-[10%] bg-green-600 border-y border-black"
										>
											Dose
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(el, index) in cropData.pesticides" class="w-full  bg-slate-500">
										<td  class="w-[80%] bg-red-400">
											<select
												v-model="el.pesticideid"
												@change="
													pesticideInputHandler(
														el.pesticideid,
														index
													)
												"
												class="w-[22%] bg-yellow-200 rounded-md flex flex-col"
											>
												<option value="" disabled selected>
													Enter Insectide Pesticide here
												</option>
												<option
													v-for="item in pesticides"
													:key="item.id"
													:value="item.id"
												>
													{{ item.name }}
												</option>
											</select>
										</td>
										<td class="w-[40%] bg-green-400">
											<input
												id="dose"
												type="number"
												v-model="el.dose"
												@change="
													pesticideDoseInputHandler(el.dose, index)
												"
												placeholder="Input Dose here ..."
												class=" text-sm text-center "
											/>
										</td>
									</tr>
								</tbody>
							</table>
							<button
								class="bg-red-500 w-[10%] rounded"
								@click.prevent="addPesticideColumn"
							>
								add
							</button>
						</div>
						<div
							v-if="activeTab === 'materials'"
							class="bg-yellow-400 w-[90%] flex flex-col"
						></div>
						<div
							v-if="activeTab === 'seeds'"
							class="bg-yellow-400 w-[90%] flex flex-col"
						></div>
					</div>
				</div>
			</div>
		</form>
	</section>
</template>

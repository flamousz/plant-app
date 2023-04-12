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
				materialConjunctions: [
					{
						materialid: 0,
						dose: null,
					},
				],
				fertilizerConjunctions: [
					{
						fertilizerid: 0,
						dose: null,
					},
				],
				PesticideConjunctions: [
					{
						pesticideid: 0,
						dose: null,
					},
				],
				SeedConjunctions: [
					{
						seedid: 0,
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
		materialInputHandler(e, i, field) {
			this.cropData.materialConjunctions[i][field] = e;
		},
		fertilizerInputHandler(e, i, field) {
			this.cropData.fertilizerConjunctions[i][field] = e;
		},
		pesticideDoseInputHandler(e, i) {
			this.cropData.PesticideConjunctions[i].dose = e;
		},
		pesticideInputHandler(e, i) {
			this.cropData.PesticideConjunctions[i].pesticideid = e;
		},
		seedInputHandler(e, i) {
			this.cropData.SeedConjunctions[i].seedid = e;
		},
		addSeedColumn() {
			this.cropData.SeedConjunctions.push({
				seedid: 0,
			});
		},
		addPesticideColumn() {
			this.cropData.PesticideConjunctions.push({
				pesticideid: 0,
				dose: null,
			});
		},
		addMaterialColumn() {
			this.cropData.materialConjunctions.push({
				materialid: 0,
				dose: null,
			});
		},
		addFertilizerColumn() {
			this.cropData.fertilizerConjunctions.push({
				fertilizerid: 0,
				dose: null,
			});
		},
	},
	computed: {
		...mapState(useCropStore, ["editFlag", 'cropDetail']),
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

		if (this.editFlag === true) {
			this.cropData.plantid = this.cropDetail.plantid
			this.cropData.seedlingAge = this.cropDetail.seedlingAge
			this.cropData.harvestAge = this.cropDetail.harvestAge
			this.cropData.harvestTime = this.cropDetail.harvestTime
			this.cropData.cropAge = this.cropDetail.cropAge
			this.cropData.id = this.cropDetail.id
			this.cropData.cropProdWeight = this.cropDetail.cropProdWeight
			this.cropData.planttypeid = this.cropDetail.planttypeid
			this.cropData.materialConjunctions = this.cropDetail.materialConjunctions
			this.cropData.fertilizerConjunctions = this.cropDetail.fertilizerConjunctions
			this.cropData.PesticideConjunctions = this.cropDetail.PesticideConjunctions
			this.cropData.SeedConjunctions = this.cropDetail.SeedConjunctions


		}
	},
	components: { RedButton, TableRow4Colum, GreenButton },
};
</script>

<template>
	<!-- <pre>{{ editFlag }}</pre> -->
	<!-- <pre>{{ cropDetail }}</pre> -->
	
	<section class="w-full bg-slate-100">
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
									step="0.01"
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
							class="w-[90%] flex flex-col gap-2"
						>
							<div>
								<div class="flex flex-row w-full">
									<div class="w-[13%] text-center border-black border">
										Name
									</div>
									<div class="w-[12%] border border-black text-center">
										Dose
									</div>
								</div>
								<div
									v-for="(el, index) in cropData.fertilizerConjunctions"
									class="w-full flex flex-row"
								>
									<div class="w-[13%] border border-black">
										<select
											v-model="el.fertilizerid"
											@change="
												fertilizerInputHandler(
													el.fertilizerid,
													index,
													'fertilizerid'
												)
											"
											class="bg-yellow-200 hover:bg-yellow-300 rounded-md h-full flex flex-col"
										>
											<option value="" disabled selected>
												Enter Material here
											</option>
											<option
												class="text-center"
												v-for="item in fertilizers"
												:key="item.id"
												:value="item.id"
											>
												{{ item.name }}
											</option>
										</select>
									</div>
									<div class="w-[12%]">
										<input
											id="dose"
											type="number"
											step="0.01"
											v-model="el.dose"
											@change="
												fertilizerInputHandler(
													el.dose,
													index,
													'dose'
												)
											"
											placeholder="Input Dose here ..."
											class="text-sm text-center h-full w-full bg-yellow-200 border border-black hover:bg-yellow-300"
										/>
									</div>
								</div>
							</div>
							<button
								class="bg-red-500 w-[10%] h-full rounded tracking-wide text-slate-200 text-sm hover:bg-red-800"
								@click.prevent="addFertilizerColumn"
							>
								<span class="text-2xl font-extrabold">+</span>
								Fertilizer
							</button>
						</div>
						<div
							v-if="activeTab === 'pesticides'"
							class="w-[90%] flex flex-col gap-2"
						>
							<div>
								<div class="flex flex-row w-full">
									<div class="w-[13%] text-center border-black border">
										Name
									</div>
									<div class="w-[12%] border border-black text-center">
										Dose
									</div>
								</div>
								<div
									v-for="(el, index) in cropData.PesticideConjunctions"
									class="w-full flex flex-row"
								>
									<div class="w-[13%] border border-black">
										<select
											v-model="el.pesticideid"
											@change="
												pesticideInputHandler(el.pesticideid, index)
											"
											class="bg-yellow-200 hover:bg-yellow-300 rounded-md h-full flex flex-col"
										>
											<option value="" disabled selected>
												Enter Insectide Pesticide here
											</option>
											<option
												class="text-center"
												v-for="item in pesticides"
												:key="item.id"
												:value="item.id"
											>
												{{ item.name }}
											</option>
										</select>
									</div>
									<div class="w-[12%]">
										<input
											id="dose"
											type="number"
											step="0.01"
											v-model="el.dose"
											@change="
												pesticideDoseInputHandler(el.dose, index)
											"
											placeholder="Input Dose here ..."
											class="text-sm text-center h-full w-full bg-yellow-200 border border-black hover:bg-yellow-300"
										/>
									</div>
								</div>
							</div>
							<button
								class="bg-red-500 w-[10%] h-full rounded tracking-wide text-slate-200 text-sm hover:bg-red-800"
								@click.prevent="addPesticideColumn"
							>
								<span class="text-2xl font-extrabold">+</span> Pesticide
							</button>
						</div>
						<div
							v-if="activeTab === 'materials'"
							class="w-[90%] flex flex-col gap-2"
						>
							<div>
								<div class="flex flex-row w-full">
									<div class="w-[13%] text-center border-black border">
										Name
									</div>
									<div class="w-[12%] border border-black text-center">
										Dose
									</div>
								</div>
								<div
									v-for="(el, index) in cropData.materialConjunctions"
									class="w-full flex flex-row"
								>
									<div class="w-[13%] border border-black">
										<select
											v-model="el.materialid"
											@change="
												materialInputHandler(
													el.materialid,
													index,
													'materialid'
												)
											"
											class="bg-yellow-200 hover:bg-yellow-300 rounded-md h-full flex flex-col"
										>
											<option value="" disabled selected>
												Enter Material here
											</option>
											<option
												class="text-center"
												v-for="item in materials"
												:key="item.id"
												:value="item.id"
											>
												{{ item.name }}
											</option>
										</select>
									</div>
									<div class="w-[12%]">
										<input
											id="dose"
											type="number"
											step="0.01"
											v-model="el.dose"
											@change="
												materialInputHandler(el.dose, index, 'dose')
											"
											placeholder="Input Dose here ..."
											class="text-sm text-center h-full w-full bg-yellow-200 border border-black hover:bg-yellow-300"
										/>
									</div>
								</div>
							</div>
							<button
								class="bg-red-500 w-[10%] h-full rounded tracking-wide text-slate-200 text-sm hover:bg-red-800"
								@click.prevent="addMaterialColumn"
							>
								<span class="text-2xl font-extrabold">+</span> Material
							</button>
						</div>
						<div
							v-if="activeTab === 'seeds'"
							class=" w-[90%] flex flex-col gap-2"
						>
							<div>
								<div class="flex flex-row w-full">
									<div class="w-[13%] text-center border-black border">
										Name
									</div>
								</div>
								<div
									v-for="(el, index) in cropData.SeedConjunctions"
									class="w-full flex flex-row"
								>
									<div class="w-[13%] border border-black">
										<select
											v-model="el.seedid"
											@change="
												seedInputHandler(
													el.seedid,
													index
												)
											"
											class="bg-yellow-200 hover:bg-yellow-300 rounded-md h-full flex flex-col w-full"
										>
											<option value="" disabled selected>
												Enter Seed here
											</option>
											<option
												class="text-center"
												v-for="item in seeds"
												:key="item.id"
												:value="item.id"
											>
												{{ item.name }}
											</option>
										</select>
									</div>
								</div>
							</div>
							<button
								class="bg-red-500 w-[10%] h-full rounded tracking-wide text-slate-200 text-sm hover:bg-red-800"
								@click.prevent="addSeedColumn"
							>
								<span class="text-2xl font-extrabold">+</span> Seed
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
		<pre>{{ cropData }}</pre>
	</section>
</template>

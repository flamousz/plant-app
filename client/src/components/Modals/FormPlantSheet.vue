<script>
import { mapActions, mapState } from "pinia";
import RedButton from "../Buttons/RedButton.vue";
import TableRow4Colum from "../TableRow/TableRow4Colum.vue";
import { useCropStore } from "../../stores/crop";
import { useItemStore } from "../../stores/item";
import { useUserStore } from "../../stores/user";
import GreenButton from "../Buttons/GreenButton.vue";
import BlueButton from "../Buttons/BlueButton.vue";

export default {
	name: "FormPlantSheet",
	data() {
		return {
			activeTab: "pesticidesNursery",
			cropData: {
				plantid: "",
				seedlingAge: "",
				harvestAge: "",
				harvestTime: "",
				cropAge: "",
				cropProdWeight: "",
				planttypeid: "",
				id: "",
				status: "",
				materialConjunctions: [
					{
						materialid: 0,
						dose: null,
					},
				],
				materialConjunctionsNursery: [
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
				fertilizerConjunctionsNursery: [
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
				PesticideConjunctionsNursery: [
					{
						pesticideid: 0,
						dose: null,
					},
				],
			},
		};
	},
	methods: {
		...mapActions(useCropStore, ["postCrop", "putCrop"]),
		...mapActions(useItemStore, [
			"fetchPlant",
			"fetchPlantType",
			"fetchMaterial",
			"fetchFertilizer",
			"fetchPesticide",
		]),
		handleDeletedConjunctions(key, index, suffix = "") {
			this.cropData[`${key}Conjunctions${suffix}`].splice(index, 1);
		},
		handlePutorPost() {
			if (this.editFlag) {
				this.putCrop(this.cropData);
			} else if (!this.editFlag) {
				this.postCrop(this.cropData);
			}
		},
		handleStatus(value) {
			this.cropData.status = value;
		},
		buttonSelector(value) {
			this.activeTab = value;
		},
		addColumn(array, propName) {
			array.push({
				[propName]: 0,
				dose: null,
			});
		},
	},
	computed: {
		...mapState(useCropStore, ["editFlag", "cropDetail"]),
		...mapState(useItemStore, [
			"plants",
			"plantTypes",
			"materials",
			"fertilizers",
			"pesticides",
		]),
		...mapState(useUserStore, ["role"]),
	},
	created() {
		this.fetchFertilizer();
		this.fetchMaterial();
		this.fetchPlant();
		this.fetchPlantType();
		this.fetchPesticide();

		if (this.editFlag === true) {
			this.cropData.plantid = this.cropDetail.plantid;
			this.cropData.seedlingAge = this.cropDetail.seedlingAge;
			this.cropData.harvestAge = this.cropDetail.harvestAge;
			this.cropData.harvestTime = this.cropDetail.harvestTime;
			this.cropData.cropAge = this.cropDetail.cropAge;
			this.cropData.id = this.cropDetail.id;
			this.cropData.cropProdWeight = this.cropDetail.cropProdWeight;
			this.cropData.planttypeid = this.cropDetail.planttypeid;
			this.cropData.materialConjunctions =
				this.cropDetail.materialConjunctions;
			this.cropData.fertilizerConjunctions =
				this.cropDetail.fertilizerConjunctions;
			this.cropData.PesticideConjunctions =
				this.cropDetail.PesticideConjunctions;
			this.cropData.status = this.cropDetail.status;
		}
	},
	components: { RedButton, TableRow4Colum, GreenButton, BlueButton },
};
</script>

<template>
	<!-- <pre>{{ cropDetail }}</pre>
	<pre>{{ role }}</pre> -->
	<!-- <pre>{{ editFlag }}</pre> -->
	<section class="w-full bg-slate-100">
		<form @submit.prevent="handlePutorPost">
			<div class="flex flex-col px-10">
				<div
					class="w-full flex justify-end items-end pt-4"
					v-if="editFlag === true"
				>
					<div class="text-2xl font-bold w-[8%]">STATUS:</div>
					<div
						class="w-[6%] border-[3px] rounded-md border-slate-800 bg-yellow-300 font-semibold text-center tracking-wide"
					>
						{{ cropDetail.status }}
					</div>
				</div>
				<div class="flex flex-row h-[50px] justify-between mb-3">
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
						<div @click="handleStatus('confirm')">
							<BlueButton
								:type="'submit'"
								:text="'Confirm'"
								v-if="role !== 'super' && editFlag === true"
							/>
						</div>
						<div @click="handleStatus('draft')">
							<GreenButton
								:type="'submit'"
								:text="'Draft'"
								v-if="role !== 'super' && editFlag === true"
							/>
						</div>
						<GreenButton
							:type="'submit'"
							:text="'Submit'"
							v-if="role === 'super' || editFlag === false"
						/>

						<button
							class="bg-red-500 rounded flex hover:bg-red-900 justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px]"
							@click.prevent="
								this.$router.push(`/detailplant/${cropDetail.id}`)
							"
							v-if="editFlag === true"
						>
							Cancel
						</button>
						<RouterLink to="/crop">
							<button
								class="bg-red-500 rounded flex hover:bg-red-900 justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px]"
								v-if="editFlag === false"
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
				<section
					id="conjunction-tables"
					class="flex flex-row mt-3 justify-between items-end h-[300px]"
				>
					<div
						id="nursery-conjunction "
						class="flex flex-col w-[50%] h-full overflow-auto border-2 rounded-tl-md border-black"
					>
						<div
							class="flex justify-center items-center border-b-2 border-black p-1"
						>
							<h3 class="text-2xl font-semibold">Nursery</h3>
						</div>
						<div class="p-1">
							<section
								id="breadcrumbs"
								class="flex flex-row w-full gap-2"
							>
								<button
									@click.prevent="buttonSelector('pesticidesNursery')"
									type="button"
									:class="{
										'bg-red-500': activeTab === 'pesticidesNursery',
										'text-red-100': activeTab === 'pesticidesNursery',
									}"
									class="border active:bg-red-300 hover:bg-red-400 border-black p-1 w-[13%] text-center rounded-md"
								>
									Pesticides
								</button>
								<button
									@click.prevent="buttonSelector('fertilizersNursery')"
									type="button"
									:class="{
										'bg-red-500': activeTab === 'fertilizersNursery',
										'text-red-100':
											activeTab === 'fertilizersNursery',
									}"
									class="border border-black p-1 w-[13%] text-center rounded-md active:bg-red-300 hover:bg-red-400"
								>
									Fertilizers
								</button>
								<button
									@click.prevent="buttonSelector('materialsNursery')"
									type="button"
									:class="{
										'bg-red-500': activeTab === 'materialsNursery',
										'text-red-100': activeTab === 'materialsNursery',
									}"
									class="border border-black p-1 w-[13%] text-center rounded-md active:bg-red-300 hover:bg-red-400"
								>
									Materials
								</button>
							</section>
							<section id="table-form" class="pt-2">
								<div
									v-if="activeTab === 'fertilizersNursery'"
									class="w-[90%] flex flex-col gap-2"
								>
									<div>
										<div class="flex flex-row w-full">
											<div
												class="w-[41.5%] text-center border-black border"
											>
												Name
											</div>
											<div
												class="w-[14%] border border-black text-center"
											>
												Dose
											</div>
											<div
												class="w-[12%] border border-black text-center"
											>
												Action
											</div>
										</div>
										<div
											v-for="(
												el, index
											) in cropData.fertilizerConjunctionsNursery"
											class="w-full flex flex-row"
										>
											<div class="w-[41.5%] border border-black">
												<select
													v-model="el.fertilizerid"
													class="bg-yellow-200 hover:bg-yellow-300 rounded-md h-full flex flex-col"
												>
													<option value="" disabled>
														Enter here ..
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
											<div class="w-[14%]">
												<input
													id="dose"
													type="number"
													step="0.01"
													v-model="el.dose"
													placeholder="Input Dose here ..."
													class="text-sm text-center h-full w-full bg-yellow-200 border border-black hover:bg-yellow-300"
												/>
											</div>
											<div
												class="w-[12%] border border-black flex flex-col justify-center items-center bg-yellow-200"
											>
												<button
													class="bg-red-500 w-[85%] rounded text-slate-200 tracking-wide font-semibold text-center text-sm hover:bg-red-800"
													@click.prevent="
														handleDeletedConjunctions(
															'fertilizer',
															index,
															'Nursery'
														)
													"
												>
													DELETE
												</button>
											</div>
										</div>
									</div>
									<button
										class="bg-red-500 w-[15%] h-full rounded text-slate-200 text-sm hover:bg-red-800"
										@click.prevent="
											addColumn(
												this.cropData.fertilizerConjunctionsNursery,
												'fertilizerid'
											)
										"
									>
										<span class="text-2xl font-extrabold">+</span>
										Fertilizer
									</button>
								</div>
								<div
									v-if="activeTab === 'pesticidesNursery'"
									class="w-[90%] flex flex-col gap-2"
								>
									<div>
										<div class="flex flex-row w-full">
											<div
												class="w-[19%] text-center border-black border"
											>
												Name
											</div>
											<div
												class="w-[14%] border border-black text-center"
											>
												Dose
											</div>
											<div
												class="w-[12%] border border-black text-center"
											>
												Action
											</div>
										</div>
										<div
											v-for="(
												el, index
											) in cropData.PesticideConjunctionsNursery"
											class="w-full flex flex-row"
										>
											<div class="w-[19%] border border-black">
												<select
													v-model="el.pesticideid"
													class="bg-yellow-200 hover:bg-yellow-300 rounded-md h-full w-[100%] flex flex-col"
												>
													<option value="" disabled selected>
														Enter here
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
											<div class="w-[14%]">
												<input
													id="dose"
													type="number"
													step="0.01"
													v-model="el.dose"
													placeholder="Input Dose here ..."
													class="text-sm text-center h-full w-full bg-yellow-200 border border-black hover:bg-yellow-300"
												/>
											</div>
											<div
												class="w-[12%] border border-black flex flex-col justify-center items-center bg-yellow-200"
											>
												<button
													class="bg-red-500 w-[85%] rounded text-slate-200 tracking-wide font-semibold text-center text-sm hover:bg-red-800"
													@click.prevent="
														handleDeletedConjunctions(
															'Pesticide',
															index,
															'Nursery'
														)
													"
												>
													DELETE
												</button>
											</div>
										</div>
									</div>
									<button
										class="bg-red-500 w-[15%] h-full rounded text-slate-200 text-sm hover:bg-red-800"
										@click.prevent="
											addColumn(
												this.cropData.PesticideConjunctionsNursery,
												'pesticideid'
											)
										"
									>
										<span class="text-2xl font-extrabold">+</span>
										Pesticide
									</button>
								</div>
								<div
									v-if="activeTab === 'materialsNursery'"
									class="w-[90%] flex flex-col gap-2"
								>
									<div>
										<div class="flex flex-row w-full">
											<div
												class="w-[18%] text-center border-black border"
											>
												Name
											</div>
											<div
												class="w-[14%] border border-black text-center"
											>
												Dose
											</div>
											<div
												class="w-[12%] border border-black text-center"
											>
												Action
											</div>
										</div>
										<div
											v-for="(
												el, index
											) in cropData.materialConjunctionsNursery"
											class="w-full flex flex-row"
										>
											<div class="w-[18%] border border-black">
												<select
													v-model="el.materialid"
													class="bg-yellow-200 hover:bg-yellow-300 w-full rounded-md h-full flex flex-col"
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
											<div class="w-[14%]">
												<input
													id="dose"
													type="number"
													step="0.01"
													v-model="el.dose"
													placeholder="Input Dose here ..."
													class="text-sm text-center h-full w-full bg-yellow-200 border border-black hover:bg-yellow-300"
												/>
											</div>
											<div
												class="w-[12%] border border-black flex flex-col justify-center items-center bg-yellow-200"
											>
												<button
													class="bg-red-500 w-[85%] rounded text-slate-200 tracking-wide font-semibold text-center text-sm hover:bg-red-800"
													@click.prevent="
														handleDeletedConjunctions(
															'material',
															index,
															'Nursery'
														)
													"
												>
													DELETE
												</button>
											</div>
										</div>
									</div>
									<button
										class="bg-red-500 w-[15%] h-full rounded text-slate-200 text-sm hover:bg-red-800"
										@click.prevent="
											addColumn(
												this.cropData.materialConjunctionsNursery,
												'materialid'
											)
										"
									>
										<span class="text-2xl font-extrabold">+</span>
										Material
									</button>
								</div>
							</section>
						</div>
					</div>
					<div
						id="planting-conjunction"
						class="flex w-[50%] flex-col h-full border-t-2 border-r-2 border-b-2 border-black"
					>
						<div
							class="flex justify-center items-center border-b-2 border-black p-1"
						>
							<h3 class="text-2xl font-semibold">Plant</h3>
						</div>
						<div class="p-1">
							<section
								id="breadcrumbs"
								class="flex flex-row w-full gap-2"
							>
								<button
									@click.prevent="buttonSelector('pesticides')"
									type="button"
									:class="{
										'bg-red-500': activeTab === 'pesticides',
										'text-red-100': activeTab === 'pesticides',
									}"
									class="border hover:bg-red-400 active:bg-red-300 border-black p-1 w-[13%] text-center rounded-md"
								>
									Pesticides
								</button>
								<button
									@click.prevent="buttonSelector('fertilizers')"
									type="button"
									:class="{
										'bg-red-500': activeTab === 'fertilizers',
										'text-red-100': activeTab === 'fertilizers',
									}"
									class="border border-black p-1 w-[13%] text-center rounded-md active:bg-red-300 hover:bg-red-400"
								>
									Fertilizers
								</button>
								<button
									@click.prevent="buttonSelector('materials')"
									type="button"
									:class="{
										'bg-red-500': activeTab === 'materials',
										'text-red-100': activeTab === 'materials',
									}"
									class="border border-black p-1 w-[13%] text-center rounded-md active:bg-red-300 hover:bg-red-400"
								>
									Materials
								</button>
							</section>
							<section id="table-form" class="pt-2">
								<div
									v-if="activeTab === 'fertilizers'"
									class="w-[90%] flex flex-col gap-2"
								>
									<div>
										<div class="flex flex-row w-full">
											<div
												class="w-[41.5%] text-center border-black border"
											>
												Name
											</div>
											<div
												class="w-[14%] border border-black text-center"
											>
												Dose
											</div>
											<div
												class="w-[12%] border border-black text-center"
											>
												Action
											</div>
										</div>
										<div
											v-for="(
												el, index
											) in cropData.fertilizerConjunctions"
											class="w-full flex flex-row"
										>
											<div class="w-[41.5%] border border-black">
												<select
													v-model="el.fertilizerid"
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
											<div class="w-[14%]">
												<input
													id="dose"
													type="number"
													step="0.01"
													v-model="el.dose"
													placeholder="Input Dose here ..."
													class="text-sm text-center h-full w-full bg-yellow-200 border border-black hover:bg-yellow-300"
												/>
											</div>
											<div
												class="w-[12%] border border-black flex flex-col justify-center items-center bg-yellow-200"
											>
												<button
													class="bg-red-500 w-[85%] rounded text-slate-200 tracking-wide font-semibold text-center text-sm hover:bg-red-800"
													@click.prevent="
														handleDeletedConjunctions(
															'fertilizer',
															index
														)
													"
												>
													DELETE
												</button>
											</div>
										</div>
									</div>
									<button
										class="bg-red-500 w-[15%] h-full rounded text-slate-200 text-sm hover:bg-red-800"
										@click.prevent="
											addColumn(
												this.cropData.fertilizerConjunctions,
												'fertilizerid'
											)
										"
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
											<div
												class="w-[19%] text-center border-black border"
											>
												Name
											</div>
											<div
												class="w-[14%] border border-black text-center"
											>
												Dose
											</div>
											<div
												class="w-[12%] border border-black text-center"
											>
												Action
											</div>
										</div>
										<div
											v-for="(
												el, index
											) in cropData.PesticideConjunctions"
											class="w-full flex flex-row"
										>
											<div class="w-[19%] border border-black">
												<select
													v-model="el.pesticideid"
													class="bg-yellow-200 hover:bg-yellow-300 rounded-md h-full w-[100%] flex flex-col"
												>
													<option value="" disabled selected>
														Enter here
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
											<div class="w-[14%]">
												<input
													id="dose"
													type="number"
													step="0.01"
													v-model="el.dose"
													placeholder="Input Dose here ..."
													class="text-sm text-center h-full w-full bg-yellow-200 border border-black hover:bg-yellow-300"
												/>
											</div>
											<div
												class="w-[12%] border border-black flex flex-col justify-center items-center bg-yellow-200"
											>
												<button
													class="bg-red-500 w-[85%] rounded text-slate-200 tracking-wide font-semibold text-center text-sm hover:bg-red-800"
													@click.prevent="
														handleDeletedConjunctions(
															'Pesticide',
															index
														)
													"
												>
													DELETE
												</button>
											</div>
										</div>
									</div>
									<button
										class="bg-red-500 w-[15%] h-full rounded text-slate-200 text-sm hover:bg-red-800"
										@click.prevent="
											addColumn(
												this.cropData.PesticideConjunctions,
												'pesticideid'
											)
										"
									>
										<span class="text-2xl font-extrabold">+</span>
										Pesticide
									</button>
								</div>
								<div
									v-if="activeTab === 'materials'"
									class="w-[90%] flex flex-col gap-2"
								>
									<div>
										<div class="flex flex-row w-full">
											<div
												class="w-[18%] text-center border-black border"
											>
												Name
											</div>
											<div
												class="w-[14%] border border-black text-center"
											>
												Dose
											</div>
											<div
												class="w-[12%] border border-black text-center"
											>
												Action
											</div>
										</div>
										<div
											v-for="(
												el, index
											) in cropData.materialConjunctions"
											class="w-full flex flex-row"
										>
											<div class="w-[18%] border border-black">
												<select
													v-model="el.materialid"
													class="bg-yellow-200 hover:bg-yellow-300 w-full rounded-md h-full flex flex-col"
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
											<div class="w-[14%]">
												<input
													id="dose"
													type="number"
													step="0.01"
													v-model="el.dose"
													placeholder="Input Dose here ..."
													class="text-sm text-center h-full w-full bg-yellow-200 border border-black hover:bg-yellow-300"
												/>
											</div>
											<div
												class="w-[12%] border border-black flex flex-col justify-center items-center bg-yellow-200"
											>
												<button
													class="bg-red-500 w-[85%] rounded text-slate-200 tracking-wide font-semibold text-center text-sm hover:bg-red-800"
													@click.prevent="
														handleDeletedConjunctions(
															'material',
															index
														)
													"
												>
													DELETE
												</button>
											</div>
										</div>
									</div>
									<button
										class="bg-red-500 w-[15%] h-full rounded text-slate-200 text-sm hover:bg-red-800"
										@click.prevent="
											addColumn(
												this.cropData.materialConjunctions,
												'materialid'
											)
										"
									>
										<span class="text-2xl font-extrabold">+</span>
										Material
									</button>
								</div>
							</section>
						</div>
					</div>
				</section>
			</div>
		</form>
		<!-- <pre>{{ cropData }}</pre> -->
	</section>
	<!-- <pre>{{ cropData }}</pre> -->
</template>

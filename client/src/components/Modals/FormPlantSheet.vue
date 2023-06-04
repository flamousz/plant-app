<script>
import { mapActions, mapState } from "pinia";
import RedButton from "../Buttons/RedButton.vue";
import TableRow4Colum from "../TableRow/TableRow4Colum.vue";
import { useCropStore } from "../../stores/crop";
import { useItemStore } from "../../stores/item";
import { useUserStore } from "../../stores/user";
import GreenButton from "../Buttons/GreenButton.vue";
import BlueButton from "../Buttons/BlueButton.vue";
import { useTaskStore } from "../../stores/task";

export default {
	name: "FormPlantSheet",
	data() {
		return {
			activeTab: "pesticidesNursery",
			activeTabPlanting: "pesticides",
			cropData: {
				fertilizerConjunctionsNursery: [
					{
						fertilizerid: 0,
						name: "",
					},
				],
				plantsheetTaskConjunctions: [
					{
						TaskId: null,
						ItemId: null,
						day: "",
						description: "",
					},
				],
				plantsheetTaskPlantingConjunctions: [
					{
						TaskId: null,
						ItemId: null,
						day: "",
						description: "",
					},
				],
				plantsheetTaskProcessingConjunctions: [
					{
						TaskId: null,
						ItemId: null,
						day: 1,
						description: "processing",
					},
				],
				plantid: "",
				seedlingAge: "",
				harvestAge: "",
				harvestTime: "",
				cropAge: "",
				cropProdWeight: "",
				planttypeid: "",
				id: "",
				status: "",
				fallacyNursery: "",
				plantPerMetre: "",

				materialConjunctions: [
					{
						materialid: 0,
						name: "",
					},
				],
				materialConjunctionsNursery: [
					{
						materialid: 0,
						name: "",
					},
				],
				fertilizerConjunctions: [
					{
						fertilizerid: 0,
						name: "",
					},
				],
				PesticideConjunctions: [
					{
						pesticideid: 0,
						name: "",
					},
				],
				PesticideConjunctionsNursery: [
					{
						pesticideid: 0,
						name: "",
					},
				],
			},
		};
	},
	watch: {
		"cropData.plantsheetTaskPlantingConjunctions": {
			handler(newVal) {
				newVal.forEach((el, index) => {
					el.day = index + 1;
					el.description = "hst";
				});
			},
			deep: true,
		},
		"cropData.plantsheetTaskConjunctions": {
			handler(newVal) {
				newVal.forEach((el, index) => {
					el.day = index + 1;
					el.description = "hss";
				});
			},
			deep: true,
		},
		"cropData.PesticideConjunctions": {
			deep: true,
			handler(newVal) {
				for (const el of newVal) {
					const pesticide = this.pesticides.find(
						(item) => item.id === el.pesticideid
					);
					el.name = pesticide ? pesticide.name : "";
				}
			},
		},
		"cropData.PesticideConjunctionsNursery": {
			deep: true,
			handler(newVal) {
				for (const el of newVal) {
					const pesticide = this.pesticides.find(
						(item) => item.id === el.pesticideid
					);
					el.name = pesticide ? pesticide.name : "";
				}
			},
		},
		"cropData.fertilizerConjunctions": {
			deep: true,
			handler(newVal) {
				for (const el of newVal) {
					const fertilizer = this.fertilizers.find(
						(item) => item.id === el.fertilizerid
					);
					el.name = fertilizer ? fertilizer.name : "";
				}
			},
		},
		"cropData.fertilizerConjunctionsNursery": {
			deep: true,
			handler(newVal) {
				for (const el of newVal) {
					const fertilizer = this.fertilizers.find(
						(item) => item.id === el.fertilizerid
					);
					el.name = fertilizer ? fertilizer.name : "";
				}
			},
		},
		"cropData.materialConjunctionsNursery": {
			deep: true,
			handler(newVal) {
				for (const el of newVal) {
					const material = this.materials.find(
						(item) => item.id === el.materialid
					);
					el.name = material ? material.name : "";
				}
			},
		},
		"cropData.materialConjunctions": {
			deep: true,
			handler(newVal) {
				for (const el of newVal) {
					const material = this.materials.find(
						(item) => item.id === el.materialid
					);
					el.name = material ? material.name : "";
				}
			},
		},
		"cropData.cropAge"(newValue) {
			const currentLength =
				this.cropData.plantsheetTaskPlantingConjunctions.length;
			if (currentLength < newValue) {
				const diff = newValue - currentLength + 1;
				for (let i = 0; i < diff; i++) {
					this.addColumn(
						this.cropData.plantsheetTaskPlantingConjunctions,
						"TaskId",
						"ItemId"
					);
				}
			} else if (currentLength > newValue) {
				this.cropData.plantsheetTaskPlantingConjunctions.splice(newValue);
			}
		},
		"cropData.seedlingAge"(newValue) {
			const currentLength = this.cropData.plantsheetTaskConjunctions.length;
			if (currentLength < newValue) {
				const diff = newValue - currentLength;
				for (let i = 0; i < diff; i++) {
					this.addColumn(
						this.cropData.plantsheetTaskConjunctions,
						"TaskId",
						"ItemId"
					);
				}
			} else if (currentLength > newValue) {
				this.cropData.plantsheetTaskConjunctions.splice(newValue);
			}
		},
		tasks: {
			deep: true,
			handler(newVal, oldVal) {
				// Trigger the update of taskDetails whenever tasks change
				this.$nextTick(() => {
					console.log("Tasks changed:", this.taskDetails);
				});
			},
		},
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
		...mapActions(useTaskStore, ["fetchBasicTasks"]),
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
		buttonSelectorPlanting(value) {
			this.activeTabPlanting = value;
		},
		addColumn(array, propName, prop2, prop3) {
			if (
				array === this.cropData.plantsheetTaskConjunctions ||
				array === this.cropData.plantsheetTaskPlantingConjunctions
			) {
				array.push({
					[propName]: null,
					[prop2]: null,
				});
			} else if (
				array === this.cropData.plantsheetTaskProcessingConjunctions
			) {
				array.push({
					[propName]: null,
					[prop2]: null,
					day: this.cropData.plantsheetTaskProcessingConjunctions.length+1,
					description: "processing",
				});
			} else {
				array.push({
					[propName]: null,
				});
			}
		},
	},
	computed: {
		taskDetails() {
			return this.cropData.plantsheetTaskConjunctions.map((el) => {
				const task = this.tasks.find((t) => t.id === el.TaskId);
				return {
					taskId: el.TaskId,
					description: task ? task.description : "",
				};
			});
		},
		taskPlantingDetails() {
			return this.cropData.plantsheetTaskPlantingConjunctions.map((el) => {
				const task = this.tasks.find((t) => t.id === el.TaskId);
				return {
					taskId: el.TaskId,
					description: task ? task.description : "",
				};
			});
		},
		taskProcessingDetails() {
			return this.cropData.plantsheetTaskProcessingConjunctions.map((el) => {
				const task = this.tasks.find((t) => t.id === el.TaskId);
				return {
					taskId: el.TaskId,
					description: task ? task.description : "",
				};
			});
		},
		...mapState(useCropStore, ["editFlag", "cropDetail"]),
		...mapState(useTaskStore, ["tasks"]),
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
		this.fetchBasicTasks();
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
	<!-- <pre>{{ cropData.plantsheetTaskProcessingConjunctions.length }}</pre> -->
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
								class="flex flex-row border-2 bg-yellow-300 gap-2 border-black px-3 py-1 justify-between rounded-lg w-[100%]"
							>
								<div class="text-sm font-bold">Seedling Age :</div>
								<div
									class="font-semibold w-[40%] flex flex-row text-sm"
								>
									<input
										id="seedlingAge"
										class="placeholder:text-xl w-[100%] text-center hover:bg-yellow-400 rounded-md bg-yellow-300"
										placeholder="........"
										name="seedlingAge"
										type="number"
										v-model="cropData.seedlingAge"
									/>
									<p>Day</p>
								</div>
							</div>
							<div
								class="flex flex-row border-2 bg-yellow-300 gap-2 border-black px-3 py-1 justify-between rounded-lg w-[100%]"
							>
								<div class="text-sm font-bold">Fallacy Nursery :</div>
								<div
									class="text-sm font-semibold w-[33%] flex flex-row"
								>
									<input
										id="fallacyNursery"
										class="placeholder:text-xl w-[100%] text-center hover:bg-yellow-400 rounded-md bg-yellow-300"
										placeholder="........"
										name="fallacyNursery"
										type="number"
										v-model="cropData.fallacyNursery"
									/>
									<p>%</p>
								</div>
							</div>
						</div>
						<div
							class="flex flex-row gap-2 justify-end items-end w-[90%]"
						>
							<div
								class="flex flex-row border-2 bg-yellow-300 gap-2 border-black px-3 py-1 justify-between rounded-lg w-[100%]"
							>
								<div class="text-sm font-bold">Harvest Age :</div>
								<div
									class="font-semibold w-[40%] flex flex-row text-sm"
								>
									<input
										id="harvestAge"
										class="placeholder:text-xl w-[100%] text-center hover:bg-yellow-400 rounded-md bg-yellow-300"
										placeholder="........"
										name="harvestAge"
										type="number"
										v-model="cropData.harvestAge"
									/>
									<p>Day</p>
								</div>
							</div>
							<div
								class="flex flex-row border-2 bg-yellow-300 gap-2 border-black px-3 py-1 justify-between rounded-lg w-[100%]"
							>
								<div class="text-sm font-bold">Plant Per Metre :</div>
								<div
									class="text-sm font-semibold w-[31%] flex flex-row"
								>
									<input
										id="plantPerMetre"
										class="placeholder:text-xl w-[100%] text-center hover:bg-yellow-400 rounded-md bg-yellow-300"
										placeholder="........"
										name="plantPerMetre"
										type="number"
										v-model="cropData.plantPerMetre"
									/>
									<p>m<sup>2</sup></p>
								</div>
							</div>
						</div>
					</div>
					<div
						class="w-[33.3333333%] bg-yellow-500 border-black border-[3px] rounded-lg m-3 flex flex-col justify-center items-center gap-2"
					>
						<div
							class="flex flex-row gap-2 justify-between border-2 bg-yellow-300 border-black px-3 rounded-lg w-[80%]"
						>
							<div class="text-xl font-bold">Harvest Time :</div>
							<div class="text-base font-semibold w-[30%] flex flew-row">
								<input
									id="harvestTime"
									class="placeholder:text-xl w-[100%] text-center hover:bg-yellow-400 rounded-md bg-yellow-300"
									placeholder="........"
									name="harvestTime"
									type="number"
									v-model="cropData.harvestTime"
								/>
								<p>Day</p>
							</div>
						</div>
						<div
							class="flex flex-row gap-2 border-2 bg-yellow-300 border-black justify-between px-3 rounded-lg w-[80%]"
						>
							<div class="text-xl font-bold w-[46.5%]">Crop Age :</div>
							<div class="text-base font-semibold w-[30%] flex-row flex">
								<input
									id="cropAge"
									class="placeholder:text-xl w-[100%] text-center hover:bg-yellow-400 rounded-md bg-yellow-300"
									placeholder="........"
									name="cropAge"
									type="number"
									v-model="cropData.cropAge"
								/>
								<p>Day</p>
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
							<div
								class="text-base font-semibold w-[55%] flex flex-row gap-1"
							>
								<input
									id="cropProdWeight"
									class="placeholder:text-xl w-[30%] hover:bg-yellow-400 rounded-md bg-yellow-300"
									placeholder="........"
									name="cropProdWeight"
									step="0.01"
									type="number"
									v-model="cropData.cropProdWeight"
								/>
								<p>Kg</p>
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
							class="flex justify-center items-center border-b-2 border-black p-1 bg-yellow-500"
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
								<button
									@click.prevent="buttonSelector('taskNursery')"
									type="button"
									:class="{
										'bg-red-500': activeTab === 'taskNursery',
										'text-red-100': activeTab === 'taskNursery',
									}"
									class="border border-black p-1 w-[13%] text-center rounded-md active:bg-red-300 hover:bg-red-400"
								>
									Tasks
								</button>
							</section>
							<section id="table-form" class="pt-2">
								<div
									v-if="activeTab === 'taskNursery'"
									class="w-[90%] flex flex-col gap-2"
								>
									<div class="w-full">
										<div class="flex flex-row w-full">
											<div
												class="w-[8%] text-center border-black border"
											>
												HSS
											</div>
											<div
												class="w-[15%] border border-black text-center"
											>
												Task
											</div>
											<div
												class="w-[15%] border border-black text-center border-r-2"
											>
												Item
											</div>
										</div>
										<div
											v-for="(
												el, index
											) in cropData.plantsheetTaskConjunctions"
											class="w-[237px] flex flex-row"
										>
											<div
												class="w-[21%] text-center border border-black"
											>
												{{ index + 1 }}
											</div>
											<div
												class="w-[39.5%] border border-black flex flex-col"
											>
												<select
													v-model="el.TaskId"
													class="bg-yellow-200 hover:bg-yellow-300 rounded-md h-full flex flex-col"
												>
													<option value="" disabled>
														--select task--
													</option>
													<option
														v-for="task in tasks"
														:key="task.id"
														:value="task.id"
														class="text-center"
													>
														{{ task.name }}
													</option>
												</select>
											</div>
											<div
												class="w-[39.5%] border border-black flex flex-col"
											>
												<select
													v-model="el.ItemId"
													class="bg-yellow-200 hover:bg-yellow-300 rounded-md h-full flex flex-col"
												>
													<template
														v-if="
															taskDetails[index].description ===
															'pesticide'
														"
													>
														<option
															value=""
															class="text-center"
															disabled
														>
															--select pesticide--
														</option>
														<option
															v-for="pesticide in cropData.PesticideConjunctionsNursery"
															:key="pesticide.pesticideid"
															:value="pesticide.pesticideid"
															class="text-center"
														>
															{{ pesticide.name }}
														</option>
													</template>
													<template
														v-if="
															taskDetails[index].description ===
															'fertilizer'
														"
													>
														<option
															value=""
															class="text-center"
															disabled
														>
															--select fertilizer--
														</option>
														<option
															v-for="fertilizer in cropData.fertilizerConjunctionsNursery"
															:key="fertilizer.fertilizerid"
															:value="fertilizer.fertilizerid"
															class="text-center"
														>
															{{ fertilizer.name }}
														</option>
													</template>
													<template
														v-if="
															taskDetails[index].description ===
															'material'
														"
													>
														<option value="" disabled>
															--select material--
														</option>
														<option
															v-for="material in cropData.materialConjunctionsNursery"
															:key="material.materialid"
															:value="material.materialid"
															class="text-center"
														>
															{{ material.name }}
														</option>
													</template>
												</select>
											</div>
										</div>
									</div>
								</div>
								<div
									v-if="activeTab === 'fertilizersNursery'"
									class="w-[90%] flex flex-col gap-2"
								>
									<div>
										<div class="flex flex-row w-full">
											<div
												class="w-[37%] text-center border-black border"
											>
												Name
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
											<div class="w-[37%] border border-black">
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
							class="flex justify-center bg-yellow-500 items-center border-b-2 border-black p-1"
						>
							<h3 class="text-2xl font-semibold">Plant</h3>
						</div>
						<div class="p-1">
							<section
								id="breadcrumbs"
								class="flex flex-row w-full gap-2"
							>
								<button
									@click.prevent="buttonSelectorPlanting('pesticides')"
									type="button"
									:class="{
										'bg-red-500': activeTabPlanting === 'pesticides',
										'text-red-100':
											activeTabPlanting === 'pesticides',
									}"
									class="border hover:bg-red-400 active:bg-red-300 border-black p-1 w-[13%] text-center rounded-md"
								>
									Pesticides
								</button>
								<button
									@click.prevent="
										buttonSelectorPlanting('fertilizers')
									"
									type="button"
									:class="{
										'bg-red-500': activeTabPlanting === 'fertilizers',
										'text-red-100':
											activeTabPlanting === 'fertilizers',
									}"
									class="border border-black p-1 w-[13%] text-center rounded-md active:bg-red-300 hover:bg-red-400"
								>
									Fertilizers
								</button>
								<button
									@click.prevent="buttonSelectorPlanting('materials')"
									type="button"
									:class="{
										'bg-red-500': activeTabPlanting === 'materials',
										'text-red-100': activeTabPlanting === 'materials',
									}"
									class="border border-black p-1 w-[13%] text-center rounded-md active:bg-red-300 hover:bg-red-400"
								>
									Materials
								</button>
								<button
									@click.prevent="buttonSelectorPlanting('tasks')"
									type="button"
									:class="{
										'bg-red-500': activeTabPlanting === 'tasks',
										'text-red-100': activeTabPlanting === 'tasks',
									}"
									class="border border-black p-1 w-[13%] text-center rounded-md active:bg-red-300 hover:bg-red-400"
								>
									Tasks
								</button>
								<button
									@click.prevent="
										buttonSelectorPlanting('areaProcessing')
									"
									type="button"
									:class="{
										'bg-red-500':
											activeTabPlanting === 'areaProcessing',
										'text-red-100':
											activeTabPlanting === 'areaProcessing',
									}"
									class="border border-black p-1 w-[20%] text-center rounded-md active:bg-red-300 hover:bg-red-400"
								>
									Area Processing
								</button>
							</section>
							<section id="table-form" class="pt-2">
								<div
									v-if="activeTabPlanting === 'areaProcessing'"
									class="w-[90%] flex flex-col gap-2"
								>
									<div class="w-full">
										<div class="flex flex-row w-full">
											<div
												class="w-[8%] text-center border-black border"
											>
												Day
											</div>
											<div
												class="w-[15%] border border-black text-center"
											>
												Task
											</div>
											<div
												class="w-[15%] border border-black text-center border-r-2"
											>
												Item
											</div>
										</div>
										<div
											v-for="(
												el, index
											) in cropData.plantsheetTaskProcessingConjunctions"
											class="w-[237px] flex flex-row"
										>
											<div
												class="w-[21%] text-center border border-black"
											>
												{{ index + 1 }}
											</div>
											<div
												class="w-[39.5%] border border-black flex flex-col"
											>
												<select
													v-model="el.TaskId"
													class="bg-yellow-200 hover:bg-yellow-300 rounded-md h-full flex flex-col"
												>
													<option value="" disabled>
														--select task--
													</option>
													<option
														v-for="task in tasks"
														:key="task.id"
														:value="task.id"
														class="text-center"
													>
														{{ task.name }}
													</option>
												</select>
											</div>
											<div
												class="w-[39.5%] border border-black flex flex-col"
											>
												<select
													v-model="el.ItemId"
													class="bg-yellow-200 hover:bg-yellow-300 rounded-md h-full flex flex-col"
												>
													<template
														v-if="
															taskProcessingDetails[index]
																.description === 'pesticide'
														"
													>
														<option
															value=""
															class="text-center"
															disabled
														>
															--select pesticide--
														</option>
														<option
															v-for="pesticide in cropData.PesticideConjunctions"
															:key="pesticide.pesticideid"
															:value="pesticide.pesticideid"
															class="text-center"
														>
															{{ pesticide.name }}
														</option>
													</template>
													<template
														v-if="
															taskProcessingDetails[index]
																.description === 'fertilizer'
														"
													>
														<option
															value=""
															class="text-center"
															disabled
														>
															--select fertilizer--
														</option>
														<option
															v-for="fertilizer in cropData.fertilizerConjunctions"
															:key="fertilizer.fertilizerid"
															:value="fertilizer.fertilizerid"
															class="text-center"
														>
															{{ fertilizer.name }}
														</option>
													</template>
													<template
														v-if="
															taskProcessingDetails[index]
																.description === 'material'
														"
													>
														<option value="" disabled>
															--select material--
														</option>
														<option
															v-for="material in cropData.materialConjunctions"
															:key="material.materialid"
															:value="material.materialid"
															class="text-center"
														>
															{{ material.name }}
														</option>
													</template>
												</select>
											</div>
										</div>
									</div>
									<button
										class="bg-red-500 w-[15%] h-full rounded text-slate-200 text-sm hover:bg-red-800"
										@click.prevent="
											addColumn(
												this.cropData.plantsheetTaskProcessingConjunctions,
												'TaskId', 'ItemId'
											)
										"
									>
										<span class="text-2xl font-extrabold">+</span>
										processing
									</button>
								</div>
								<div
									v-if="activeTabPlanting === 'tasks'"
									class="w-[90%] flex flex-col gap-2"
								>
									<div class="w-full">
										<div class="flex flex-row w-full">
											<div
												class="w-[8%] text-center border-black border"
											>
												HST
											</div>
											<div
												class="w-[15%] border border-black text-center"
											>
												Task
											</div>
											<div
												class="w-[15%] border border-black text-center border-r-2"
											>
												Item
											</div>
										</div>
										<div
											v-for="(
												el, index
											) in cropData.plantsheetTaskPlantingConjunctions"
											class="w-[237px] flex flex-row"
										>
											<div
												class="w-[21%] text-center border border-black"
											>
												{{ index + 1 }}
											</div>
											<div
												class="w-[39.5%] border border-black flex flex-col"
											>
												<select
													v-model="el.TaskId"
													class="bg-yellow-200 hover:bg-yellow-300 rounded-md h-full flex flex-col"
												>
													<option value="" disabled>
														--select task--
													</option>
													<option
														v-for="task in tasks"
														:key="task.id"
														:value="task.id"
														class="text-center"
													>
														{{ task.name }}
													</option>
												</select>
											</div>
											<div
												class="w-[39.5%] border border-black flex flex-col"
											>
												<select
													v-model="el.ItemId"
													class="bg-yellow-200 hover:bg-yellow-300 rounded-md h-full flex flex-col"
												>
													<template
														v-if="
															taskPlantingDetails[index]
																.description === 'pesticide'
														"
													>
														<option
															value=""
															class="text-center"
															disabled
														>
															--select pesticide--
														</option>
														<option
															v-for="pesticide in cropData.PesticideConjunctions"
															:key="pesticide.pesticideid"
															:value="pesticide.pesticideid"
															class="text-center"
														>
															{{ pesticide.name }}
														</option>
													</template>
													<template
														v-if="
															taskPlantingDetails[index]
																.description === 'fertilizer'
														"
													>
														<option
															value=""
															class="text-center"
															disabled
														>
															--select fertilizer--
														</option>
														<option
															v-for="fertilizer in cropData.fertilizerConjunctions"
															:key="fertilizer.fertilizerid"
															:value="fertilizer.fertilizerid"
															class="text-center"
														>
															{{ fertilizer.name }}
														</option>
													</template>
													<template
														v-if="
															taskPlantingDetails[index]
																.description === 'material'
														"
													>
														<option value="" disabled>
															--select material--
														</option>
														<option
															v-for="material in cropData.materialConjunctions"
															:key="material.materialid"
															:value="material.materialid"
															class="text-center"
														>
															{{ material.name }}
														</option>
													</template>
												</select>
											</div>
										</div>
									</div>
								</div>
								<div
									v-if="activeTabPlanting === 'fertilizers'"
									class="w-[90%] flex flex-col gap-2"
								>
									<div>
										<div class="flex flex-row w-full">
											<div
												class="w-[37%] text-center border-black border"
											>
												Name
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
											<div class="w-[37%] border border-black">
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
									v-if="activeTabPlanting === 'pesticides'"
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
									v-if="activeTabPlanting === 'materials'"
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
	<!-- <pre class="ml-9">{{ cropData }}</pre> -->
</template>

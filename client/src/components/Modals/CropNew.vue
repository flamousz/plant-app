<script>
import { mapActions, mapState } from "pinia";
import GreenButton from "../Buttons/GreenButton.vue";
import { useCropStore } from "../../stores/crop";
import RedButton from "../Buttons/RedButton.vue";
import { useItemStore } from "../../stores/item";

export default {
	name: "CropNew",
	components: { GreenButton, RedButton },
	data() {
		return {
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
					},
				],
				fertilizers: [
					{
						fertilizerid: 0,
					},
				],
				fungiPesticide: [
					{
						pesticideid: 0,
					},
				],
				insecticidePesticide: [
					{
						pesticideid: 0,
					},
				],
				zptPesticide: [
					{
						pesticideid: 0,
					},
				],
				perekatPesticide: [
					{
						pesticideid: 0,
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
		...mapActions(useCropStore, ["postCrop", "putCrop", "fetchCrop"]),
		handlePutorPost() {
			if (this.editFlag === true) {
				this.putCrop(this.cropData);
			} else if (this.editFlag === false) {
				this.postCrop(this.cropData);
			}
		},
		...mapActions(useItemStore, [
			"fetchPlant",
			"fetchPlantType",
			"fetchMaterial",
			"fetchFertilizer",
			"fetchFungiPesticide",
			"fetchInsecticidePesticide",
			"fetchZptPesticide",
			"fetchPerekatPesticide",
			"fetchSeed",
		]),

		materialInputHandler(e) {
			// console.log("masuk ingredient handler");
			// console.log(e, "<< ini e");
			// console.log(i, "<< ini index");
			this.cropData.materials.push({
				materialid: e,
			});
			// this.cropData.materials.pop()
			// console.log(this.cropData.materials, "<< ini materials");
		},

		fertilizersInputHandler(e) {
			this.cropData.fertilizers.push({
				fertilizerid: e,
			});
		},

		fungiPesticideInputHandler(e) {
			this.cropData.fungiPesticide.push({
				pesticideid: e,
			});
		},

		insecticidePesticideInputHandler(e) {
			this.cropData.insecticidePesticide.push({
				pesticideid: e,
			});
		},

		zptPesticideInputHandler(e) {
			this.cropData.zptPesticide.push({
				pesticideid: e,
			});
		},

		perekatPesticideInputHandler(e) {
			this.cropData.perekatPesticide.push({
				pesticideid: e,
			});
		},

		seedInputHandler(e) {
			this.cropData.seeds.push({
				seedid: e,
			});
		},
	},

	computed: {
		...mapState(useCropStore, ["editFlag", "cropDetail", "crop"]),
		...mapState(useItemStore, [
			"plants",
			"plantTypes",
			"materials",
			"fertilizers",
			"fungiPesticides",
			"insecticidePesticides",
			"zptPesticides",
			"perekatPesticides",
			"seeds",
		]),
	},
	created() {
		this.fetchSeed();
		this.fetchPerekatPesticide();
		this.fetchZptPesticide();
		this.fetchInsecticidePesticide();
		this.fetchFungiPesticide();
		this.fetchFertilizer();
		this.fetchMaterial();
		this.fetchPlant();
		this.fetchPlantType();
		// console.log(this.editFlag, "<< ini editflag");

		// console.log(this.plantTypes,'<< plant type');
		// console.log(this.cropDetail, "ini crop detail dari crop new page");
		// console.log(this.cropDetail.id, "ini crop detail ID dari crop new page");
		// console.log(this.editFlag, "ini edit flag dari crop new page");
		if (this.editFlag == true) {
			this.cropData.name = this.cropDetail.name;
			this.cropData.seedlingAge = this.cropDetail.seedlingAge;
			this.cropData.harvestAge = this.cropDetail.harvestAge;
			this.cropData.harvestTime = this.cropDetail.harvestTime;
			this.cropData.cropAge = this.cropDetail.cropAge;
			this.cropData.cropProdWeight = this.cropDetail.cropProdWeight;
			this.cropData.planttypeid = this.cropDetail.type;
			this.cropData.id = this.cropDetail.id;
		}
	},
};
</script>

<template>
	<!-- {{ seeds }} -->
	<div class="w-full bg-slate-300 p-2">
		<form @submit.prevent="handlePutorPost">
			<div class="flex flex-row gap-2">
				<div class="w-[30%]">
					<div class="flex flex-col gap-2">
						<div class="flex flex-row justify-between">
							<label
								for="name"
								class="flex justify-start items-center lg:w-[23%]"
								>Plant:</label
							>
							<select
								v-model="cropData.plantid"
								class="h-auto w-auto bg-green-100 rounded-md"
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
						<div class="flex flex-row justify-between">
							<label
								for="seedlingAge"
								class="lg:w-[30%] flex justify-start items-center"
								>Seedling Age:
							</label>
							<input
								id="seedlingAge"
								class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
								placeholder="Seedling Age ...."
								name="seedlingAge"
								type="number"
								v-model="cropData.seedlingAge"
							/>
						</div>
						<div class="flex flex-row justify-between">
							<label
								for="harvestAge"
								class="lg:w-[23%] flex justify-start items-center"
								>Harvest Age:
							</label>
							<input
								id="harvestAge"
								class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
								placeholder="Harvest Age ...."
								name="harvestAge"
								type="number"
								v-model="cropData.harvestAge"
							/>
						</div>
						<div class="flex flex-row justify-between">
							<label
								for="harvestTime"
								class="lg:w-[35%] flex justify-start items-center"
								>Harvest Time:
							</label>
							<input
								id="harvestTime"
								class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
								placeholder="Harvest Time ...."
								name="harvestTime"
								type="number"
								v-model="cropData.harvestTime"
							/>
						</div>
						<div class="flex flex-row justify-between">
							<label
								for="cropAge"
								class="lg:w-[23%] flex justify-start items-center"
								>Crop Age:
							</label>
							<input
								id="cropAge"
								class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
								placeholder="Crop Age ...."
								name="cropAge"
								type="number"
								v-model="cropData.cropAge"
							/>
						</div>
						<div class="flex flex-row justify-between">
							<label
								for="cropProdWeight"
								class="lg:w-[60%] flex justify-start items-center"
								>Crop Production Weight:
							</label>
							<input
								id="cropProdWeight"
								class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
								placeholder="Crop Production Weight..."
								name="cropProdWeight"
								type="number"
								v-model="cropData.cropProdWeight"
							/>
						</div>
						<div class="flex flex-row justify-between">
							<label
								for="name"
								class="flex justify-start items-center lg:w-[23%]"
								>Type:</label
							>
							<select
								v-model="cropData.planttypeid"
								class="h-auto w-auto bg-green-100 rounded-md"
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
						<div class="flex gap-3 justify-end pt-3">
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
				</div>
				<div class="w-[10%]">
					<div class="flex flex-col w-[100%] gap-2">
						<div class="flex flex-col gap-2">
							<label for="name" class="lg:w-full text-center"
								>Material:</label
							>
							<div
								class="flex flex-col"
								v-for="el in cropData.materials"
							>
								<select
									v-model="el.materialid"
									@change="materialInputHandler(el.materialid)"
									class="h-auto w-auto bg-green-100 rounded-md flex flex-col"
								>
									<option value="" disabled selected>
										Enter Material here
									</option>
									<option
										v-for="item in materials"
										:key="item.id"
										:value="item.id"
									>
										{{ item.name }}
									</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="w-[10%]">
					<div class="flex flex-col w-[100%] gap-2">
						<div class="flex flex-col gap-2">
							<label for="name" class="lg:w-full text-center"
								>Fertilizer:</label
							>
							<div
								class="flex flex-col"
								v-for="el in cropData.fertilizers"
							>
								<select
									v-model="el.fertilizerid"
									@change="fertilizersInputHandler(el.fertilizerid)"
									class="h-auto w-auto bg-green-100 rounded-md flex flex-col"
								>
									<option value="" disabled>
										Enter Fertilizer here
									</option>
									<option
										v-for="item in fertilizers"
										:key="item.id"
										:value="item.id"
									>
										{{ item.name }}
									</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="w-[10%]">
					<div class="flex flex-col w-[100%] gap-2">
						<div class="flex flex-col gap-2">
							<label for="name" class="lg:w-full text-center"
								>Fungi Pesticide:</label
							>
							<div
								class="flex flex-col"
								v-for="el in cropData.fungiPesticide"
							>
								<select
									v-model="el.pesticideid"
									@change="fungiPesticideInputHandler(el.pesticideid)"
									class="h-auto w-auto bg-green-100 rounded-md flex flex-col"
								>
									<option value="" disabled selected>
										Enter Fungi Pesticide here
									</option>
									<option
										v-for="item in fungiPesticides"
										:key="item.id"
										:value="item.id"
									>
										{{ item.name }}
									</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="w-[10%]">
					<div class="flex flex-col w-[100%] gap-2">
						<div class="flex flex-col gap-2">
							<label for="name" class="lg:w-full text-center"
								>ZPT Pesticide:</label
							>
							<div
								class="flex flex-col"
								v-for="el in cropData.zptPesticide"
								:key="el.id"
							>
								<select
									v-model="el.pesticideid"
									@change="zptPesticideInputHandler(el.pesticideid)"
									class="h-auto w-auto bg-green-100 rounded-md flex flex-col"
								>
									<option value="" disabled selected>
										Enter ZPT Pesticide here
									</option>
									<option
										v-for="item in zptPesticides"
										:key="item.id"
										:value="item.id"
									>
										{{ item.name }}
									</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="w-[10%]">
					<div class="flex flex-col w-[100%] gap-2">
						<div class="flex flex-col gap-2">
							<label for="name" class="lg:w-full text-center"
								>Insectide Pesticide:</label
							>
							<div
								class="flex flex-col"
								v-for="el in cropData.insecticidePesticide"
								:key="el.id"
							>
								<select
									v-model="el.pesticideid"
									@change="
										insecticidePesticideInputHandler(el.pesticideid)
									"
									class="h-auto w-auto bg-green-100 rounded-md flex flex-col"
								>
									<option value="" disabled selected>
										Enter Insectide Pesticide here
									</option>
									<option
										v-for="item in insecticidePesticides"
										:key="item.id"
										:value="item.id"
									>
										{{ item.name }}
									</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="w-[10%]">
					<div class="flex flex-col w-[100%] gap-2">
						<div class="flex flex-col gap-2">
							<label for="name" class="lg:w-full text-center"
								>Perekat Pesticide:</label
							>
							<div
								class="flex flex-col"
								v-for="el in cropData.perekatPesticide"
								:key="el.id"
							>
								<select
									v-model="el.pesticideid"
									@change="
										perekatPesticideInputHandler(el.pesticideid)
									"
									class="h-auto w-auto bg-green-100 rounded-md flex flex-col"
								>
									<option value="" disabled selected>
										Enter Perekat Pesticide here
									</option>
									<option
										v-for="item in perekatPesticides"
										:key="item.id"
										:value="item.id"
									>
										{{ item.name }}
									</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="w-[10%]">
					<div class="flex flex-col w-[100%] gap-2">
						<div class="flex flex-col gap-2">
							<label for="name" class="lg:w-full text-center"
								>Seed:</label
							>
							<div
								class="flex flex-col"
								v-for="el in cropData.seeds"
								:key="el.id"
							>
								<select
									v-model="el.seedid"
									@change="seedInputHandler(el.seedid)"
									class="h-auto w-auto bg-green-100 rounded-md flex flex-col"
								>
									<option value="" disabled selected>
										Enter Seeds here
									</option>
									<option
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
				</div>
			</div>
		</form>
	</div>
</template>

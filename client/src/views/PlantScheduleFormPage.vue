<script>
import { mapActions, mapState } from "pinia";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";
import GreenButton from "../components/Buttons/GreenButton.vue";
import { usePlantScheduleStore } from "../stores/plantschedule";
import { useCropStore } from "../stores/crop";
import { useCropAreaStore } from "../stores/cropArea";

export default {
	name: "PlantScheduleFormPage",
	data() {
		return {
			role: localStorage.getItem("role"),
			cropData: {
				id: 0,
				seedlingDate: null,
				plantingDate: null,
				harvestDate: null,
				unloadDate: null,
				PlantsheetId: 0,
				CropAreaId: 0,
				totalPopulation: null,
				seedNursery: null,
				userId: localStorage.getItem('userId')
			},
			isDateDisabled: {
				seedlingDate: false,
				plantingDate: false,
			},
		};
	},
	methods: {
		formattedDate(date) {
			return usePlantScheduleStore().formatDate(date);
		},
		...mapActions(usePlantScheduleStore, [
			"postPlantSchedules",
			"putPlantSchedules",
			"handleFalseEditFlag",
		]),
		...mapActions(useCropAreaStore, ["fetchAllCropArea", 'getCropAreaById']),
		...mapActions(useCropStore, ["fetchCropPlain", "getCropById"]),
		handlePutorPost() {
			if (this.editFlag === true) {
				this.putPlantSchedules(this.cropData);
			} else if (this.editFlag === false) {
				this.postPlantSchedules(this.cropData);
			}
		},
		fetchSelectedPlantsheet(PlantSheetId) {
			this.getCropById(PlantSheetId);
		},
		fetchCropArea(id){
			console.log('<<< masuk ke fetchCropArea(id)');
			this.getCropAreaById(id)
		},
		seedOrPlant() {
			console.log("masuk ke seedOrPlant");
			if (!this.editFlag) {
				console.log("masuk ke this.editFlag === false, seedOrPlant");
				if (this.cropData.seedlingDate) {
					const startingDate = new Date(this.cropData.seedlingDate);
					const resultDate = new Date(startingDate);
					if (!this.cropDetail.seedlingAge) {
						return null;
					}
					resultDate.setDate(
						startingDate.getDate() + this.cropDetail.seedlingAge
					);
					const formattedDate = resultDate.toISOString().slice(0, 10);
					this.cropData.plantingDate = formattedDate;
					this.isDateDisabled.plantingDate = true;
				} else if (this.cropData.plantingDate) {
					const startingDate = new Date(this.cropData.plantingDate);
					const resultDate = new Date(startingDate);
					if (!this.cropDetail.seedlingAge) {
						return null;
					}
					resultDate.setDate(
						startingDate.getDate() - this.cropDetail.seedlingAge
					);
					const formattedDate = resultDate.toISOString().slice(0, 10);
					this.cropData.seedlingDate = formattedDate;
					this.isDateDisabled.seedlingDate = true;
				}
			}
		},
	},
	computed: {
		...mapState(useCropStore, ["crop", "cropDetail"]),
		...mapState(useCropAreaStore, ["cropArea", 'cropAreaDetail']),
		...mapState(usePlantScheduleStore, ["editFlag", "plantSchedulesDetail"]),
		heading() {
			if (this.editFlag === true) {
				return "Edit";
			} else if (this.editFlag === false) {
				return "New";
			}
		},
		seedNurseryCalculation(){
			if (!this.cropData.totalPopulation) {
				return null
			}
			
			return this.cropData.seedNursery = Math.ceil(this.cropData.totalPopulation + (this.cropData.totalPopulation*(0.01*this.cropDetail.fallacyNursery)) )
		},
		populationCalculation(){
			if (!this.cropDetail.plantPerMetre) {
				return null
			}
			if (!this.cropAreaDetail.area) {
				return null
			}
			console.log(this.cropDetail.plantPerMetre, '<<< this.cropDetail.plantPerMetre');
			console.log(this.cropAreaDetail.area, '<<< this.cropAreaDetail.area');
			return this.cropData.totalPopulation = this.cropAreaDetail.area*this.cropDetail.plantPerMetre
		},
		harvestDateCalculation() {
			console.log("masuk ke harvestDateCalculation");
			console.log(
				this.cropData.plantingDate,
				"<< ini this.cropData.plantingDate"
			);
			if (!this.cropData.plantingDate) {
				return null;
			}
			console.log("masuk ke harvestDateCalculation setelah if pertama");
			const startingDate = new Date(this.cropData.plantingDate);
			const resultDate = new Date(startingDate);
			console.log(this.cropDetail, "<<<< ini this.cropDetail");
			console.log(
				this.cropDetail.harvestAge,
				"<<<< ini this.cropDetail.harvestAge"
			);
			if (!this.cropDetail.harvestAge) {
				return null;
			}
			console.log("masuk ke harvestDateCalculation setelah if kedua");
			resultDate.setDate(
				startingDate.getDate() + this.cropDetail.harvestAge
			);

			const formattedDate = resultDate.toISOString().slice(0, 10);
			this.cropData.harvestDate = formattedDate;
			console.log("masuk ke harvestDateCalculation sebelum formattedDate");
			return formattedDate;
		},
		unloadDateCalculation() {
			console.log("masuk ke unloadDateCalculation");
			if (!this.cropData.harvestDate) {
				return null;
			}
			const startingDate = new Date(this.cropData.harvestDate);
			const resultDate = new Date(startingDate);
			if (!this.cropDetail.harvestTime) {
				return null;
			}
			resultDate.setDate(
				startingDate.getDate() + this.cropDetail.harvestTime
			);
			const formattedDate = resultDate.toISOString().slice(0, 10);
			this.cropData.unloadDate = formattedDate;

			return formattedDate;
		},
	},
	created() {
		this.fetchAllCropArea();
		this.fetchCropPlain();
		if (this.editFlag === true) {
			this.fetchSelectedPlantsheet(this.plantSchedulesDetail.PlantsheetId);
			this.cropData.id = this.plantSchedulesDetail.id;

			this.cropData.seedlingDate =
				this.plantSchedulesDetail.seedlingDate.slice(0, 10);
			this.cropData.plantingDate =
				this.plantSchedulesDetail.plantingDate.slice(0, 10);
			// this.cropData.harvestDate = this.plantSchedulesDetail.harvestDate.slice(0, 10)
			// this.cropData.unloadDate = this.plantSchedulesDetail.unloadDate.slice(0, 10)
			this.cropData.PlantsheetId = this.plantSchedulesDetail.PlantsheetId;
			this.cropData.CropAreaId = this.plantSchedulesDetail.CropAreaId;
			this.cropData.totalPopulation =
				this.plantSchedulesDetail.totalPopulation;
		}
	},
	components: { RedButton, BlueButton, GreenButton },
};
</script>

<template class="flex flex-col">
	<!-- <pre>{{ plantSchedulesDetail.PlantsheetId }}</pre> -->
	<!-- <pre>{{ cropDetail}}</pre> -->
	<!-- <pre>{{ cropAreaDetail }}</pre> -->
	<!-- <pre>{{ editFlag }}</pre> -->
	<section class="w-full">
		<form @submit.prevent="handlePutorPost">
			<div class="flex flex-col px-10">
				<div>
					<div>
						<div class="flex flex-row h-[50px] mb-3">
							<div
								class="w-[40%] flex justify-start items-end text-5xl font-bold"
							>
								{{ heading }} Schedule Form
							</div>
							<div
								class="w-[60%] flex flex-row justify-end items-end gap-3"
							>
								<!-- <div @click="handleStatus('confirm')">
									<BlueButton
										:type="'submit'"
										:text="'Confirm'"
										v-if="role !== 'super' && editFlag === true"
									/>
								</div> -->
								<!-- <div @click="handleStatus('draft')">
									<GreenButton
										:type="'submit'"
										:text="'Draft'"
										v-if="role !== 'super' && editFlag === true"
									/>
								</div> -->
								<GreenButton :type="'submit'" :text="'Submit'" />
								<!-- <GreenButton
									:type="'submit'"
									:text="'Submit'"
									v-if="role === 'super' || editFlag === false"
								/> -->

								<button
									class="bg-red-500 rounded flex hover:bg-red-900 justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px]"
									@click.prevent="
										handleFalseEditFlag();
										this.$router.push(
											`/plantschedule/${plantSchedulesDetail.id}`
										);
									"
									v-if="editFlag === true"
								>
									Cancel
								</button>
								<RouterLink to="/plantschedule">
									<button
										v-if="editFlag === false"
										class="bg-[#c52b2b] rounded flex hover:bg-red-900 justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px]"
									>
										Cancel
									</button>
								</RouterLink>
							</div>
						</div>
					</div>
				</div>
				<div
					class="flex flex-col p-4 bg-slate-100 mt-5 h-full border-2 border-black rounded tracking-wide gap-4"
				>
					<div class="flex flex-row gap-2">
						<div class="flex justify-start items-center w-[13%]">
							Plant :
						</div>
						<select
							v-model="cropData.PlantsheetId"
							@change="fetchSelectedPlantsheet(cropData.PlantsheetId)"

						>
							<option value="" disabled :selected="!editFlag">
								---Select Plant---
							</option>
							<option
								v-for="item in crop"
								:key="item.id"
								:value="item.id"
								:disabled="editFlag"
							>
								{{ item.plant.name }} {{ item.id }}
							</option>
						</select>
					</div>
					<div class="flex flex-row gap-2" v-if="editFlag">
						<div class="flex justify-start items-center w-[13%]">
							Seedling Date :
						</div>
						<p>
							{{ formattedDate(cropData.seedlingDate) }}
						</p>
					</div>
					<div class="flex flex-row gap-2">
						<label
							for="plantingDate"
							class="flex justify-start items-center w-[13%]"
						>
							Planting Date :
						</label>
						<input
							id="plantingDate"
							:disabled="isDateDisabled.plantingDate"
							class="p-[6px] border border-gray-300 rounded-md bg-green-100"
							name="plantingDate"
							type="date"
							v-model="cropData.plantingDate"
							@change="seedOrPlant"
						/>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-start items-center w-[13%]">
							Location :
						</div>
						<div>
							<select v-model="cropData.CropAreaId" @change="fetchCropArea(cropData.CropAreaId)" >
								<option value="" disabled selected>
									--Select Location--
								</option>
								<option v-for="item in cropArea" :value="item.id" :disabled="editFlag" >
									{{ item.name }}
								</option>
							</select>
						</div>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-start items-center w-[13.5%]">
							Population :
						</div>
						<p>{{ populationCalculation }} crop </p>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-start items-center w-[13.5%]">
							Seed Nursery :
						</div>
						<p>{{seedNurseryCalculation}} seed</p>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-start items-center w-[13.5%]">
							Harvest Date :
						</div>
						<div>
							{{ formattedDate(harvestDateCalculation) }}
						</div>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-start items-center w-[13.5%]">
							Unload Date :
						</div>
						<div>
							{{ formattedDate(unloadDateCalculation) }}
						</div>
					</div>
				</div>
			</div>
		</form>
		<pre>{{ cropData }}</pre>
	</section>
</template>

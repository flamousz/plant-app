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
			},
		};
	},
	methods: {
		...mapActions(usePlantScheduleStore, ["postPlantSchedules"]),
		...mapActions(useCropAreaStore, ["fetchAllCropArea"]),
		...mapActions(useCropStore, ["fetchCropPlain", "getCropById"]),
		handlePutorPost() {
			if (this.editFlag === true) {
				this.putItem(this.cropData);
			} else if (this.editFlag === false) {
				this.postPlantSchedules(this.cropData);
			}
		},
		fetchSelectedPlantsheet(value) {
			this.getCropById(value);
		},
		seedOrPlant(){
			console.log('masuk ke seedOrPlant');
			if (this.cropData.seedlingDate) {
				this.cropData.plantingDate = this.cropData.seedlingDate + this.cropDetail.seedlingAge
			} else if(this.cropData.plantingDate){
				this.cropData.seedlingDate = this.cropData.plantingDate - this.cropDetail.seedlingAge
			}
		}
	},
	computed: {
		...mapState(useCropStore, ["crop", "cropDetail"]),
		...mapState(useCropAreaStore, ["cropArea"]),
		...mapState(usePlantScheduleStore, ["editFlag"]),
		heading() {
			if (this.editFlag === true) {
				return "Edit";
			} else if (this.editFlag === false) {
				return "New";
			}
		},
		harvestDateCalculation() {
			if (!this.cropData.plantingDate) {
				return null;
			}
			const startingDate = new Date(this.cropData.plantingDate);
			const resultDate = new Date(startingDate);
			if (!this.cropDetail.harvestAge) {
				return null;
			}
			resultDate.setDate(
				startingDate.getDate() + this.cropDetail.harvestAge
			);

			const formattedDate = resultDate.toISOString().slice(0, 10);
			this.cropData.harvestDate = formattedDate;
			return formattedDate;
		},
		unloadDateCalculation() {
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
		}
	},
	created() {
		this.fetchAllCropArea();
		this.fetchCropPlain();
		if (this.editFlag === true) {
			this.cropData.name = this.itemDetail.name;
			this.cropData.description = this.itemDetail.description;
			this.cropData.categoryid = this.itemDetail.categoryid;
			this.cropData.uomid = this.itemDetail.uomid;
			this.cropData.standardqty = this.itemDetail.standardqty;
			this.cropData.id = this.itemDetail.id;
		}
	},
	components: { RedButton, BlueButton, GreenButton },
};
</script>

<template>
	<pre>{{ cropData }}</pre>
	<pre>{{ this.cropDetail.seedlingAge }}</pre>
	 <!-- <pre>ini tanggal tanam {{ cropData.plantingDate }}</pre>
	<pre>ini cropdetail umur panen {{ cropDetail.harvestAge }} hari</pre> -->
	<!-- <pre>ini hasil harvestDateCalculation {{ harvestDateCalculation }}</pre> -->
	<!-- <pre>ini harvestDate {{ cropData.harvestDate }} </pre>
	<pre>ini cropdetail masa panen {{ cropDetail.harvestTime }} hari</pre> -->
	<!-- <pre>ini hasil unloadDateCalculation {{ unloadDateCalculation }}</pre> -->
	<!-- <pre>ini unloadDate {{ cropData.unloadDate }} </pre>  -->
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
										this.$router.push(`/item/detail/${itemDetail.id}`)
									"
									v-if="editFlag === true"
								>
									Cancel
								</button>
								<RouterLink to="/item">
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
							<option value="" disabled selected>
								---Select Plant---
							</option>
							<option
								v-for="item in crop"
								:key="item.id"
								:value="item.id"
							>
								{{ item.plant.name }} {{ item.id }}
							</option>
						</select>
					</div>

					<div class="flex flex-row gap-2">
						<div class="flex justify-start items-center w-[13%]">
							Seedling Date :
						</div>
						<input
							id="seedlingDate"
							class="p-[6px] border border-gray-300 rounded-md bg-green-100"
							name="seedlingDate"
							type="date"
							v-model="cropData.seedlingDate"
							@change="seedOrPlant"
						/>
					</div>
					<div class="flex flex-row gap-2">
						<label class="flex justify-start items-center w-[13%]">
							Planting Date :
						</label>
						<input
							id="plantingDate"
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
							<select v-model="cropData.CropAreaId">
								<option value="" disabled selected>
									--Select Location--
								</option>
								<option v-for="item in cropArea" :value="item.id">
									{{ item.name }}
								</option>
							</select>
						</div>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-start items-center w-[13.5%]">
							Population :
						</div>
						<div>
							<input type="number" v-model="cropData.totalPopulation" />
						</div>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-start items-center w-[13.5%]">
							Harvest Date :
						</div>
						<div>
							{{ harvestDateCalculation }}
						</div>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-start items-center w-[13.5%]">
							Unload Date :
						</div>
						<div>
							{{ unloadDateCalculation }}
						</div>
					</div>
				</div>
			</div>
		</form>
	</section>
</template>

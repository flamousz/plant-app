<script>
import { mapActions, mapState } from "pinia";
import { usePlantScheduleStore } from "../stores/plantschedule";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";
import GreenButton from "../components/Buttons/GreenButton.vue";

export default {
	name: "HarvestOutcomeFormPage",
	data() {
		return {
			role: localStorage.getItem("role"),
			cropData: {
				id: 0,
				PlantScheduleId: 0,
				harvestDate: null,
				letterNumber: "",
				harvestWeightEst: null,
				harvestWeightReal: null
			},
		};
	},
	methods: {
		...mapActions(usePlantScheduleStore, ['postHarvestOutcome']),
		handlePutorPost() {
			if (this.editFlag === true) {
				
			} else if (this.editFlag === false) {
				this.cropData.PlantScheduleId = this.$route.query.id
				console.log(this.cropData.PlantScheduleId, '<<<< this.cropData.PlantScheduleId');
				this.cropData.harvestWeightEst = this.$route.query.harvestExpectation
				this.postHarvestOutcome(this.cropData);
			}
		},
		// handleStatus(value) {
		// 	this.cropData.status = value;
		// },
	},
	computed: {
		...mapState(usePlantScheduleStore, ["editFlag"]),
		heading() {
			if (this.editFlag === true) {
				return "Edit";
			} else if (this.editFlag === false) {
				return "New";
			}
		},
	},
	created() {
		// if (this.editFlag === true) {
		// 	this.cropData.id = this.categoryDetail.id;
		// 	this.cropData.name = this.categoryDetail.name;
		// 	this.cropData.description = this.categoryDetail.description;
		// }
	},
	components: { RedButton, BlueButton, GreenButton },
};
</script>

<template>
	<pre>{{ editFlag }}</pre>
	<!-- <pre>{{ this.$route.query.id }}</pre> -->
	<!-- <pre>{{ typeof this.$route.query.harvestExpectation }}</pre> -->
	<section class="w-full">
		<form @submit.prevent="handlePutorPost">
			<div class="flex flex-col px-10">
				<div class="flex flex-row h-[50px] mb-3">
					<div
						class="w-[90%] flex justify-start items-end text-5xl font-bold"
					>
						{{ heading }} Harvest Realization
					</div>
					<div class="w-[60%] flex flex-row justify-end items-end gap-3">
						<!-- <div @click="handleStatus('confirm')">
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
						</div> -->
						<GreenButton
							:type="'submit'"
							:text="'Submit'"
							v-if="role === 'super' || editFlag === false"
						/>
						<!-- <button
							class="bg-red-500 rounded flex hover:bg-red-900 justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px]"
							@click.prevent="
								this.$router.push(
									`/categorydetail/${categoryDetail.id}`
								)
							"
							v-if="editFlag === true"
						>
							Cancel
						</button> -->
						<div @click.prevent="this.$router.push(`/plantschedule/${this.$route.query.id}`)">
							<button
								class="bg-[#c52b2b] rounded flex hover:bg-red-900 justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px]"
								v-if="editFlag === false"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
				<div
					class="flex flex-col p-4 bg-slate-100 mt-5 h-full border-2 border-black rounded tracking-wide gap-4"
				>
					<div class="flex flex-row gap-9">
						<label for="harvestDate" class="flex justify-start items-center  w-[17%]">Harvest Date :</label>
						<input
							id="harvestDate"
							class=" p-[6px] border border-gray-300 rounded-md bg-green-100"
							name="harvestDate"
							type="date"
							v-model="cropData.harvestDate"
						/>
					</div>
					<div class="flex flex-row gap-9">
						<label for="letterNumber" class=" flex justify-start items-center w-[17%]">Letter Number :</label>
						<input
							id="letterNumber"
							class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
							placeholder="Letter Number ...."
							name="letterNumber"
							type="text"
							v-model="cropData.letterNumber"
						/>
					</div>
					<div class="flex flex-row gap-9">
						<label  class=" flex justify-start items-center w-[17%]">Harvest Weight Est. :</label>
						<div>
							{{ this.$route.query.harvestExpectation }} Kg
						</div>
					</div>
					<div class="flex flex-row gap-9">
						<label for="harvestWeightReal" class=" flex justify-start items-center w-[17%]">Harvest Weight Realization :</label>
						<input
							id="harvestWeightReal"
							class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
							placeholder="Harvest Weight Realization ...."
							name="harvestWeightReal"
							type="number"
							v-model="cropData.harvestWeightReal"
						/>
					</div>
				</div>
			</div>
		</form>
	</section>
</template>

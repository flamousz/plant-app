<script>
import { mapActions, mapState } from "pinia";
import { useCropAreaStore } from "../stores/cropArea";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";
import GreenButton from "../components/Buttons/GreenButton.vue";

export default {
	name: "CropFormPage",
	data() {
		return {
			role: localStorage.getItem("role"),
			cropData: {
				id: 0,
				name: "",
				area: null,
				type: "",
				detailplace: "",
				map: "",
				status: "",
			},
		};
	},
	methods: {
		...mapActions(useCropAreaStore, ["postCropArea", "putCropArea"]),
		handlePutorPost() {
			if (this.editFlag === true) {
				this.putCropArea(this.cropData);
			} else if (this.editFlag === false) {
				this.postCropArea(this.cropData);
			}
		},
		handleStatus(value) {
			this.cropData.status = value;
		},
	},
	computed: {
		...mapState(useCropAreaStore, ["cropAreaDetail", "editFlag"]),
		heading() {
			if (this.editFlag === true) {
				return "Edit";
			} else if (this.editFlag === false) {
				return "New";
			}
		},
	},
	created() {
		if (this.editFlag === true) {
			this.cropData.id = this.cropAreaDetail.id;
			this.cropData.name = this.cropAreaDetail.name;
			this.cropData.area = this.cropAreaDetail.area;
			this.cropData.type = this.cropAreaDetail.type;
			this.cropData.map = this.cropAreaDetail.map;
			this.cropData.detailplace = this.cropAreaDetail.detailplace;
		}
	},
	components: { RedButton, BlueButton, GreenButton },
};
</script>

<template>
	<pre>{{ cropData }}</pre>
	<section class="w-full">
		<form @submit.prevent="handlePutorPost">
			<div class="flex flex-col px-10">
				<div>
					<div class="flex flex-row h-[50px] mb-3">
						<div
							class="w-[40%] flex justify-start items-end text-5xl font-bold"
						>
							{{ heading }} Crop Area Form
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
									this.$router.push(
										`/croparea/detail/${cropAreaDetail.id}`
									)
								"
								v-if="editFlag === true"
							>
								Cancel
							</button>
							<RouterLink to="/croparea">
									<button
										class="bg-[#c52b2b] rounded flex hover:bg-red-900 justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px]"
										v-if="editFlag === false"
									>
										Cancel
									</button>
								</RouterLink>
						</div>
					</div>
				</div>
				<div
				class="flex flex-col p-4 bg-slate-100 mt-5 h-full border-2 border-black rounded tracking-wide gap-4"
				>
					<div class="flex flex-row gap-2">
						<div class="flex justify-center items-center">Name :</div>
						<input
							id="name"
							class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
							placeholder="Name ...."
							name="name"
							type="text"
							v-model="cropData.name"
						/>
					</div>
					<div class="flex flex-row gap-2">
						<div>Area :</div>
						<input
							id="area"
							class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
							placeholder="area ...."
							name="area"
							type="text"
							v-model="cropData.area"
						/>
					</div>
					<div class="flex flex-row gap-2">
						<div>Type :</div>
						<select
							v-model="cropData.type"
							class="h-auto w-auto bg-green-100 rounded-md"
						>
							<option value="" disabled>Enter type here</option>
							<option value="sungkup">Sungkup</option>
							<option value="naungan">Naungan</option>
							<option value="naunganBambu">Naungan Bambu</option>
						</select>
					</div>
					<div class="flex flex-row gap-2">
						<div>Detail Place :</div>
						<input
							id="detailArea"
							class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
							placeholder="Detail Place ...."
							name="detailArea"
							type="text"
							v-model="cropData.detailplace"
						/>
					</div>
					<div class="flex flex-row gap-2">
						<div>map :</div>
						<input
							id="map"
							class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
							placeholder="Map ...."
							name="map"
							type="text"
							v-model="cropData.map"
						/>
					</div>
				</div>
			</div>
		</form>
	</section>
</template>

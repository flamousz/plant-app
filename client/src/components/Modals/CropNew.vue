<script>
import { mapActions, mapState } from "pinia";
import GreenButton from "../Buttons/GreenButton.vue";
import { useCropStore } from "../../stores/crop";
import RedButton from "../Buttons/RedButton.vue";

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
				type: "",
				id: "",
				materialid: "",
			},
		};
	},
	methods: {
		...mapActions(useCropStore, ["postCrop", "putCrop", "fetchMaterial"]),
		handlePutorPost() {
			if (this.editFlag === true) {
				this.putCrop(this.cropData);
			} else if (this.editFlag === false) {
				this.postCrop(this.cropData);
			}
		},
	},
	computed: {
		...mapState(useCropStore, ["editFlag", "cropDetail", "materials"]),
	},
	created() {
		this.fetchMaterial();
		console.log(this.cropDetail, "ini crop detail dari crop new page");
		console.log(this.cropDetail.id, "ini crop detail ID dari crop new page");
		console.log(this.editFlag, "ini edit flag dari crop new page");
		if (this.editFlag == true) {
			this.cropData.name = this.cropDetail.name;
			this.cropData.seedlingAge = this.cropDetail.seedlingAge;
			this.cropData.harvestAge = this.cropDetail.harvestAge;
			this.cropData.harvestTime = this.cropDetail.harvestTime;
			this.cropData.cropAge = this.cropDetail.cropAge;
			this.cropData.cropProdWeight = this.cropDetail.cropProdWeight;
			this.cropData.type = this.cropDetail.type;
			this.cropData.id = this.cropDetail.id;
		}
	},
};
</script>

<template>
	{{ materials }}
	<div class="w-[600px] bg-slate-500 h-[500px]">
		<form @submit.prevent="handlePutorPost">
			<div class="flex flex-row">
				<div>
					<div class="flex flex-col w-[100%] gap-2">
						<div class="flex flex-row">
							<label
								for="name"
								class="flex justify-start items-center lg:w-[23%]"
								>Material:</label
							>
							<select
								v-model="cropData.materialid"
								class="h-auto w-auto bg-green-100 rounded-md"
							>
								<option value="" disabled>Enter Plant Name here</option>
								<option
									v-for="item in materials"
									:key="item.id"
									:value="item.id"
								>
									{{ item.name }}
								</option>
							</select>
						</div>
						<div class="flex flex-row">
							<label
								for="seedlingAge"
								class="lg:w-[23%] flex justify-start items-center"
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
						<div class="flex flex-row">
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
						<div class="flex flex-row">
							<label
								for="harvestTime"
								class="lg:w-[23%] flex justify-start items-center"
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
						<div class="flex flex-row">
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
						<div class="flex flex-row">
							<label
								for="cropProdWeight"
								class="lg:w-[23%] flex justify-start items-center"
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
						<div class="flex flex-row">
							<label
								for="type"
								class="lg:w-[23%] flex justify-start items-center"
								>Type:
							</label>
							<input
								id="type"
								class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
								placeholder="Type..."
								name="type"
								type="text"
								v-model="cropData.type"
							/>
						</div>
						<div class="flex gap-3">
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
				<div>
					<div class="flex flex-col w-[100%] gap-2">
						<div class="flex flex-row">
							<label
								for="name"
								class="flex justify-start items-center lg:w-[23%]"
								>Name:</label
							>
							<input
								class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
								placeholder="Name ...."
								name="name"
								type="text"
								id="name"
								v-model="cropData.name"
							/>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>

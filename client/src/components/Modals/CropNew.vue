<script>
import { mapActions } from "pinia";
import GreenButton from "../Buttons/GreenButton.vue";
import {useCropStore} from '../../stores/crop'

export default {
	name: "CropNew",
	components: { GreenButton },
	data() {
		return {
			cropData: {
				name: "",
				seedlingAge: "",
				harvestAge: "",
				harvestTime: "",
				cropAge: "",
				cropProdWeight: "",
				type: "",
			},
		};
	},
    methods: {
        ...mapActions(useCropStore, ['postCrop'])
        }
    }
</script>

<template>
	<div class="w-[600px] bg-slate-500 h-[400px]">
		<form @click.prevent="postCrop(cropData)">
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
				<div class="flex">
					<GreenButton :type="'submit'" :text="'Submit'" />
				</div>
			</div>
		</form>
	</div>
</template>

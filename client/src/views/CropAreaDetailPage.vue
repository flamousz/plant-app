<script>
import { mapActions, mapState } from "pinia";
import { useCropAreaStore } from "../stores/cropArea";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";

export default {
	name: "CropAreaDetailPage",
	data() {
		return {
			role: localStorage.getItem("role"),
			cropData: {
				id: 0,
				arcStatus: "",
			},
		};
	},
	methods: {
		...mapActions(useCropAreaStore, [
			"getCropAreaById",
			"getCropAreaByIdForEdit",
			"patchCropArea",
			"deleteCropArea",
		]),
		patchLocal() {
			this.cropData.id = this.cropAreaDetail.id;
			if (this.cropAreaDetail.arcStatus === "archived") {
				this.cropData.arcStatus = "avail";
			} else {
				this.cropData.arcStatus = "archived";
			}
			console.log(this.cropData, "<<< ini cropData");
			this.patchCropArea(this.cropData);
		},
	},
	computed: {
		...mapState(useCropAreaStore, ["cropAreaDetail"]),
        archive() {
			if (this.cropAreaDetail.arcStatus === "archived") {
				return "avail";
			} else {
				return "archived";
			}
		}
	},
	created() {
		this.getCropAreaById(this.$route.params.id);
	},
	components: { RedButton, BlueButton },
};
</script>

<template>
	<section class="w-full">
		<div class="flex flex-col px-10">
			<div>
				<div>
					<div class="w-full flex justify-end items-end pt-4">
						<div class="text-2xl font-bold w-[8%]">STATUS:</div>
						<div
							class="w-[13%] border-[3px] rounded-md border-slate-800 bg-yellow-300 font-semibold text-center tracking-wide"
						>
							{{ cropAreaDetail.status }} -
							{{ cropAreaDetail.arcStatus }}
						</div>
					</div>
					<div class="flex flex-row h-[50px] mb-3">
						<div
							class="w-[40%] flex justify-start items-end text-5xl font-bold"
						>
							Crop Area Detail
						</div>
						<div
							class="w-[60%] flex flex-row justify-end items-end gap-3"
						>
							<div @click="patchLocal">
								<RedButton
									v-if="role !== 'super'"
									:type="'button'"
									:text="archive"
								/>
							</div>
							<div
								@click="deleteCropArea(cropAreaDetail.id)"
								v-if="role === 'super'"
							>
								<RedButton :type="'button'" :text="'DELETE'" />
							</div>
							<div
								@click="getCropAreaByIdForEdit(cropAreaDetail.id)"
								v-if="
									role === 'super' || cropAreaDetail.status === 'draft'
								"
							>
								<BlueButton :type="'button'" :text="'EDIT'" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				class="flex flex-col p-4 bg-slate-100 mt-5 h-[180px] border-2 border-black rounded tracking-wide"
			>
				<div class="flex flex-row gap-2">
					<div>Name :</div>
					<div>
						{{ cropAreaDetail?.name }}
					</div>
				</div>
				<div class="flex flex-row gap-2">
					<div>Area :</div>
					<div>
						{{ cropAreaDetail?.area }} m2
					</div>
				</div>
				<div class="flex flex-row gap-2">
					<div>Type :</div>
					<div>
						{{ cropAreaDetail?.type }}
					</div>
				</div>
				<div class="flex flex-row gap-2">
					<div>Detail Place :</div>
					<div>
						{{ cropAreaDetail?.name }}
					</div>
				</div>
				<div class="flex flex-row gap-2">
					<div>map :</div>
					<div>
						{{ cropAreaDetail?.map }}
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

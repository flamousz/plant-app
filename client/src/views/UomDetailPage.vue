<script>
import { mapActions, mapState } from "pinia";
import { useUomStore } from "../stores/uom";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";

export default {
	name: "UomDetailPage",
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
		...mapActions(useUomStore, [
			"getUomById",
			"getUomByIdForEdit",
			"patchUom",
			"deleteUom",
		]),
		patchLocal() {
			this.cropData.id = this.uomDetail.id;
			if (this.uomDetail.arcStatus === "archived") {
				this.cropData.arcStatus = "avail";
			} else {
				this.cropData.arcStatus = "archived";
			}
			console.log(this.cropData, "<<< ini cropData");
			this.patchUom(this.cropData);
		},
	},
	computed: {
		...mapState(useUomStore, ["uomDetail"]),
		archive() {
			if (this.uomDetail.arcStatus === "archived") {
				return "avail";
			} else {
				return "archived";
			}
		},
	},
	created() {
		this.getUomById(this.$route.params.id);
	},
	components: { RedButton, BlueButton },
};
</script>

<template>
	<section class="w-full">
		<div class="flex flex-col px-10">
			<div>
				<div class="w-full flex justify-end items-end pt-4">
					<div class="text-2xl font-bold w-[8%]">STATUS:</div>
					<div
						class="w-[13%] border-[3px] rounded-md border-slate-800 bg-yellow-300 font-semibold text-center tracking-wide"
					>
						{{ uomDetail.status }} -
						{{ uomDetail.arcStatus }}
					</div>
				</div>
				<div class="flex flex-row h-[50px] mb-3">
					<div
						class="w-[40%] flex justify-start items-end text-5xl font-bold"
					>
						Uom Detail
					</div>
					<div class="w-[60%] flex flex-row justify-end items-end gap-3">
						<div @click="patchLocal">
							<RedButton
								v-if="role !== 'super'"
								:type="'button'"
								:text="archive"
							/>
						</div>
						<div @click="deleteUom(uomDetail.id)" v-if="role === 'super'">
							<RedButton :type="'button'" :text="'DELETE'" />
						</div>
						<div
							@click="getUomByIdForEdit(uomDetail.id)"
							v-if="role === 'super' || uomDetail.status === 'draft'"
						>
							<BlueButton :type="'button'" :text="'EDIT'" />
						</div>
					</div>
				</div>
			</div>
			<div
				class="flex flex-col p-4 bg-slate-100 mt-5 h-[130px] border-2 border-black rounded tracking-wide"
			>
				<div class="flex flex-row gap-2">
					<div class="w-[11%]">Name</div>
					<div>: {{ uomDetail?.name }}</div>
				</div>
				<div class="flex flex-row gap-2">
					<div class="w-[11%]">Code</div>
					<div>: {{ uomDetail?.code }}</div>
				</div>
				<div class="flex flex-row gap-2">
					<div class="w-[11%]">Description</div>
					<div>: {{ uomDetail?.description }}</div>
				</div>
			</div>
		</div>
	</section>
</template>

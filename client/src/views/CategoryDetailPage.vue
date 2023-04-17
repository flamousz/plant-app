<script>
import { mapActions, mapState } from "pinia";
import { useCategoryStore } from "../stores/category";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";

export default {
	name: 'CategoryDetailPage',
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
		...mapActions(useCategoryStore, [
			'getCategoryById',
			'getCategoryByIdForEdit',
			'patchCategory',
			'deleteCategory'
		]),
		patchLocal() {
			this.cropData.id = this.categoryDetail.id;
			if (this.categoryDetail.arcStatus === "archived") {
				this.cropData.arcStatus = "avail";
			} else {
				this.cropData.arcStatus = "archived";
			}
			console.log(this.cropData, "<<< ini cropData");
			this.patchCategory(this.cropData);
		},
	},
	computed: {
		...mapState(useCategoryStore, ["categoryDetail"]),
		archive() {
			if (this.categoryDetail.arcStatus === "archived") {
				return "avail";
			} else {
				return "archived";
			}
		},
	},
	created() {
		this.getCategoryById(this.$route.params.id);
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
						{{ categoryDetail.status }} -
						{{ categoryDetail.arcStatus }}
					</div>
				</div>
				<div class="flex flex-row h-[50px] mb-3">
					<div
						class="w-[40%] flex justify-start items-end text-5xl font-bold"
					>
						Category Detail
					</div>
					<div class="w-[60%] flex flex-row justify-end items-end gap-3">
						<div @click="patchLocal">
							<RedButton
								v-if="role !== 'super'"
								:type="'button'"
								:text="archive"
							/>
						</div>
						<div
							@click="deleteCategory(categoryDetail.id)"
							v-if="role === 'super'"
						>
							<RedButton :type="'button'" :text="'DELETE'" />
						</div>
                        <div
								@click="getCategoryByIdForEdit(categoryDetail.id)"
								v-if="
									role === 'super' || categoryDetail.status === 'draft'
								"
							>
								<BlueButton :type="'button'" :text="'EDIT'" />
							</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col p-4 bg-slate-100 mt-5 h-[130px] border-2 border-black rounded tracking-wide">
                <div class="flex flex-row gap-2">
					<div class="w-[11%]">Name</div>
					<div>
						: {{ categoryDetail?.name }}
					</div>
				</div>
				<div class="flex flex-row gap-2">
					<div class="w-[11%]">Code</div>
					<div>
						: {{ categoryDetail?.code }} 
					</div>
				</div>
				<div class="flex flex-row gap-2">
					<div class="w-[11%]">Description</div>
					<div>
						: {{ categoryDetail?.description }}
					</div>
				</div>
            </div>
		</div>
	</section>
</template>

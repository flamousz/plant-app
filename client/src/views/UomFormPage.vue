<script>
import { mapActions, mapState } from "pinia";
import { useUomStore } from "../stores/uom";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";
import GreenButton from "../components/Buttons/GreenButton.vue";

export default {
	name: "UomFormPage",
	data() {
		return {
			role: localStorage.getItem("role"),
			cropData: {
				id: 0,
				description: '',
				status: "",
				name: "",
			},
		};
	},
	methods: {
		...mapActions(useUomStore, ["postUom", "putUom"]),
		handlePutorPost() {
			if (this.editFlag === true) {
				this.putUom(this.cropData);
			} else if (this.editFlag === false) {
				this.postUom(this.cropData);
			}
		},
		handleStatus(value) {
			this.cropData.status = value;
		},
	},
	computed: {
		...mapState(useUomStore, ["uomDetail", "editFlag"]),
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
			this.cropData.id = this.uomDetail.id;
			this.cropData.name = this.uomDetail.name;
			this.cropData.description = this.uomDetail.description;
		}
	},
	components: { RedButton, BlueButton, GreenButton },
};
</script>

<template>
	<!-- <pre>{{ editFlag }}</pre> -->
	<section class="w-full">
		<form @submit.prevent="handlePutorPost">
			<div class="flex flex-col px-10">
				<div class="flex flex-row h-[50px] mb-3">
					<div
						class="w-[40%] flex justify-start items-end text-5xl font-bold"
					>
						{{ heading }} Uom Form
					</div>
					<div class="w-[60%] flex flex-row justify-end items-end gap-3">
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
									`/uomdetail/${uomDetail.id}`
								)
							"
							v-if="editFlag === true"
						>
							Cancel
						</button>
						<RouterLink to="/uom">
							<button
								class="bg-[#c52b2b] rounded flex hover:bg-red-900 justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px]"
								v-if="editFlag === false"
							>
								Cancel
							</button>
						</RouterLink>
					</div>
				</div>
				<div
					class="flex flex-col p-4 bg-slate-100 mt-5 h-full border-2 border-black rounded tracking-wide gap-4"
				>
					<div class="flex flex-row gap-2">
						<div class="flex justify-start items-center  w-[8%]">Name :</div>
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
						<div class="flex justify-start items-center w-[8%]">Description :</div>
						<input
							id="description"
							class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
							placeholder="Description ...."
							name="description"
							type="text"
							v-model="cropData.description"
						/>
					</div>
				</div>
			</div>
		</form>
	</section>
</template>

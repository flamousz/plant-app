<script>
import { mapActions, mapState } from "pinia";
import { useItemStore } from "../stores/item";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";
import GreenButton from "../components/Buttons/GreenButton.vue";

export default {
	name: "ItemFormPage",
	data() {
		return {
			role: localStorage.getItem("role"),
			cropData: {
				id: 0,
				name: "",
				description: "",
				categoryid: 0,
				uomid: 0,
				standardqty: null,
				status: "",
			},
		};
	},
	methods: {
		...mapActions(useItemStore, [
			"postItem",
			"putItem",
			"fetchCategory",
			"fetchUom",
		]),
		handlePutorPost() {
			if (this.editFlag === true) {
				this.putItem(this.cropData);
			} else if (this.editFlag === false) {
				this.postItem(this.cropData);
			}
		},
		handleStatus(value) {
			this.cropData.status = value;
		},
	},
	computed: {
		...mapState(useItemStore, [
			"itemDetail",
			"categories",
			"uoms",
			"editFlag",
		]),
		heading(){
			if (this.editFlag === true) {
				return 'Edit'
			} else if( this.editFlag === false ) {
				return 'New'
			}
		}
	},
	created() {
		this.fetchCategory();
		this.fetchUom();

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
								{{ heading }} Item Form
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
						<div class="flex justify-start items-center  w-[13%]">Name :</div>
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
						<div class="flex justify-start items-center  w-[13%]">Category :</div>
						<select
							v-model="cropData.categoryid"
							class="h-auto w-auto bg-green-100 rounded-md"
						>
							<option value="" disabled>Enter type here</option>
							<option
								v-for="item in categories"
								:key="item.id"
								:value="item.id"
							>
								{{ item.name }}
							</option>
						</select>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-start items-center  w-[13%]">Description :</div>
						<div>
							<input
								id="description"
								class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
								placeholder="Description ...."
								name="name"
								type="text"
								v-model="cropData.description"
							/>
						</div>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-start items-center  w-[13%]">Standard Quantity :</div>
						<div>
							<input
								id="standardQuantity"
								class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
								placeholder="Standard Quantity ...."
								name="name"
								type="number"
								v-model="cropData.standardqty"
							/>
						</div>
					</div>
					<div class="flex flex-row gap-2">
						<div class="flex justify-start items-center  w-[13.5%]">Unit of Measurement :</div>
						<div>
							<select
								v-model="cropData.uomid"
								class="h-auto w-auto bg-green-100 rounded-md"
							>
								<option value="" disabled>Enter type here</option>
								<option
									v-for="item in uoms.rows"
									:key="item.id"
									:value="item.id"
								>
									{{ item.name }}
								</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</form>
	</section>
	<!-- <pre>{{ itemDetail }}</pre> -->
</template>

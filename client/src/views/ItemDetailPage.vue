<script>
import { mapActions, mapState } from "pinia";
import { useItemStore } from "../stores/item";
import RedButton from "../components/Buttons/RedButton.vue";
import BlueButton from "../components/Buttons/BlueButton.vue";

export default {
    name: "ItemDetailPage",
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
        ...mapActions(useItemStore, ["getItemById", "patchItem", 'deleteItem', 'getItemByIdForEdit']),
        patchLocal() {
            this.cropData.id = this.itemDetail.id;
            if (this.itemDetail.arcStatus === "archived") {
                this.cropData.arcStatus = "avail";
            }
            else {
                this.cropData.arcStatus = "archived";
            }
            console.log(this.cropData, "<<< ini cropData");
            this.patchItem(this.cropData);
        },
    },
    computed: {
        ...mapState(useItemStore, ["itemDetail"]),
        archive() {
			if (this.itemDetail.arcStatus === "archived") {
				return "avail";
			} else {
				return "archived";
			}
		}
    },
    created() {
        this.getItemById(this.$route.params.id);
    },
    components: { RedButton, BlueButton }
};
</script>

<template>
	<section class="w-full">
		<div class="flex flex-col px-10 ">
			<div>
				<div>
					<div class="w-full flex justify-end items-end pt-4">
						<div class="text-2xl font-bold w-[8%]">STATUS:</div>
						<div
							class="w-[13%] border-[3px] rounded-md border-slate-800 bg-yellow-300 font-semibold text-center tracking-wide"
						>
							{{ itemDetail.status }} - {{ itemDetail.arcStatus }}
						</div>
					</div>
					<div class="flex flex-row h-[50px] mb-3">
						<div
							class="w-[40%] flex justify-start items-end text-5xl font-bold"
						>
							Item Detail
						</div>
						<div
							class="w-[60%] flex flex-row justify-end items-end gap-3"
						>
							<div @click="patchLocal">
								<RedButton 
                                v-if="role !== 'super'"
                                :type="'button'" :text="archive" />
							</div>
							<div
								@click="deleteItem(itemDetail.id)"
								v-if="role === 'super'"
							>
								<RedButton :type="'button'" :text="'DELETE'" />
							</div>
							<div
								@click="getItemByIdForEdit(itemDetail.id)"
								v-if="role === 'super' || itemDetail.status === 'draft'"
							>
								<BlueButton :type="'button'" :text="'EDIT'" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col p-4 bg-slate-100 mt-5 h-[180px] border-2 border-black rounded tracking-wide">
                <div class="flex flex-row gap-2">
                    <div>
                        Name :
                    </div>
                    <div>
                        {{ itemDetail?.name }}
                    </div>
                </div>
                <div class="flex flex-row gap-2">
                    <div>
                        Code :
                    </div>
                    <div>
                        {{ itemDetail?.code }}
                    </div>
                </div>
                <div class="flex flex-row gap-2">
                    <div>
                        Category :
                    </div>
                    <div>
                        {{ itemDetail?.Category?.name }}
                    </div>
                </div>
                <div class="flex flex-row gap-2">
                    <div>
                        Standard Quantity :
                    </div>
                    <div>
                        {{ itemDetail?.standardqty }}
                    </div>
                </div>
                <div class="flex flex-row gap-2">
                    <div>
                        Unit of Measurement :
                    </div>
                    <div>
                        {{ itemDetail?.Uom?.name }}
                    </div>
                </div>
                <div class="flex flex-row gap-2">
                    <div>
                        Description :
                    </div>
                    <div>
                        {{ itemDetail?.description }}
                    </div>
                </div>
            </div>
		</div>
	</section>
	<!-- <pre>{{ itemDetail }}</pre> -->
</template>

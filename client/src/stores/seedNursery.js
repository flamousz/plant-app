import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";

export const useSeedNurseryStore = defineStore("sednursery", {
	state() {
		return {
			seedNursery: [],
			seednurseryDetail: {},
		};
	},
	actions: {
		async patchSeedNursery(id, SeedId) {
			try {
				console.log("masuk ke patchSeedNursery");
				console.log(id, "<< ini id");
				console.log(SeedId, "<< ini SeedId");
				const completeData = {
					id,
					SeedId,
				};
				console.log(completeData, "<< ini completeData");
				const { data } = await axios({
					url: `${baseUrl}/seednurseries`,
					method: "PATCH",
					data: completeData,
				});

				this.fetchSeedNursery();
				this.router.push("/seednursery");

				Toastify({
					text: data,
					gravity: "bottom", // `top` or `bottom`
					position: "left",
					style: {
						background: "linear-gradient(to left, #58c389, #7dd382)",
					},
					duration: 2000,
				}).showToast();
			} catch (error) {
				console.log(err);
			}
		},
		async fetchSeedNursery() {
			try {
				const { data } = await axios({
					url: `${baseUrl}/seednurseries`,
					method: "GET",
				});
				this.seedNursery = data;
			} catch (error) {
				console.log(error);
			}
		},
		async fetchSeedNurseryById(id) {
			try {
				const { data } = await axios({
					url: `${baseUrl}/seednurseries/${id}`,
					method: "GET",
				});
				this.seednurseryDetail = data;
			} catch (error) {
				console.log(error);
			}
		},
	},
});

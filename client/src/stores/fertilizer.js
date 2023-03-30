import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";

export const useFertilizerStore = defineStore("fertilizer", {
	state() {
		return {
			fertilizers: [],
		};
	},
	actions: {
		async fetchFertilizer() {
			try {
				const { data } = await axios({
					url: `${baseUrl}/fertilizers`,
					method: "GET",
				});
				this.fertilizers = data;
			} catch (err) {
				console.log(err);
			}
		},
	},
});

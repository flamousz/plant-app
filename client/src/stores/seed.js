import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";

export const useSeedStore = defineStore("seed", {
	state() {
		return {
			seed: [],
		};
	},
	actions: {
		async fetchSeed() {
			try {
				const { data } = await axios({
					url: `${baseUrl}/items/seeds`,
					method: "GET",
				});
				this.seed = data;
			} catch (err) {
				console.log(err);
			}
		},
	},
});

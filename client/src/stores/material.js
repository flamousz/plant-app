import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";

export const useMaterialStore = defineStore("material", {
	state() {
		return {
			materials: [],
		};
	},
	actions: {
		async fetchMaterial() {
			try {
				const { data } = await axios({
					url: `${baseUrl}/materials`,
					method: "GET",
				});
				this.materials = data;
			} catch (err) {
				console.log(err);
			}
		},
	},
});

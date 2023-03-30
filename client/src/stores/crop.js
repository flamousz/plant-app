import axios from "axios";
export const baseUrl = "http://localhost:3000";
import { defineStore } from "pinia";

export const useCropStore = defineStore("crop", {
	state() {
		return {
			crop: [],
		};
	},
	actions: {
		async fetchCrop() {
			try {
				const { data } = await axios({
					url: `${baseUrl}/crops`,
					method: "GET",
				});

				this.crop = data;
			} catch (err) {
				console.log(err);
			}
		},
	}
});

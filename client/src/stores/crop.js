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
		async postCrop(val) {
			try {
				console.log('masuk');
				const { data } = await axios({
					url: `${baseUrl}/crops`,
					method: "POST",
					data: val,
				});
				this.router.push("/crop");
				Toastify({
					text: data,
					style: {
						background: "linear-gradient(to right, #58c389, #7dd382)",
					},

					duration: 2000,
				}).showToast();
			} catch (err) {
				console.log(err);
				Toastify({
					text: `${err.response.data.message}`,
					style: {
						background: "linear-gradient(to right, #611302, #a62103)",
					},

					duration: 2000,
				}).showToast();
			}
		},
		async deleteCrop(id) {
			try {
				const { data } = await axios({
					url: `${baseUrl}/crops/${id}`,
					method: "DELETE",
				});

				this.fetchCrop();
				this.router.push("/crop");
				Toastify({
					text: data,
					style: {
						background: "linear-gradient(to right, #58c389, #7dd382)",
					},

					duration: 2000,
				}).showToast();
			} catch (err) {
				Toastify({
					text: `${err.response.data.message}`,
					style: {
						background: "linear-gradient(to right, #611302, #a62103)",
					},

					duration: 2000,
				}).showToast();
			}
		},
	},
});

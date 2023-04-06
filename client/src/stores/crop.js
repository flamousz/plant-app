import axios from "axios";
export const baseUrl = "http://localhost:3000";
import { defineStore } from "pinia";

export const useCropStore = defineStore("crop", {
	state() {
		return {
			crop: [],
			materials: [],
			cropDetail: {},
			editFlag: false,
		};
	},
	actions: {
		async fetchMaterial() {
			try {
				this.editFlag = false
				const { data } = await axios({
					url: `${baseUrl}/items/materials`,
					method: "GET",
				});
				this.materials = data;
			} catch (err) {
				console.log(err);
			}
		},
		async fetchCrop() {
			try {
				this.editFlag = false
				const { data } = await axios({
					url: `${baseUrl}/plantsheet`,
					method: "GET",
				});
				this.crop = data;
			} catch (err) {
				console.log(err);
			}
		},
		async putCrop(val) {
			try {
				const { id } = val;
				const { data } = await axios({
					url: `${baseUrl}/crops/${id}`,
					method: "PUT",
					data: val,
				});
				this.editFlag = false;
				this.fetchCrop();
				this.router.push("/crop");
				Toastify({
					text: data,
					style: {
						background: "linear-gradient(to right, #58c389, #7dd382)",
					},

					duration: 2000,
				}).showToast();
				console.log(this.editFlag,'ini edit flad di crop store');
			} catch (err) {
				console.log(err);
			}
		},
		async getCropById(id) {
			try {
				this.editFlag = true;
				console.log(`masuk dengan id ${id}`);
				const { data } = await axios({
					url: `${baseUrl}/plantsheet/${id}`,
					method: "GET",
				});
				console.log(data, 'ini data dari store');
				this.cropDetail = data;
				// console.log(this.cropDetail, "< crop detail");
			} catch (err) {
				console.log(err);
			}
		},
		async postCrop(val) {
			try {
				console.log("masuk");
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
					url: `${baseUrl}/plantdata/${id}`,
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

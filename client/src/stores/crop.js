import axios from "axios";
export const baseUrl = "http://localhost:3000";
import { defineStore } from "pinia";

export const useCropStore = defineStore("crop", {
	state() {
		return {
			crop: [],
			cropDetail: {},
			editFlag: false,
			query: {
                filter: 'avail',
            }
		};
	},
	actions: {
		async fetchCropPlain() {
			try {
				this.editFlag = false;

				const { data } = await axios({
					url: `${baseUrl}/plantsheet`,
					method: "GET",
				});
				this.crop = data;
			} catch (err) {
				console.log(err);
			}
		},
		async fetchCrop() {
			try {
				this.editFlag = false;
				let queryCrop = this.query
				this.router.replace({name: 'crop', query: queryCrop}) 

				const { data } = await axios({
					url: `${baseUrl}/plantsheet`,
					method: "GET",
					params: queryCrop
				});
				this.crop = data;
			} catch (err) {
				console.log(err);
			}
		},
		async patchCrop(val) {
			try {
				console.log(val, "ini data patch");
				const { id } = val;
				const { data } = await axios({
					url: `${baseUrl}/plantsheet/${id}`,
					method: "PATCH",
					data: val,
				});
				this.editFlag = false;
				this.getCropById(id);
				Toastify({
					text: data,
					gravity: "bottom", // `top` or `bottom`
					position: "left",
					style: {
						background: "linear-gradient(to left, #58c389, #7dd382)",
					},

					duration: 2000,
				}).showToast();
			} catch (err) {
				console.log(err);
			}
		},
		async putCrop(val) {
			try {
				const { id } = val;
				console.log(id, "<<< ini id");
				console.log("<<< masuk putCrop");
				console.log(
					val,
					"<<< ini cropData yg diambil dari halaman edit dan sampe di crop store"
				);
				const { data } = await axios({
					url: `${baseUrl}/plantsheet/${id}`,
					method: "PUT",
					data: val,
				});
				this.editFlag = false;
				// this.fetchCrop();
				this.router.push(`/detailplant/${id}`);
				Toastify({
					text: data,
					style: {
						background: "linear-gradient(to right, #58c389, #7dd382)",
					},

					duration: 2000,
				}).showToast();
				console.log(this.editFlag, "ini edit flad di crop store");
			} catch (err) {
				console.log(err);
			}
		},
		async getCropById(id) {
			try {
				// this.editFlag = true;
				// console.log(`masuk dengan id ${id}`);
				const { data } = await axios({
					url: `${baseUrl}/plantsheet/${id}`,
					method: "GET",
				});
				// console.log(data, "ini data dari store");
				this.cropDetail = data;
				// console.log(this.cropDetail, "< crop detail");
			} catch (err) {
				console.log(err);
			}
		},
		async getCropByIdForEdit(id) {
			try {
				this.editFlag = true;
				console.log(`masuk dengan id ${id} untuk edit`);
				const { data } = await axios({
					url: `${baseUrl}/plantsheet/${id}`,
					method: "GET",
				});
				console.log(data, "ini data dari store");
				this.cropDetail = data;
				this.router.push("/formplantsheet");
				// console.log(this.cropDetail, "< crop detail");
			} catch (err) {
				console.log(err);
			}
		},
		async postCrop(val) {
			try {
				console.log("masuk postCrop");
				console.log(val, "val dari crop store");
				const { data } = await axios({
					url: `${baseUrl}/plantsheet`,
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
				console.log(`tanamanan dengan id ${id} masuk ke crop store`);
				const { data } = await axios({
					url: `${baseUrl}/plantsheet/${id}`,
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

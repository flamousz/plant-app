import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";

export const useTaskSheetStore = defineStore("tasksheet", {
	state() {
		return {
			taskSheets: [],
			editFlag: false,
			taskSheetDetail: {},
			query: {
				filterPlant: null,
				filterLocation: null,
				commonDate: [new Date(), null],
			},
		};
	},
	actions: {
		async fetchTaskSheetById(id) {
			try {
				const { data } = await axios({
					url: `${baseUrl}/task/sheet/${id}`,
					method: "GET",
				});
				this.taskSheetDetail = data;
				console.log(this.taskSheetDetail, "<<<< ini taskSheetDetail store");
				this.router.push(`/tasksheet/${id}`);
			} catch (error) {
				console.log();
				Toastify({
					text: `${error.response.data.message}`,
					style: {
						background: "linear-gradient(to right, #611302, #a62103)",
					},

					duration: 2000,
				}).showToast();
			}
		},
		async putTaskSheetVerification(val, id){
			try {
				console.log(val, 'ini val dari putTaskSheetVerification di STORE');
				const {data} = await axios ({
					url: `${baseUrl}/task/sheet`,
					method: 'PUT',
					data: val,
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
				
				this.fetchTaskSheetById(id)
				Toastify({
					text: data,
					style: {
						background: "linear-gradient(to right, #58c389, #7dd382)",
					},

					duration: 2000,
				}).showToast();
			} catch (error) {
				console.log(error);
				Toastify({
					text: `${error.response.data.message}`,
					style: {
						background: "linear-gradient(to right, #611302, #a62103)",
					},

					duration: 2000,
				}).showToast();
			}
		},
		async postTaskSheet(val) {
			try {
				const { data } = await axios({
					url: `${baseUrl}/task/sheet`,
					method: "POST",
					data: val,
				});
				this.router.push('/tasksheet')
				Toastify({
					text: data,
					style: {
						background: "linear-gradient(to right, #58c389, #7dd382)",
					},

					duration: 2000,
				}).showToast();
			} catch (error) {
				console.log(error);
				Toastify({
					text: `${error.response.data.message}`,
					style: {
						background: "linear-gradient(to right, #611302, #a62103)",
					},

					duration: 2000,
				}).showToast();
			}
		},
		async fetchTaskSheet() {
			try {
				this.router.replace({
					name: "Task Sheet",
					query: this.query,
				});
				console.log(this.query, '"<< query dari useTaskSheetStore"');
				const { data } = await axios({
					url: `${baseUrl}/task/sheet`,
					method: "GET",
					params: this.query
				});
				this.taskSheets = data;
			} catch (error) {
				console.log();
				Toastify({
					text: `${error.response.data.message}`,
					style: {
						background: "linear-gradient(to right, #611302, #a62103)",
					},

					duration: 2000,
				}).showToast();
			}
		},
	},
});

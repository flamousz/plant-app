import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";

export const useEmployeeStore = defineStore("employee", {
	state() {
		return {
			employees: [],
			employeeDetail: {},
			editFlag: false,
			query: {
				filter: "",
			},
		};
	},
	actions: {
		async putEmployeeAtTaskSheet(val) {
			try {
				console.log("masuk ke putEmployeeAtTaskSheet di useEmployeeStore");
				console.log(
					val,
					"ini val di putEmployeeAtTaskSheet, employee store"
					)

				const { data } = await axios({
					url: `${baseUrl}/employees/task`,
					method: "PUT",
					data: val,
				});

				Toastify({
					text: data,
					style: {
						background: "linear-gradient(to right, #58c389, #7dd382)",
					},

					duration: 2000,
				}).showToast();
				console.log(this.editFlag, "ini edit flag di employee store");
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
		async fetchEmployeeAtTaskSheet(val) {
			try {
				console.log(
					"masuk ke fetchEmployeeAtTaskSheet di useEmployeeStore"
				);
				console.log(
					val,
					"ini val di fetchEmployeeAtTaskSheet, employee store"
				);
				const { data } = await axios({
					url: `${baseUrl}/employees/task`,
					method: "POST",
					data: val,
				});
				console.log(data, "ini data dari store");
				this.employees = data;
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
		async patchEmployee(val) {
			try {
				console.log(val, "ini data patch");
				const { id } = val;
				const { data } = await axios({
					url: `${baseUrl}/employees/${id}`,
					method: "PATCH",
					data: val,
				});
				this.editFlag = false;
				this.getEmployeeById(id);
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
		async getEmployeeById(id) {
			try {
				// this.editFlag = true;
				console.log(`masuk dengan id ${id}`);
				const { data } = await axios({
					url: `${baseUrl}/employees/${id}`,
					method: "GET",
				});
				console.log(data, "ini data dari store");
				this.employeeDetail = data;
				// console.log(this.cropDetail, "< crop detail");
			} catch (err) {
				console.log(err);
			}
		},
		async getEmployeeByIdForEdit(id) {
			try {
				console.log(`masuk dengan id ${id} untuk edit`);
				const { data } = await axios({
					url: `${baseUrl}/employees/${id}`,
					method: "GET",
				});
				this.editFlag = true;
				console.log(data, "ini data dari store");
				this.employeeDetail = data;
				this.router.push(`/employee/form`);
				// console.log(this.cropDetail, "< crop detail");
			} catch (err) {
				console.log(err);
			}
		},
		async putEmployee(val) {
			try {
				const { id } = val;
				console.log(id, "<<< ini id");
				console.log(
					val,
					"<<< ini cropData yg diambil dari halaman edit dan sampe di employee store"
				);
				const { data } = await axios({
					url: `${baseUrl}/employees/${id}`,
					method: "PUT",
					data: val,
				});
				this.editFlag = false;
				this.router.push(`/employee/detail/${id}`);
				Toastify({
					text: data,
					style: {
						background: "linear-gradient(to right, #58c389, #7dd382)",
					},

					duration: 2000,
				}).showToast();
				console.log(this.editFlag, "ini edit flag di employee store");
			} catch (err) {
				console.log(err);
			}
		},
		async fetchEmployee() {
			try {
				let queryEmployee = this.query;
				this.router.replace({ name: "employee", query: queryEmployee });

				const { data } = await axios({
					url: `${baseUrl}/employees`,
					method: "GET",
					params: queryEmployee,
				});
				this.employees = data.rows;
			} catch (err) {
				console.log(err);
			}
		},
		async postEmployee(val) {
			try {
				const { data } = await axios({
					url: `${baseUrl}/employees`,
					method: "POST",
					data: val,
				});
				this.router.push("/employee");
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
		async deleteEmployee(id) {
			try {
				const { data } = await axios({
					url: `${baseUrl}/employees/${id}`,
					method: "DELETE",
				});
				this.router.push("/employee");
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
	},
});

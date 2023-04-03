import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";

export const useEmployeeStore = defineStore("employee", {
	state() {
		return {
			employees: [],
		};
	},
	actions: {
		async fetchEmployee() {
			try {
				const { data } = await axios({
					url: `${baseUrl}/employees`,
					method: "GET",
				});
				this.employees = data;
			} catch (err) {
				console.log(err);
			}
		},
		async postEmployee(val) {
			try {
				const { data } = await axios({
					url: `${baseUrl}/employees`,
					method: [post],
					data: val,
				});
				this.router.push("/employees");
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
		async deleteEmployee(id){
			try {
				const {data}=await axios({
					url: `${baseUrl}/employees/${id}`,
					method: 'DELETE'
				})
				this.fetchEmployee()
				this.router.push('/employee')
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
		}
	},
});

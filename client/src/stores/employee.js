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
	},
});

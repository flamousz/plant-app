import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";

export const useTaskStore = defineStore("task", {
	state() {
		return {
			taskDetail: {},
			tasks: [],
			editFlag: false,
			query: {
                filter: 'avail'
            },
		};
	},
	actions: {
		async putTask(val) {
			try {
				const { id } = val;
				console.log(id, "<<< ini id");
				console.log(
					val,
					"<<< ini cropData yg diambil dari halaman edit dan sampe di item store"
				);
				const { data } = await axios({
					url: `${baseUrl}/task/${id}`,
					method: "PUT",
					data: val,
				});
				this.editFlag = false;
				this.router.push(`/taskmaster/${id}`);
				Toastify({
					text: data,
					style: {
						background: "linear-gradient(to right, #58c389, #7dd382)",
					},

					duration: 2000,
				}).showToast();
				console.log(this.editFlag, "ini edit flad di item store");
			} catch (err) {
				console.log(err);
			}
		},
		async fetchBasicTasks(){
			try {
				const {data} = await axios({
					url: `${baseUrl}/task`,
					method: 'GET'
				})

				this.tasks = data
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
		}
		,
		async fetchTasks() {
			try {
				let queryTask = this.query
				this.router.replace({
					name: 'Task Master',
					query: queryTask
				})
				
				const { data } = await axios({
					url: `${baseUrl}/task`,
					method: "GET",
					params: queryTask
				});

				this.tasks = data;
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

		async postTask(value) {
			try {
                console.log("masuk ke postTask");
				console.log(value, "value dari postTask");
				const { data } = await axios({
					url: `${baseUrl}/task`,
					method: "POST",
					data: value,
				});
				this.router.push("/taskmaster");
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
		async patchTask(val) {
			try {
				console.log(val, "ini data patchTask store");
				const { id } = val;
				const { data } = await axios({
					url: `${baseUrl}/task/${id}`,
					method: "PATCH",
					data: val,
				});
				this.editFlag = false;
				this.getTaskById(id)
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
				Toastify({
					text: `${err.response.data.message}`,
					style: {
						background: "linear-gradient(to right, #611302, #a62103)",
					},

					duration: 2000,
				}).showToast();
			}
		},
		async getTaskById(id) {
			try {
				// this.editFlag = true;
				this.editFlag = false
				console.log(`masuk dengan id ${id} di getTaskById store`);
				const { data } = await axios({
					url: `${baseUrl}/task/${id}`,
					method: "GET",
				});
				console.log(data, "ini data dari store");
				this.taskDetail = data;
				// console.log(this.cropDetail, "< crop detail");
			} catch (err) {
				console.log(err);
			}
		},
		async getTaskByIdForEdit(id) {
			try {
				console.log(`masuk dengan id ${id} untuk getTaskByIdForEdit`);
				const { data } = await axios({
					url: `${baseUrl}/task/${id}`,
					method: "GET",
				});
				this.editFlag = true;
				console.log(data, "ini data dari store");
				this.taskDetail = data;
				this.router.push(`/taskmaster/form`);
				// console.log(this.cropDetail, "< crop detail");
			} catch (err) {
				console.log(err);
			}
		},
		async deleteTask(id){
			try {
				const {data}=await axios({
					url: `${baseUrl}/task/${id}`,
					method: 'DELETE'
				})
				this.router.push('/task')
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

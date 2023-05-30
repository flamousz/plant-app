import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";

export const usePlantScheduleStore = defineStore("plantschedule", {
	state() {
		return {
			plantSchedules: [],
			editFlag: false,
			harvestRealization: [],
			plantSchedulesDetail: {},
			query: {
				filterPlant: "",
				filterLocation: "",
				commonDate: null,
				filterDate: "",
			},
		};
	},
	getters: {
		formatDate: () => (selectedDate) => {
			if (!selectedDate) {
				return "";
			}
			const formattedDate = new Date(selectedDate).toLocaleDateString(
				"en-AU",
				{
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric",
				}
			);

			return formattedDate;
		},
	},
	actions: {
		async handleFalseEditFlag() {
			console.log("masuk ke usePlantScheduleStore");
			console.log("masuk ke handleFalseEditFlag");
			this.editFlag = false;
		},
		async patchStatusPlantSchedules(val){
			try {
				console.log(val, 'ini val di patchStatusPlantSchedules store');
				const {data} = await axios({
					url: `${baseUrl}/plantschedule`,
					method: 'PATCH',
					data: val
				})
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
		async putPlantSchedules(value) {
			try {
                console.log('masuk ke putPlantSchedules');
                console.log(value, ' ini datanya');
				const { data } = await axios({
					url: `${baseUrl}/plantschedule`,
					method: "PUT",
					data: value,
				});
				this.editFlag = false;
                this.router.push(`/plantschedule/${value.id}`)
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
				Toastify({
					text: `${err.response.data.message}`,
					style: {
						background: "linear-gradient(to right, #611302, #a62103)",
					},

					duration: 2000,
				}).showToast();
			}
		},
		async postPlantSchedules(value) {
			try {
				console.log("masuk");
				console.log(value, "value dari plantschedule store");
				const { data } = await axios({
					url: `${baseUrl}/plantschedule`,
					method: "POST",
					data: value,
				});
				this.router.push("/plantschedule");
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
		async fetchPlantSchedules() {
			try {
				this.router.replace({
					name: "plantschedule",
					query: this.query,
				});
				console.log(this.query, "<< query dari store plant schedule");
				const { data } = await axios({
					url: `${baseUrl}/plantschedule`,
					method: "GET",
					params: this.query,
				});

				this.plantSchedules = data;
			} catch (error) {
				console.log(error);
			}
		},
		async fetchPlantSchedulesTaskSheet() {
			try {
				this.router.replace({
					name: "Task Sheet",
					query: this.query,
				});
				console.log(this.query, "<< query dari store plant schedule");
				const { data } = await axios({
					url: `${baseUrl}/plantschedule/task`,
					method: "GET",
					params: this.query,
				});

				this.plantSchedules = data;
			} catch (error) {
				console.log(error);
			}
		},
		async fetchPlantSchedulesById(id) {
			try {
				const { data } = await axios({
					url: `${baseUrl}/plantschedule/${id}`,
					method: "GET",
				});

				this.plantSchedulesDetail = data;
			} catch (error) {
				console.log(error);
			}
		},
		async fetchPlantSchedulesByIdForEdit(id) {
			try {
				console.log(
					`masuk dengan id ${id} untuk edit di fetchPlantSchedulesByIdForEdit`
				);
				const { data } = await axios({
					url: `${baseUrl}/plantschedule/${id}`,
					method: "GET",
				});
				this.editFlag = true;
				this.plantSchedulesDetail = data;
				this.router.push("/plantschedule/form");
			} catch (error) {
				console.log(error);
			}
		},
		async fetchHarvestRealization(id) {
			try {
				const { data } = await axios({
					url: `${baseUrl}/harvestoutcome/${id}`,
					method: "GET",
				});
				this.harvestRealization = data;
			} catch (error) {
				console.log(error);
			}
		},
		async postHarvestOutcome(value) {
			try {
				console.log("masuk ke postHarvestOutcome");
				console.log(
					value,
					"value dari postHarvestOutcome di plantschedule store"
				);
				const { data } = await axios({
					url: `${baseUrl}/harvestoutcome`,
					method: "POST",
					data: value,
				});
				console.log(
					value.PlantScheduleId,
					"<<<<<<< ini value.PlantScheduleId"
				);
				this.router.push(`/plantschedule/${value.PlantScheduleId}`);
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

import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";


export const usePlantScheduleStore = defineStore('plantschedule', {
    state(){
        return {
            plantSchedules: [],
            editFlag: false,
            harvestRealization: [],
            plantSchedulesDetail: {},
            query: {
                filterPlant: '',
                filterLocation: '',
                commonDate: null,
                filterDate: '',
            }
        }
    },
    actions: {
        async postHarvestOutcome(value){
            try {
                console.log("masuk ke postHarvestOutcome");
				console.log(value, "value dari postHarvestOutcome di plantschedule store");
                const {data} = await axios({
                    url: `${baseUrl}/harvestoutcome`,
                    method: 'POST',
                    data: value
                })
                console.log(value.PlantScheduleId, '<<<<<<< ini value.PlantScheduleId');
                this.router.push(`/plantschedule/${value.PlantScheduleId}`)
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
        async postPlantSchedules(value){
            try {
                console.log("masuk");
				console.log(value, "value dari plantschedule store");
                const {data} = await axios ({
                    url: `${baseUrl}/plantschedule`,
                    method: 'POST',
                    data: value
                })
                this.router.push('/plantschedule')
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
        async fetchPlantSchedules(){
            try {
                this.router.replace({
                    name: 'plantschedule',
                    query: this.query
                })
                console.log(this.query,'<< query dari store plant schedule');
                const {data} = await axios({
                    url: `${baseUrl}/plantschedule`,
                    method: 'GET',
                    params: this.query
                })

                this.plantSchedules = data
            } catch (error) {
                console.log(error);
            }
        },
        async fetchPlantSchedulesById(id){
            try {
                const {data} = await axios({
                    url: `${baseUrl}/plantschedule/${id}`,
                    method: 'GET'
                })

                this.plantSchedulesDetail = data
            } catch (error) {
                console.log(error)
            }
        },
        async fetchPlantSchedulesByIdForEdit(id){
            try {
                console.log(`masuk dengan id ${id} untuk edit di fetchPlantSchedulesByIdForEdit`);
                const {data} = await axios({
                    url: `${baseUrl}/plantschedule/${id}`,
                    method: 'GET'
                })
                this.editFlag = true
                this.plantSchedulesDetail = data
                this.router.push('/plantschedule/form')
            } catch (error) {
                console.log(error);
            }
        },
        async fetchHarvestRealization(id){
            try {
                const {data} = await axios({
                    url: `${baseUrl}/harvestoutcome/${id}`,
                    method: 'GET'
                })
                this.harvestRealization = data
            } catch (error) {
                console.log(error);
            }
        }
    }
})
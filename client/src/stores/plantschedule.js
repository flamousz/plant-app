import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";


export const usePlantScheduleStore = defineStore('plantschedule', {
    state(){
        return {
            plantSchedules: [],
            plantSchedulesDetail: {},
            query: {
                filterPlant: '',
                filterLocation: '',
                commonDate: null,
                filterDate: ''
            }
        }
    },
    actions: {
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
        }
    }
})
import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";


export const usePlantScheduleStore = defineStore('plantschedule', {
    state(){
        return {
            plantSchedules: [],
            plantSchedulesDetail: {},
            query: {
                filter: ''
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
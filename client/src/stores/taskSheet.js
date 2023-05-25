import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";



export const useTaskSheetStore = defineStore('tasksheet', {
    state(){
        return{
            taskSheets: []
        }
    },
    actions: {
        async fetchTaskSheet(){
            try {
                const {data} = await axios({
                    url: `${baseUrl}/task/sheet`,
                    method: 'GET'
                })
                this.taskSheets = data
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
    }
})
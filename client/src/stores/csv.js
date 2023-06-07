import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";



export const useCsvStore = defineStore('csv', {
    state(){
        return{

        }
    },
    actions: {
        async postExportTaskMaster(val){
            try {
                console.log('masuk ke postExportTaskMaster STORE');
                console.log(val, '<<<< ini val');

                await axios({
                    url: `${baseUrl}/csv/export`,
                    method: 'GET',
                })
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
        }
    }
})
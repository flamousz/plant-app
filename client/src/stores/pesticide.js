import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";



export const usePesticideStore=defineStore('pesticide', {
    state(){
        return{
            pesticides:[]
        }
    },
    actions: {
        async fetchPesticide(){
            try {
                const {data}=await axios ({
                    url: `${baseUrl}/pesticides`,
                    method: 'GET'
                })

                this.pesticides=data
            } catch (err) {
                console.log(err);
            }
        }
    }
})
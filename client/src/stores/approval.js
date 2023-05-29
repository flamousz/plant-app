import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";



export const useApprovalStore = defineStore('approval', {
    state(){
        return{
            approval: []
        }
    },
    actions: {
        async fetchApprovals(val){
            try {
                console.log(val, 'ini val dan masuk ke fetchApprovals di useApprovalStore');
                const {data} = await axios({
                    url: `${baseUrl}/approvals`,
                    method: 'POST',
                    data: val
                })
                this.approval = data
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
    }
})
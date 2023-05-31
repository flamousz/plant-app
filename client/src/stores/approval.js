import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";



export const useApprovalStore = defineStore('approval', {
    state(){
        return{
            approval: [],
            masterApproval: []
        }
    },
    actions: {
        async fetchMasterApprovals(){
            try {
                console.log(' masuk ke fetchMasterApprovals di USEAPPROVALSTORE');
                const {data} = await axios({
                    url: `${baseUrl}/approvals/master`,
                    method: 'GET'
                })
                this.masterApproval = data
            } catch (error) {
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
        async fetchRejectedApprovals(){
            try {
                console.log(' masuk ke fetchRejectedApprovals di USEAPPROVALSTORE');
                const {data } = await axios({
                    url: `${baseUrl}/approvals`,
                    method: 'GET'
                })
                this.approval = data
            } catch (error) {
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
        async fetchApprovals(val){
            try {
                // console.log(val, 'ini val dan masuk ke fetchApprovals di USEAPPROVALSTORE');
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
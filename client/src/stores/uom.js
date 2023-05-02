import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";

export const useUomStore = defineStore('uom', {
    state() {
        return {
            uoms: [],
            uomDetail: {},
            editFlag: false,
            query: {
                filter: ''
            },
			sidebarFlag: false
        }
    },
    actions: {
		async handleSidebarFlag() {
			console.log("masuk ke useUomStore");
			console.log("masuk ke handleFalsesidebarFlag");
			this.sidebarFlag = true;
			console.log(this.sidebarFlag,"ini this.sidebarFlag");
		},async handleSidebarFlagFalse() {
			console.log("masuk ke useUomStore");
			console.log("masuk ke handleSidebarFlagFalse");
			this.sidebarFlag = false;
			console.log(this.sidebarFlag,"ini this.sidebarFlag");
		},
        async patchUom(val) {
			try {
				console.log(val, "ini data patch");
				const { id } = val;
				const { data } = await axios({
					url: `${baseUrl}/uoms/${id}`,
					method: "PATCH",
					data: val,
				});
				this.editFlag = false;
				this.getUomById(id)
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
			}
		},
        async getUomById(id) {
			try {
				// this.editFlag = true;
				console.log(`masuk dengan id ${id}`);
				const { data } = await axios({
					url: `${baseUrl}/uoms/${id}`,
					method: "GET",
				});
				console.log(data, "ini data dari store");
				this.uomDetail = data;
				// console.log(this.cropDetail, "< crop detail");
			} catch (err) {
				console.log(err);
			}
		},
        async getUomByIdForEdit(id) {
			try {
				console.log(`masuk dengan id ${id} untuk edit`);
				const { data } = await axios({
					url: `${baseUrl}/uoms/${id}`,
					method: "GET",
				});
				this.editFlag = true;
				console.log(data, "ini data dari store");
				this.uomDetail = data;
				this.router.push(`/uomform`);
				// console.log(this.cropDetail, "< crop detail");
			} catch (err) {
				console.log(err);
			}
		},
        async putUom(val) {
			try {
				const { id } = val;
				console.log(id, "<<< ini id");
				console.log(
					val,
					"<<< ini cropData yg diambil dari halaman edit dan sampe di uom store"
				);
				const { data } = await axios({
					url: `${baseUrl}/uoms/${id}`,
					method: "PUT",
					data: val,
				});
				this.editFlag = false;
				this.router.push(`/uomdetail/${id}`);
				Toastify({
					text: data,
					style: {
						background: "linear-gradient(to right, #58c389, #7dd382)",
					},

					duration: 2000,
				}).showToast();
				console.log(this.editFlag, "ini edit flag di uom store");
			} catch (err) {
				console.log(err);
			}
		},
        async fetchUom() {
			try {
				let queryUom = this.query
				this.router.replace({name: 'uom', query: queryUom})

				const { data } = await axios({
					url: `${baseUrl}/uoms`,
					method: "GET",
					params: queryUom
				});
				this.uoms = data.rows;
			} catch (err) {
				console.log(err);
			}
		},
        async postUom(val) {
			try {
				const { data } = await axios({
					url: `${baseUrl}/uoms`,
					method: 'POST',
					data: val,
				});
				this.router.push("/uom");
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
		},
        async deleteUom(id){
			try {
				const {data}=await axios({
					url: `${baseUrl}/uoms/${id}`,
					method: 'DELETE'
				})
				this.router.push('/uom')
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
    }
})
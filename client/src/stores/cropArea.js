import { defineStore } from "pinia";
const baseUrl = "http://localhost:3000"
import axios from 'axios'


export const useCropAreaStore = defineStore('cropArea', {
    state() {
        return {
            cropArea: [],
            allpage: 0,
            query: {
                filter: '',
                page: 0,
                search: ''
            },
            cropAreaDetail: {},
            editFlag: false
        }
    },
    actions: {
		async fetchAllCropArea(){
			try {
				const {data} = await axios({
					url: `${baseUrl}/cropareas/all`,
					method: 'GET'
				})
				this.cropArea = data
			} catch (error) {
				console.log(error);
			}
		},
        async putCropArea(val) {
			try {
				const { id } = val;
				console.log(id, "<<< ini id");
				console.log(
					val,
					"<<< ini cropData yg diambil dari halaman edit dan sampe di item store"
				);
				const { data } = await axios({
					url: `${baseUrl}/cropareas/${id}`,
					method: "PUT",
					data: val,
				});
				this.editFlag = false;
				this.router.push(`/croparea/detail/${id}`);
				Toastify({
					text: data,
					style: {
						background: "linear-gradient(to right, #58c389, #7dd382)",
					},

					duration: 2000,
				}).showToast();
				console.log(this.editFlag, "ini edit flad di item store");
			} catch (err) {
				console.log(err);
			}
		},
        async deleteCropArea(id) {
			try {
				console.log(`item dengan id ${id} masuk ke item store`);
				const { data } = await axios({
					url: `${baseUrl}/cropareas/${id}`,
					method: "DELETE",
				});

				this.fetchCropArea();
				this.router.push("/croparea");
				Toastify({
					text: data,
					style: {
						background: "linear-gradient(to right, #58c389, #7dd382)",
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
        async patchCropArea(val) {
			try {
				console.log(val, "ini data patch");
				const { id } = val;
				const { data } = await axios({
					url: `${baseUrl}/cropareas/${id}`,
					method: "PATCH",
					data: val,
				});
				this.editFlag = false;
				this.getCropAreaById(id)
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
        async getCropAreaByIdForEdit(id) {
			try {
				console.log(`masuk dengan id ${id} untuk edit`);
				const { data } = await axios({
					url: `${baseUrl}/cropareas/${id}`,
					method: "GET",
				});
				this.editFlag = true;
				console.log(data, "ini data dari store");
				this.cropAreaDetail = data;
				this.router.push(`/croparea/form`);
				// console.log(this.cropDetail, "< crop detail");
			} catch (err) {
				console.log(err);
			}
		},
        async getCropAreaById(id) {
			try {
				// this.editFlag = true;
				console.log(`masuk dengan id ${id}`);
				const { data } = await axios({
					url: `${baseUrl}/cropareas/${id}`,
					method: "GET",
				});
				console.log(data, "ini data dari store");
				this.cropAreaDetail = data;
				// console.log(this.cropDetail, "< crop detail");
			} catch (err) {
				console.log(err);
			}
		},
        async postCropArea(val) {
			try {
				console.log("masuk");
				console.log(val, "val dari crop store");
				const { data } = await axios({
					url: `${baseUrl}/cropareas`,
					method: "POST",
					data: val,
				});
				this.router.push("/croparea");
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
        async fetchCropArea() {
            try {
                let queryCropArea = this.query

                if (!queryCropArea.filter) {
                    delete queryCropArea.filter
                }
                if (!queryCropArea.page) {
                    delete queryCropArea.page
                }
                if (!queryCropArea.search) {
                    delete queryCropArea.search
                }
                this.router.replace({name: 'cropArea', query: queryCropArea})

                const {data} = await axios ({
                    url: `${baseUrl}/cropareas`,
                    method: 'GET',
                    params: queryCropArea
                })

                this.cropArea=data.rows
                this.allPage= Math.ceil(data.count/8)
            } catch (err) {
                console.log(err);
            }
        }
    }
})
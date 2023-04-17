import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";


export const useCategoryStore = defineStore('category', {
    state() {
        return {
            categories: [],
            categoryDetail: {},
            editFlag: false,
            query: {
                filter: ''
            }
        }
    },
    actions: {
        async patchCategory(val) {
			try {
				console.log(val, "ini data patch");
				const { id } = val;
				const { data } = await axios({
					url: `${baseUrl}/categories/${id}`,
					method: "PATCH",
					data: val,
				});
				this.editFlag = false;
				this.getCategoryById(id)
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
        async getCategoryById(id) {
			try {
				// this.editFlag = true;
				console.log(`masuk dengan id ${id}`);
				const { data } = await axios({
					url: `${baseUrl}/categories/${id}`,
					method: "GET",
				});
				console.log(data, "ini data dari store");
				this.categoryDetail = data;
				// console.log(this.cropDetail, "< crop detail");
			} catch (err) {
				console.log(err);
			}
		},
        async getCategoryByIdForEdit(id) {
			try {
				console.log(`masuk dengan id ${id} untuk edit`);
				const { data } = await axios({
					url: `${baseUrl}/categories/${id}`,
					method: "GET",
				});
				this.editFlag = true;
				console.log(data, "ini data dari store");
				this.categoryDetail = data;
				this.router.push(`/categoryform`);
				// console.log(this.cropDetail, "< crop detail");
			} catch (err) {
				console.log(err);
			}
		},
        async putCategory(val) {
			try {
				const { id } = val;
				console.log(id, "<<< ini id");
				console.log(
					val,
					"<<< ini cropData yg diambil dari halaman edit dan sampe di uom store"
				);
				const { data } = await axios({
					url: `${baseUrl}/categories/${id}`,
					method: "PUT",
					data: val,
				});
				this.editFlag = false;
				this.router.push(`/categorydetail/${id}`);
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
        async fetchCategory() {
			try {
				let queryCategory = this.query
				this.router.replace({name: 'category', query: queryCategory})

				const { data } = await axios({
					url: `${baseUrl}/categories`,
					method: "GET",
					params: queryCategory
				});
				this.categories = data.rows;
			} catch (err) {
				console.log(err);
			}
		},
        async postCategory(val) {
			try {
				const { data } = await axios({
					url: `${baseUrl}/categories`,
					method: 'POST',
					data: val,
				});
				this.router.push("/category");
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
        async deleteCategory(id){
			try {
				const {data}=await axios({
					url: `${baseUrl}/categories/${id}`,
					method: 'DELETE'
				})
				this.router.push('/category')
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
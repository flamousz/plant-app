import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";

export const useItemStore = defineStore("items", {
	state() {
		return {
			plants: [],
			plantTypes: [],
			materials: [],
			fertilizers: [],
			editFlag: false,
			fungiPesticides: [],
			insecticidePesticides: [],
			zptPesticides: [],
			perekatPesticides: [],
			seeds: [],
			pesticides: [],
			items: [],
			uoms: [],
			allpage: 0,
			categories: [],
			query: {
				filter: '',
				page: 0,
				search: '',
				filterStatus: ''
			},
			itemDetail: {},
			tools: []
		};
	},
	actions: {
		async fetchTool() {
			try {
				const {data} = await axios({
					url: `${baseUrl}/items/tools`,
					method: 'GET'
				})
				this.tools = data
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
		async fetchUom() {
			try {
				// this.editFlag = false;
				const { data } = await axios({
					url: `${baseUrl}/uoms`,
					method: "GET",
				});
				this.uoms = data;
			} catch (err) {
				console.log(err);
			}
		},
		async putItem(val) {
			try {
				const { id } = val;
				console.log(id, "<<< ini id");
				console.log(
					val,
					"<<< ini cropData yg diambil dari halaman edit dan sampe di item store"
				);
				const { data } = await axios({
					url: `${baseUrl}/items/${id}`,
					method: "PUT",
					data: val,
				});
				this.editFlag = false;
				this.router.push(`/item/detail/${id}`);
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
		async postItem(val) {
			try {
				console.log("masuk");
				console.log(val, "val dari crop store");
				const { data } = await axios({
					url: `${baseUrl}/items`,
					method: "POST",
					data: val,
				});
				this.router.push("/item");
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
		async deleteItem(id) {
			try {
				console.log(`item dengan id ${id} masuk ke item store`);
				const { data } = await axios({
					url: `${baseUrl}/items/${id}`,
					method: "DELETE",
				});

				this.fetchItem();
				this.router.push("/item");
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
		async patchItem(val) {
			try {
				console.log(val, "ini data patch");
				const { id } = val;
				const { data } = await axios({
					url: `${baseUrl}/items/${id}`,
					method: "PATCH",
					data: val,
				});
				this.editFlag = false;
				this.getItemById(id)
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
	
		async getItemByIdForEdit(id) {
			try {
				console.log(`masuk dengan id ${id} untuk edit`);
				const { data } = await axios({
					url: `${baseUrl}/items/${id}`,
					method: "GET",
				});
				this.editFlag = true;
				console.log(data, "ini data dari store");
				this.itemDetail = data;
				this.router.push(`/item/form`);
				// console.log(this.cropDetail, "< crop detail");
			} catch (err) {
				console.log(err);
			}
		},
		async getItemById(id) {
			try {
				// this.editFlag = true;
				console.log(`masuk dengan id ${id}`);
				const { data } = await axios({
					url: `${baseUrl}/items/${id}`,
					method: "GET",
				});
				console.log(data, "ini data dari store");
				this.itemDetail = data;
				// console.log(this.cropDetail, "< crop detail");
			} catch (err) {
				console.log(err);
			}
		},
		async fetchCategory(){
			try {
				// this.editFlag = false;
				const {data} = await axios({
					url: `${baseUrl}/categories`,
					method: 'GET'
				})
				this.categories = data.rows
			} catch (error) {
				console.log(error);
			}
			
		},
		async fetchItem() {
			try {
				// this.editFlag = false;
				let queryItem = this.query
				if (!queryItem.filter) {
					delete queryItem.filter
				}
				if (!queryItem.page) {
					delete queryItem.page
				}
				if (!queryItem.search) {
					delete queryItem.search
				}
				if (!queryItem.filterStatus) {
					delete queryItem.filterStatus
				}
				console.log(this.query,'<< ini query di fetchitem itemStore');
				this.router.replace({ name: 'item', query: queryItem })
				const { data } = await axios({
					url: `${baseUrl}/items`,
					method: "GET",
					params: queryItem
				});

				this.items = data.rows;
				this.allpage = Math.ceil(data.count / 8)
			} catch (error) {
				console.log(error);
			}
		},
		async fetchPesticide() {
			try {
				this.editFlag = false;
				const { data } = await axios({
					url: `${baseUrl}/items/pesticides`,
				});
				this.pesticides = data;
			} catch (err) {
				console.log(err);
			}
		},

		async fetchPlant() {
			try {
				this.editFlag = false;
				const { data } = await axios({
					url: `${baseUrl}/items/plant`,
				});
				this.plants = data;
			} catch (err) {
				console.log(err);
			}
		},
		async fetchPlantType() {
			try {
				this.editFlag = false;
				const { data } = await axios({
					url: `${baseUrl}/planttypes`,
				});
				this.plantTypes = data;
			} catch (err) {
				console.log(err);
			}
		},
		async fetchMaterial() {
			try {
				this.editFlag = false;
				const { data } = await axios({
					url: `${baseUrl}/items/materials`,
					method: "GET",
				});
				this.materials = data;
			} catch (err) {
				console.log(err);
			}
		},
		async fetchFertilizer() {
			try {
				this.editFlag = false;
				const { data } = await axios({
					url: `${baseUrl}/items/fertilizers`,
					method: "GET",
				});
				this.fertilizers = data;
			} catch (err) {
				console.log(err);
			}
		},

		async fetchFungiPesticide() {
			try {
				this.editFlag = false;
				const { data } = await axios({
					url: `${baseUrl}/items/pesticides/fungi`,
					method: "GET",
				});
				this.fungiPesticides = data;
			} catch (err) {
				console.log(err);
			}
		},

		async fetchInsecticidePesticide() {
			try {
				this.editFlag = false;
				const { data } = await axios({
					url: `${baseUrl}/items/pesticides/insecticide`,
					method: "GET",
				});
				this.insecticidePesticides = data;
			} catch (err) {
				console.log(err);
			}
		},

		async fetchZptPesticide() {
			try {
				this.editFlag = false;
				const { data } = await axios({
					url: `${baseUrl}/items/pesticides/zpt`,
					method: "GET",
				});
				this.zptPesticides = data;
			} catch (err) {
				console.log(err);
			}
		},

		async fetchPerekatPesticide() {
			try {
				this.editFlag = false;
				const { data } = await axios({
					url: `${baseUrl}/items/pesticides/perekat`,
					method: "GET",
				});
				this.perekatPesticides = data;
			} catch (err) {
				console.log(err);
			}
		},

		async fetchSeed() {
			try {
				this.editFlag = false;
				const { data } = await axios({
					url: `${baseUrl}/items/seeds`,
					method: "GET",
				});
				this.seeds = data;
			} catch (err) {
				console.log(err);
			}
		},
	},
});

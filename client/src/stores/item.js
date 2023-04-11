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
		};
	},
	actions: {
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

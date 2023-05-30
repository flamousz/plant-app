<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mapActions, mapState } from "pinia";
import { useCropAreaStore } from "../stores/cropArea";
import router from "../router";

export default {
	name: "MapPlainPage",
	methods: {
		...mapActions(useCropAreaStore, ["fetchAllCropArea"]),
	},
	computed: {
		...mapState(useCropAreaStore, ["cropArea"]),
		cropAreaReady() {
			return this.cropArea.length > 0;
		},
	},
	created() {
		this.fetchAllCropArea();
	},
	mounted() {
		console.log(this.cropAreaReady, "<<< ini this.cropAreaReady di mounted");
		if (this.cropAreaReady) {
			const map = L.map("map").setView([-7.201443, 107.601389], 18);

			const areas = [];
			for (let i = 0; i < this.cropArea.length; i++) {
				const opt = JSON.parse(this.cropArea[i].map);

				opt.forEach((Coords) => {
					[Coords[0], Coords[1]] = [Coords[1], Coords[0]];
				});

				const plantScheduleArea = this.cropArea[i].PlantSchedules.map(
					(el) => {
						return `<li><a href="/plantschedule/${el.id}">[ ${el.code} ] - ${el.PlantSheet.plant.name}</a></li>`;
					}
				);

				const plantScheduleList = `<ul>${plantScheduleArea.join("")}</ul>`;

				let color = "";
				let fillColor = "";
				if (this.cropArea[i].name.charAt(0) === "d") {
					color = "blue";
					fillColor = "#3654d9";
				} else if (this.cropArea[i].name.charAt(0) === "c") {
					color = "yellow";
					fillColor = "#e9f030";
				} else if (this.cropArea[i].name.charAt(0) === "e") {
					color = "green";
					fillColor = "#52ff94";
				} else if (this.cropArea[i].name.charAt(0) === "b") {
					color = "red";
					fillColor = "#f71e29";
				} else if (this.cropArea[i].name.charAt(0) === "f") {
					color = "#139c93";
					fillColor = "#1ef7e9";
				} else if (this.cropArea[i].name.charAt(0) === "h") {
					color = "#c46a10";
					fillColor = "#f08011";
				} else if (this.cropArea[i].name.charAt(0) === "g") {
					color = "#5fa85d";
					fillColor = "#8ef78b";
				}

				const polygon = L.polygon(opt, {
					color: color,
					fillColor: fillColor,
					fillOpacity: 1,
				}).addTo(map);

				polygon.bindPopup(
					`<b>${this.cropArea[i].name}</b><br>Area: ${this.cropArea[i].area} m<sup>2</sup><br>List of Schedule: ${plantScheduleList}`
				);

				polygon.on("mouseover", function () {
					this.openPopup();
				});

				polygon.on("click", (e) => {
					if (this.cropArea.length > i) {
						router.push(`/croparea/detail/${this.cropArea[i].id}`);
					}
				});

				areas.push(polygon);
			}

			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution:
					'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
				maxZoom: 20,
			}).addTo(map);

			if (this.mapFlag) {
				console.log("udah true");
			} else {
				console.log("masih false");
			}
		}
	},
};
</script>

<template>
	<!-- <pre>{{ mapFlag }}</pre> -->
	<!-- <pre>{{ cropArea[1].map }}</pre> -->
	<div class="flex justify-center items-center h-[500px]">
		<div class="h-[500px] w-[1000px] bg-slate-200" id="map"></div>
	</div>
	<!-- <div>
		{{ cropAreaReady }}
	</div> -->
</template>

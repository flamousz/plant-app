import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";

export const useCsvStore = defineStore("csv", {
	state() {
		return {};
	},
	actions: {
		async postExportTaskMaster(val) {
			try {
				console.log("masuk ke postExportTaskMaster STORE");
				console.log(val, "<<<< ini val");

				const { data } = await axios({
					url: `${baseUrl}/csv/export`,
					method: "POST",
					data: val,
					responseType: "blob", // Set the response type to 'blob'
				});
				console.log(data, "<<<< response.data");
				// Create a URL object from the blob data
				const url = window.URL.createObjectURL(new Blob([data]));
				console.log(url, "<<< URL");

				// Create a temporary link element
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", "exported_data.csv"); // Set the desired file name

				// Simulate a click on the link element to trigger the download
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				window.URL.revokeObjectURL(url);
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
		},
	},
});

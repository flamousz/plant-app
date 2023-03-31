import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";

export const useUserStore = defineStore("user", {
	state() {
		return {
			access_token: localStorage.access_token || "",
		};
	},
	actions: {
		async handleLogin(val) {
			try {
				const { data } = await axios({
                    url: `${baseUrl}/users/login`,
                    method: "POST",
					data: val,
				});
				localStorage.setItem("access_token", data.access_token);
				this.access_token = data.access_token;
				this.router.push("/crop");
                Toastify({
                    text: "Welcome to Plantation App",
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
	},
});

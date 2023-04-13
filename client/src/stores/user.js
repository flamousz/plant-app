import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";

export const useUserStore = defineStore("user", {
	state() {
		return {
			access_token:  "",
			role:  ''
		};
	},
	actions: {
		async handleLogin(val) {
			try {
				const { data } = await axios({
                    url: `${baseUrl}/login`,
                    method: "POST",
					data: val,
				});
				localStorage.setItem("access_token", data.access_token);
				localStorage.setItem('role', data.role)
				this.access_token = data.access_token;
				this.role = data.role;
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

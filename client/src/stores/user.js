import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";

export const useUserStore = defineStore("user", {
	state() {
		return {
			access_token:  ""
		};
	},
	actions: {
		async handleLogout(){
			try {
				console.log('masuk ke handleLogout useUserStore');
				localStorage.clear()
				this.access_token = ''
				this.role = ''
				this.email = ''
				this.router.push('/login')
				Toastify({
                    text: "Successfully Signing out",
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
		async handleLogin(val) {
			try {
				const { data } = await axios({
                    url: `${baseUrl}/login`,
                    method: "POST",
					data: val,
				});
				localStorage.setItem("access_token", data.access_token);
				localStorage.setItem('role', data.role)
				localStorage.setItem('email', data.email)
				this.access_token = data.access_token;
				this.router.push("/plantschedule");
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

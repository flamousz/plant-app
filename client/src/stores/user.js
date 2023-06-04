import axios from "axios";
import { defineStore } from "pinia";
import { baseUrl } from "./crop";

export const useUserStore = defineStore("user", {
	state() {
		return {
			access_token:  "",
			role: '',
			notification: [],
			users: []
		};
	},
	actions: {
		async fetchUsers(){
			try {
				const {data} = await axios({
					url: `${baseUrl}`,
					method: 'GET'
				})
				this.users = data
			} catch (error) {
				Toastify({
                    text: `${error.response.data.message}`,
                    style: {
                      background: "linear-gradient(to right, #611302, #a62103)",
                    },
        
                    duration: 2000,
                  }).showToast();
			}
		},
		async handleLogout(){
			try {
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
		async patchNotification(val){
			try {
				await axios({
					url: `${baseUrl}/notifications`,
					method: 'PATCH',
					data: val
				})
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
		async fetchNotification(){
			try {
				const notificationRequest = await axios({
					url: `${baseUrl}/notifications`,
					method: 'GET'
				})
				
				this.notification = notificationRequest.data
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
				localStorage.setItem('userId', data.id)
				localStorage.setItem('approvalSequence', data.approvalLevel)
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

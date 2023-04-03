<script>
import { mapActions } from "pinia";
import { useUserStore } from "../stores/user";
import GreenButton from '../components/Buttons/GreenButton.vue'

export default {
	name: "LoginPage",
	data() {
		return {
			loginData: {
				email: "",
				password: "",
			}
		};
	},
	methods: {
		...mapActions(useUserStore, ["handleLogin"]),
	},
	components: {GreenButton}
};
</script>

<template>
	<div
		class="flex justify-center items-center bg-[url('../assets/homepage-wallpaper.jpg')] w-screen h-screen"
	>
		<div class="bg-white lg:w-[25%] lg:h-[53%] rounded-xl flex flex-col">
			<div
				class="bg-[#6bbd99] flex flex-col justify-center items-center lg:w-full rounded-t-xl lg:h-[50%]"
			>
				<img
					src="../assets/indo evergreen agro business.png"
					alt="indo evergreen agro business"
				/>
				<div class="pt-[3%] font-semibold text-2xl">
					<h1>Sign in to Plant App</h1>
				</div>
			</div>
			<div class="flex flex-col lg:w-full lg:h-full bg-[#c4e8c2] rounded-b-xl">
				<form @submit.prevent="handleLogin(loginData)">
					<div class="flex flex-col w-[100%] gap-2 lg:mt-[15%] lg:ml-[9%]">
						<div class="flex flex-row">
							<label
								for="email"
								class="flex justify-start items-center lg:w-[23%]"
								>Email:</label
							>
							<input
								class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
								placeholder="Email Address"
								name="email"
								type="email"
								id="email"
								v-model="loginData.email"
							/>
						</div>
						<div class="flex flex-row">
							<label
								for="password"
								class="lg:w-[23%] flex justify-start items-center"
								>Password:
							</label>
							<input
								id="password"
								class="placeholder:text-xs p-[6px] border border-gray-300 rounded-md bg-green-100"
								placeholder="Password"
								name="password"
								type="password"
								v-model="loginData.password"
							/>
						</div>
						<div class="flex justify-end lg:mr-[20%]">
							<GreenButton :type="'submit'" :text="'Click to Sign in'" />
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

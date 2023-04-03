<script>
import { mapActions, mapState } from "pinia";
import { useEmployeeStore } from "../stores/employee";
import BlueButton from '../components/Buttons/BlueButton.vue'

export default {
	name: "EmployeePage",
	data(){
		return{
			blueButtonTrigger: '/employee'
		}
	},
	methods: {
		...mapActions(useEmployeeStore, ["fetchEmployee"]),
	},
	computed: {
		...mapState(useEmployeeStore, ["employees"]),
	},
	created() {
		this.fetchEmployee();
	},
	components: {BlueButton}
};
</script>

<template>
    <pre>{{ employees }}</pre>
	<h1>employe</h1>
</template>

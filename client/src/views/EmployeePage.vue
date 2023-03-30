<script>
import { mapActions, mapState } from "pinia";
import { useEmployeeStore } from "../stores/employee";

export default {
	name: "EmployeePage",
	methods: {
		...mapActions(useEmployeeStore, ["fetchEmployee"]),
	},
	computed: {
		...mapState(useEmployeeStore, ["employees"]),
	},
	created() {
		this.fetchEmployee();
	},
};
</script>

<template>
    <pre>{{ employees }}</pre>
	<h1>employe</h1>
</template>

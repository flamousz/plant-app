<script>
import { mapActions, mapState } from "pinia";
import { useCropStore } from "../stores/crop";

export default {
	name: "CropPage",
	methods: {
		...mapActions(useCropStore, ["fetchCrop"]),
	},
	computed: {
		...mapState(useCropStore, ["crop"]),
	},
	created() {
		this.fetchCrop();
	},
};
</script>

<template>
	<pre>{{ crop }}</pre>
	<h1>sdf</h1>
</template>

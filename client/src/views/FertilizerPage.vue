<script>
import { mapActions, mapState } from "pinia";
import { useFertilizerStore } from "../stores/fertilizer";

export default {
	name: "FertilizerPage",
	methods: {
		...mapActions(useFertilizerStore, ["fetchFertilizer"]),
	},
	computed: {
		...mapState(useFertilizerStore, ["fertilizers"]),
	},
	created() {
		this.fetchFertilizer();
	},
};
</script>

<template>
	<pre>
        {{ fertilizers }}
    </pre
	>
	<h1>pupuck</h1>
</template>

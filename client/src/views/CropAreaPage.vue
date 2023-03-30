<script>
import { mapActions, mapWritableState, mapState } from "pinia";
import { useCropAreaStore } from "../stores/cropArea";

export default {
	name: "CropAreaPage",
	data() {
		return {
			searchData: "",
		};
	},
	methods: {
		...mapActions(useCropAreaStore, ["fetchCropArea"]),
		queryAction(params, val) {
			if (params === "page") {
				this.query.page = val;
			}
			if (params === "filter") {
				this.query = {
					filter: val,
				};
			}
			if (params === val) {
				this.query = {
					search: val,
				};
			}
		},
	},
	computed: {
		...mapWritableState(useCropAreaStore, ["query"]),
		...mapState(useCropAreaStore, ["cropArea", "allPage"]),
	},
    created() {
        this.fetchCropArea()
    }
};
</script>

<template>
    <pre>{{ cropArea }}</pre>
</template>
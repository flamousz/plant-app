<script>
export default {
	name: "TableRow4Colum",
	props: ["fertilizer", "index", 'pesticide', 'material', 'seed', 'realization', 'pesticideNursery'],
	methods: {
		formatDate(date) {
			if (!date) {
				return "";
			}
			return new Date(date).toLocaleDateString("en-AU", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		}
	}
};
</script>

<template>
	<!-- <pre>{{ fertilizer }}</pre> -->
	<!-- <pre>{{ realization }}</pre> -->
	<!-- <pre>{{ seed }}</pre> -->
	<tr v-if="realization" class="w-[100%] flex flex-row  ">
		<td class=" w-[4.577%] text-center pl-1 border border-black h-[33px] pt-1">{{ index+1 }}</td>
		<td class=" w-[21%] pl-1 border border-black text-left h-[33px] pt-1">{{ formatDate(realization.harvestDate) }}</td>
		<td class=" border border-black w-[15%] text-center pt-1">{{ realization.letterNumber }}</td>
		<td class="border border-black w-[20%] text-center pt-1">{{ realization.harvestWeightEst }}</td>
		<td class="border border-black w-[20%] text-center pt-1">{{ realization.harvestWeightReal }}</td>
	</tr>
	<tr v-if="fertilizer" class="w-[100%] flex flex-row ">
		<td class=" w-[42.9%] text-left pl-1 border border-black h-[33px] pt-1">{{ fertilizer.Item.name }}</td>
		<td class=" border border-black w-[10.2%] text-center pt-1">{{ fertilizer.Item.standardqt }}</td>
		<td class="border border-black w-[10%] text-center pt-1">{{ fertilizer.Item.Uom.name }}</td>
		<td class="border border-black w-[37%] text-center pt-1">{{ fertilizer.Item.descriptio }}</td>
	</tr>
	<tr v-if="pesticide" class="w-[100%] flex flex-row ">
		<td class=" w-[22%] text-left pl-1 border border-black h-[33px] pt-1">{{ pesticide.Item.name }}</td>
		<td class=" w-[21%] text-left pl-1 border border-black h-[33px] pt-1">{{ pesticide.Item.Category?.name }}</td>
		<td class=" border border-black w-[10%] text-center pt-1">{{ pesticide.dose }}</td>
		<td class="border border-black w-[10%] text-center pt-1">{{ pesticide.Item.Uom.name }}</td>
		<td class="border border-black w-[37%] text-center pt-1">{{ pesticide.Item.description }}</td>
	</tr>
	<tr v-if="pesticideNursery" class="w-[100%] flex flex-row ">
		<td class=" w-[22%] text-left pl-1 border border-black h-[33px] pt-1">{{ pesticideNursery.Item.name }}</td>
		<td class=" border border-black w-[10%] text-center pt-1">{{ pesticideNursery.Item.standardqty }}</td>
		<td class="border border-black w-[10%] text-center pt-1">{{ pesticideNursery.Item.Uom.name }}</td>
		<td class="border border-black w-[37%] text-center pt-1">{{ pesticideNursery.Item.description }}</td>
	</tr>
	<tr v-if="material" class="w-[100%] flex flex-row ">
		<td class=" w-[42.9%] text-left pl-1 border border-black h-[33px] pt-1">{{ material.Item.name }}</td>
		<td class=" border border-black w-[10.2%] text-center pt-1">{{ material.Item.standardqty }}</td>
		<td class="border border-black w-[10%] text-center pt-1">{{ material.Item.Uom.name }}</td>
		<td class="border border-black w-[37%] text-center pt-1">{{ material.Item.description }}</td>
	</tr>
	<tr v-if="seed" class="w-[100%] flex flex-row ">
		<td class=" w-[43.1%] text-left pl-1 border border-black h-[33px] pt-1">{{ seed.Item.name }}</td>
		<td class=" border border-black w-[57.1%] text-center pt-1">{{ seed.Item.description }}</td>
	</tr>
</template>

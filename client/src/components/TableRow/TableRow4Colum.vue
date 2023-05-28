<script>
export default {
	name: "TableRow4Colum",
	props: ["fertilizer", "index", 'pesticide', 'tools', 'material', 'seed', 'realization', 'pesticideNursery', 'fertilizersNursery', 'tasks'],
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
	<!-- <pre>{{ tools }}</pre> -->
	<tr v-if="tasks" class="w-[80%] flex flex-row  bg-slate-100">
		<td class=" w-[4.5%] text-center pl-1 border border-black h-[33px] pt-1">{{ index+1 }}</td>
		<td class=" w-[18.4%] pl-1 border border-black text-left h-[33px] pt-1">{{ tasks?.task?.name }}</td>
		<td class=" border border-black w-[13.1%] text-center pt-1">{{ tasks?.task?.TaskPerMinute }}</td>
		<td class="border border-black w-[55%] text-center pt-1">{{ tasks?.task?.description }} </td>
		<td class="border border-r-2 border-black w-[10%] text-center pt-1">{{ tasks?.task?.arcStatus }}</td>
	</tr>
	<tr v-if="tools" class="w-[80%] flex flex-row  bg-slate-100">
		<td class=" w-[4.5%] text-center pl-1 border border-black h-[33px] pt-1">{{ index+1 }}</td>
		<td class=" w-[18.5%] pl-1 border border-black text-left h-[33px] pt-1">{{ tools.Item.name }}</td>
		<td class=" border border-black w-[13%] text-center pt-1">{{ tools.Item.code }}</td>
		<td class="border border-black w-[55%] text-center pt-1">{{ tools.Item.description }} </td>
		<td class="border border-r-2 border-black w-[10%] text-center pt-1">{{ tools.Item.arcStatus }}</td>
	</tr>
	<tr v-if="realization" class="w-[80.5%] flex flex-row  bg-slate-100">
		<td class=" w-[5.78%] text-center pl-1 border border-black h-[33px] pt-1">{{ index+1 }}</td>
		<td class=" w-[25.95%] pl-1 border border-black text-left h-[33px] pt-1">{{ formatDate(realization.harvestDate) }}</td>
		<td class=" border border-black w-[18.68%] text-center pt-1">{{ realization.letterNumber }}</td>
		<td class="border border-black w-[24.8%] text-center pt-1">{{ realization.harvestWeightEst }} Kg</td>
		<td class="border border-r-2 border-black w-[24.8%] text-center pt-1">{{ realization.harvestWeightReal }} Kg</td>
	</tr>
	<tr v-if="fertilizer" class="w-[100%] flex flex-row bg-slate-100">
		<td class=" w-[23%] text-left pl-1 border border-black h-[33px] pt-1">{{ fertilizer.Item.name }}</td>
		<td class=" border border-black w-[10%] text-center pt-1">{{ fertilizer.Item.standardqty }}</td>
		<td class="border border-black w-[10%] text-center pt-1">{{ fertilizer.Item.Uom.name }}</td>
		<td class="border border-black w-[47%] text-center pt-1">{{ fertilizer.Item.description }}</td>
		<td class="border border-black w-[10%] text-center pt-1">{{ fertilizer.type }}</td>
	</tr>
	<tr v-if="fertilizersNursery" class="w-[100%] flex flex-row bg-slate-100">
		<td class=" w-[23%] text-left pl-1 border border-black h-[33px] pt-1">{{ fertilizersNursery.Item.name }}</td>
		<td class=" border border-black w-[10%] text-center pt-1">{{ fertilizersNursery.Item.standardqt }}</td>
		<td class="border border-black w-[10%] text-center pt-1">{{ fertilizersNursery.Item.Uom.name }}</td>
		<td class="border border-black w-[47%] text-center pt-1">{{ fertilizersNursery.Item.descriptio }}</td>
		<td class="border border-black w-[10%] text-center pt-1">{{ fertilizersNursery.type }}</td>
	</tr>
	<tr v-if="pesticide" class="w-[100%] flex flex-row bg-slate-100">
		<td class=" w-[23%] text-left pl-1 border border-black h-[33px] pt-1">{{ pesticide.Item.name }}</td>
		<td class=" border border-black w-[10%] text-center pt-1">{{ pesticide.Item.standardqty }}</td>
		<td class="border border-black w-[10%] text-center pt-1">{{ pesticide.Item.Uom.name }}</td>
		<td class="border border-black w-[47%] text-center pt-1">{{ pesticide.Item.description }}</td>
		<td class="border border-black w-[10%] text-center pt-1">{{ pesticide.type }}</td>
	</tr>
	<tr v-if="pesticideNursery" class="w-[100%] flex flex-row bg-slate-100">
		<td class=" w-[23%] text-left pl-1 border border-black h-[33px] pt-1">{{ pesticideNursery.Item.name }}</td>
		<td class=" border border-black w-[10%] text-center pt-1">{{ pesticideNursery.Item.standardqty }}</td>
		<td class="border border-black w-[10%] text-center pt-1">{{ pesticideNursery.Item.Uom.name }}</td>
		<td class="border border-black w-[47%] text-center pt-1">{{ pesticideNursery.Item.description }}</td>
		<td class="border border-black w-[10%] text-center pt-1">{{ pesticideNursery.type }}</td>
	</tr>
	<tr v-if="material" class="w-[100%] flex flex-row bg-slate-100">
		<td class=" w-[23%] text-left pl-1 border border-black h-[33px] pt-1">{{ material.Item.name }}</td>
		<td class=" border border-black w-[10%] text-center pt-1">{{ material.Item.standardqty }}</td>
		<td class="border border-black w-[10%] text-center pt-1">{{ material.Item.Uom.name }}</td>
		<td class="border border-black w-[47%] text-center pt-1">{{ material.Item.description }}</td>
		<td class="border border-black w-[10%] text-center pt-1">{{ material.type }}</td>
	</tr>
	<tr v-if="seed" class="w-[100%] flex flex-row bg-slate-100">
		<td class=" w-[43.1%] text-left pl-1 border border-black h-[33px] pt-1">{{ seed.Item.name }}</td>
		<td class=" border border-black w-[57.1%] text-center pt-1">{{ seed.Item.description }}</td>
	</tr>
</template>

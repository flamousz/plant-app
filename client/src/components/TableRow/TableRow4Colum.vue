<script>
export default {
	name: "TableRow4Colum",
	props: ["fertilizer", "index", 'pesticide', 'material', 'seed'],
};
</script>

<template>
	<!-- <pre>{{ fertilizer }}</pre> -->
	<!-- <pre>{{ seed }}</pre> -->
	<tr v-if="fertilizer" class="w-[100%] flex flex-row bg-purple-400">
		<td class="bg-slate-300 w-[42.9%] text-left pl-1 border border-black h-[33px] pt-1">{{ fertilizer.Item.name }}</td>
		<td class="bg-yellow-200 border border-black w-[10.2%] text-center pt-1">{{ fertilizer.Item.standardqty }}</td>
		<td class="border border-black w-[10%] text-center pt-1">{{ fertilizer.Item.Uom.name }}</td>
		<td class="border border-black w-[37%] text-center pt-1">{{ fertilizer.Item.description }}</td>
	</tr>
	<tr v-if="pesticide" class="w-[100%] flex flex-row bg-purple-400">
		<td class="bg-slate-300 w-[22%] text-left pl-1 border border-black h-[33px] pt-1">{{ pesticide.Item.name }}</td>
		<td class="bg-slate-300 w-[21%] text-left pl-1 border border-black h-[33px] pt-1">{{ pesticide.Item.Category?.name }}</td>
		<td class="bg-yellow-200 border border-black w-[10%] text-center pt-1">{{ pesticide.Item.standardqty }}</td>
		<td class="border border-black w-[10%] text-center pt-1">{{ pesticide.Item.Uom.name }}</td>
		<td class="border border-black w-[37%] text-center pt-1">{{ pesticide.Item.description }}</td>
	</tr>
	<tr v-if="material" class="w-[100%] flex flex-row bg-purple-400">
		<td class="bg-slate-300 w-[42.9%] text-left pl-1 border border-black h-[33px] pt-1">{{ material.Item.name }}</td>
		<td class="bg-yellow-200 border border-black w-[10.2%] text-center pt-1">{{ material.Item.standardqty }}</td>
		<td class="border border-black w-[10%] text-center pt-1">{{ material.Item.Uom.name }}</td>
		<td class="border border-black w-[37%] text-center pt-1">{{ material.Item.description }}</td>
	</tr>
	<tr v-if="seed" class="w-[100%] flex flex-row bg-purple-400">
		<td class="bg-slate-300 w-[43.1%] text-left pl-1 border border-black h-[33px] pt-1">{{ seed.Item.name }}</td>
		<td class="bg-yellow-200 border border-black w-[57.1%] text-center pt-1">{{ seed.Item.description }}</td>
	</tr>
</template>

<script>
// Define an array
let myArray = ["apple", "banana", "cherry", "date"];

// Define the index from which to delete the element
let indexToDelete = 2;

// Use the splice() method to remove the element from the array
myArray.splice(indexToDelete, 1);

// Output the updated array to the console
console.log(myArray); // Output: ["apple", "banana", "date"]
</script>

<template>
	<!-- KOLOM KUNING DI SCHEDULE PLANT -->
	<div
		class="w-[30%] h-[190px] bg-yellow-500 border-black border-[3px] rounded-lg m-2 p-0 flex flex-col justify-center items-center gap-2"
	>
		<div class="flex flex-row gap-2 justify-end items-end w-[90%]">
			<div
				class="flex flex-col border-2 bg-yellow-300 border-black px-3 rounded-lg w-[80%]"
			>
				<div class="text-xl font-bold">Code</div>
				<div class="text-lg font-semibold text-center">
					{{ plantSchedulesDetail?.PlantSheet?.plant?.code }}
				</div>
			</div>
			<div
				class="flex flex-col border-2 bg-yellow-300 border-black px-1 rounded-lg w-[80%]"
			>
				<div class="text-xl font-bold">Type of Plant</div>
				<div class="text-lg font-semibold">
					{{ plantSchedulesDetail?.PlantSheet?.PlantType?.name }}
				</div>
			</div>
		</div>

		<div
			class="flex flex-col border-2 bg-yellow-300 border-black pl-2 rounded-lg w-[90%]"
		>
			<div class="text-xl font-bold">Production Weight per Plant</div>
			<div class="text-lg font-semibold">
				{{ plantSchedulesDetail?.PlantSheet?.cropProdWeight }}
				Kg
			</div>
		</div>
	</div>
	<!--  -->

	<div
		v-if="activeTab === 'pesticides'"
		class="bg-yellow-400 w-[80%] flex flex-col"
	>
		<thead>
			<tr class="flex flex-row w-full bg-red-600">
				<th class="w-[43%] bg-slate-400 border-black border">Name</th>
				<th class="w-[10%] bg-green-600 border-y border-black">Dose</th>
				<th class="w-[10%] bg-white border border-black">UOM</th>
				<th class="w-[37%] border border-black">Description</th>
			</tr>
		</thead>
		<tbody>
			<TableRow4Colum
				v-for="(pesticide, index) in cropDetail.PesticideConjunctions"
				:key="pesticide.id"
				:pesticide="pesticide"
				:index="index"
			/>
		</tbody>
	</div>

	<div v-if="activeTab === 'seeds'">
		<thead>
			<tr>
				<th>Name</th>
				<th>Brand</th>
			</tr>
		</thead>
		<tbody>
			<TableRow4Colum
				v-for="(seed, index) in cropDetail.SeedConjunctions"
				:key="seed.id"
				:seed="seed"
				:index="index"
			/>
		</tbody>
	</div>
</template>

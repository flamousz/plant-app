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

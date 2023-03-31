<script>
export default {
	name: "GreenButton",
	props: ["type", "text"],
};
</script>

<template>
	<button
		:type="type"
		class="bg-[#6bbd99] rounded flex hover:bg-green-700 justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px]"
	>
		{{ text }}  
	</button>
</template>

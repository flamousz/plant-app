<script>
export default {
	name: "GreenButton",
	props: ["type", "text", 'nohover'],
	
};
</script>

<template>
	<button
		:type="type"
		:class="['bg-[#6bbd99] rounded flex active:bg-green-800  justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px]', nohover? '':'hover:bg-green-600']"
	>
		{{ text }}  
	</button>
</template>

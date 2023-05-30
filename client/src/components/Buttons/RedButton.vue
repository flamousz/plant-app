<script>

export default {
	name: "RedButton",
	props: ["text", "type"]
};
</script>

<template>
	<button
		:type="type"
		class="bg-[#c52b2b] rounded flex hover:bg-red-900 justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px] active:bg-red-600"
	>
		{{ text }}
	</button>
</template>

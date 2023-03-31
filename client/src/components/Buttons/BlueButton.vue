<script>

export default {
    name: "BlueButton",
    props: ["type", "text", ],
};
</script>

<template>
	<button
		:type="type"
		class="bg-[#1158db] rounded flex hover:bg-blue-900 justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px]"
	>
		{{ text }}
	</button>
</template>

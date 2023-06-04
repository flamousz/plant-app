<script>

export default {
    name: "BlueButton",
    props: ["type", "text", 'nohover'],
};
</script>

<template>
	<button
		:type="type"
		:class="['bg-[#1158db] rounded flex active:bg-blue-900  justify-center items-center font-semibold text-[11px] text-slate-100 lg:h-[30px] w-[90px]', nohover? '':'hover:bg-blue-600']"
	>
		{{ text }}
	</button>
</template>

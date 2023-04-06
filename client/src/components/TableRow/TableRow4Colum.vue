<script>
export default {
	name: "TableRow4Colum",
	props: ["fertilizer", "index"],
};
</script>

<template>
	<!-- <pre>{{ fertilizer }}</pre> -->
	<tr>
		<td>{{ fertilizer.Item.name }}</td>
		<td>{{ fertilizer.Item.standardqty }}</td>
		<td>{{ fertilizer.Item.Uom.name }}</td>
		<td>{{ fertilizer.Item.description }}</td>
	</tr>
</template>

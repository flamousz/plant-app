<script>
import { RouterLink } from "vue-router";
import BlueButton from "../Buttons/BlueButton.vue";
import RedButton from "../Buttons/RedButton.vue";

export default {
	name: "TableRowCrop",
	props: ["item", "index"],
	components: { RedButton, BlueButton, RouterLink }
};
</script>

<template>
	<tr class="whitespace-nowrap hover:bg-slate-200">
		<td class="h-14">
			{{ index + 1 }}
		</td>
		<td class="h-14">{{ item.name }}</td>
		<td class="h-14">{{ item.seedlingAge }}</td>
		<td class="h-14">{{ item.harvestAge }}</td>
		<td class="h-14">{{ item.harvestTime }}</td>
		<td class="h-14">{{ item.cropAge }}</td>
		<td class="h-14">{{ item.cropProdWeight }}</td>
		<td class="h-14">{{ item.type }}</td>
		<td class="h-14 flex flex-row gap-1 justify-center items-center">
			<RedButton :type="'button'" :text="'DELETE'" :id="item.id" />
            <RouterLink to="/cropnew">

                <BlueButton :type="'button'" :text="'EDIT'" />
            </RouterLink>
		</td>
	</tr>
</template>

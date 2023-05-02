<script lang="ts">
import { defineComponent, ref } from "vue";
// export default defineComponent({
// 	setup() {
// 		return {
// 			isOpened: ref(false),
// 		};
// 	},
// });
export default({
    name: 'SideBar',
    data(){
        return{
            isOpened: false
        }
    }
})
</script>
<template>
    <div @mouseenter="isOpened = true" class="fixed top-[80px] left-1 opacity-50 " >
        <img src="../assets/icons-sidebar-64.png" alt="sidebar icon" class="w-8" >
    </div>
	<!-- <button @mouseenter="isOpened = true">Open Sidebar</button> -->
	<VueSidePanel v-model="isOpened" lock-scroll side="left" width="300px">
		<div style="padding-top: 70px; color: #f14668">
			
		</div>
	</VueSidePanel>
</template>

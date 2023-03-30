<script>
    export default{
        name: 'TableRowCrop',
        props: ['item', 'index']
    }
</script>


<template>
    <tr class="whitespace-nowrap hover:bg-slate-200 ">
        <td class="h-14">
            {{index + 1}}
        </td>
        <td class="h-14">{{item.name}}</td>
        <td class="h-14">{{item.seedlingAge}}</td>
        <td class="h-14">{{item.harvestAge}}</td>
        <td class="h-14">{{ item.harvestTime }}</td>
        <td class="h-14">{{item.cropAge}}</td>
        <td class="h-14">{{ item.cropProdWeight }}</td>
        <td class="h-14">{{ item.type }}</td>
        <td class="h-14">delete</td>
    </tr>
</template>
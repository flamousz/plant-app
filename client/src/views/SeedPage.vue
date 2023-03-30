<script>
import { mapActions, mapState } from 'pinia';
import {useSeedStore} from '../stores/seed'

export default{
    name:'SeedPage',
    methods: {
        ...mapActions(useSeedStore, ['fetchSeed'])
    },
    computed: {
        ...mapState(useSeedStore, ['seed'])
    },
    created(){
        this.fetchSeed()
    }
}


</script>


<template>
    <pre>{{ seed }}</pre>
    <h1>seed</h1>
</template>
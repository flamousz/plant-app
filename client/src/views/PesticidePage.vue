<script>
import { mapActions, mapState } from 'pinia';
import {usePesticideStore} from '../stores/pesticide'

export default{
    name: 'PesticidePage',
    methods: {
        ...mapActions(usePesticideStore, ['fetchPesticide'])
    },
    computed: {
        ...mapState(usePesticideStore, ['pesticides'])
    },
    created(){
        this.fetchPesticide()
    }
}

</script>


<template>
    <pre>{{ pesticides }}</pre>
    <h1>pesticide</h1>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import {useMaterialStore} from '../stores/material'

export default{
    name: 'MaterialPage',
    methods: {
        ...mapActions(useMaterialStore, ['fetchMaterial'])
    },
    computed: {
        ...mapState(useMaterialStore, ['materials'])
    },
    created(){
        this.fetchMaterial()
    }
}


</script>

<template>
    <pre>{{ materials }}</pre>
    <h1>material</h1>
</template>
import { defineStore } from "pinia";



export const useMapLeafletStore = defineStore('mapLeaflet', {
    actions: {
        handleRouter(){
            this.router.push('/croparea/detail/2')
        }
    }
})
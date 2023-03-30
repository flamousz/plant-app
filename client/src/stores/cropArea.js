import { defineStore } from "pinia";
const baseUrl = "http://localhost:3000"
import axios from 'axios'


export const useCropAreaStore = defineStore('cropArea', {
    state() {
        return {
            cropArea: [],
            allPage: 0,
            query: {
                filter: '',
                page: 0,
                search: ''
            }
        }
    },
    actions: {
        async fetchCropArea() {
            try {
                let queryCropArea = this.query

                if (!queryCropArea.filter) {
                    delete queryCropArea.filter
                }
                if (!queryCropArea.page) {
                    delete queryCropArea.page
                }
                if (!queryCropArea.search) {
                    delete queryCropArea.search
                }
                this.router.replace({name: 'cropArea', query: queryCropArea})

                const {data} = await axios ({
                    url: `${baseUrl}/cropareas`,
                    method: 'GET',
                    params: queryCropArea
                })

                this.cropArea=data.rows
                this.allPage= Math.ceil(data.count/6)
            } catch (err) {
                console.log(err);
            }
        }
    }
})
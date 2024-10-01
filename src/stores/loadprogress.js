import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useProgressStore = defineStore('progress',()=>{
    const loadprogress = ref([])
    const addelement = (element) => {
        loadprogress.value.push(element)
    }
    return {
        loadprogress,
        addelement
    }
})
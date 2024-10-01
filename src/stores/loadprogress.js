import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useProgressStore = defineStore('progress',()=>{
    const loadprogress = ref([])
    const addelement = (element) => {
        loadprogress.value.push(element)
    }
    const setprogress = (uid,progress) => {
        const index = loadprogress.value.findIndex((element) => element.uid===uid)
        loadprogress.value[index].progress = progress
    }
    return {
        loadprogress,
        addelement,
        setprogress
    }
},
{
persist: true,
})
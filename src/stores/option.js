import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useOptionStore = defineStore('option',()=>{
    const options = ref([])
    const addelement = (element) => {
        options.value.push(element)
    }
    const getelementindex = (uid) => {
        const index = options.value.findIndex((element) => element.uid===uid)
        return index
    }
    const deleteitem = (uid) => {
        console.log('删除')
        const index = options.value.findIndex((element) => element.uid===uid)
        if (index !== -1) {
            options.value.splice(index, 1);
          }
    }
    return {
        options,
        addelement,
        getelementindex,
        deleteitem
    }
},
{
persist: true,
})
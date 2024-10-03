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
    const setfilepause = (uid) => {
        const index = loadprogress.value.findIndex((element) => element.uid===uid)
        loadprogress.value[index].pause = true
    }
    const setfilestart = (uid) => {
        const index = loadprogress.value.findIndex((element) => element.uid===uid)
        loadprogress.value[index].pause = false
    }
    const getfilepuse = (uid) => {
        const index = loadprogress.value.findIndex((element) => element.uid===uid)
        return loadprogress.value[index].pause
    }
    const getelement = (uid) => {
        const index = loadprogress.value.findIndex((element) => element.uid===uid)
        return index
    }
    const deleteitem = (uid) => {
        console.log('删除')
        const index = loadprogress.value.findIndex((element) => element.uid===uid)
        if (index !== -1) {
            loadprogress.value.splice(index, 1);
          }
    }
    return {
        loadprogress,
        addelement,
        setprogress,
        setfilepause,
        getfilepuse,
        setfilestart,
        getelement,
        deleteitem
    }
},
{
persist: true,
})
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFileStore = defineStore('file', () => {
  const fileid = ref('1')
  const setfileid = (id) => {
    fileid.value = id
  }
  return { 
    fileid,
    setfileid
  }
}, 
{
persist: true,
})
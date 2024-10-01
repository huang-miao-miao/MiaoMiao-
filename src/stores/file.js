import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('file', () => {
  const fileid = ref('')
  return { 
    fileid
  }
})
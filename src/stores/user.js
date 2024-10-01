import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('user', () => {
  const userid = ref('')
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }
// doubleCount, 
// increment 

  return { 
    userid
  }
})
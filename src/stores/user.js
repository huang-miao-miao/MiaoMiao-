import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userid = ref('')
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }
// doubleCount, 
// increment 
  const setuserid = (id) => {
    userid.value = id
  }
  return { 
    userid,
    setuserid
  }
})
// stores/myLoader.ts
import { defineStore } from 'pinia'

export const useMyLoaderStore = defineStore('myLoaderStore', {
  state: () => ({
    isLoading: 0 as number
  }),
  actions: {
    addLoad() {
      this.isLoading++
    },
    removeLoad() {
      this.isLoading--
    }
  }
})
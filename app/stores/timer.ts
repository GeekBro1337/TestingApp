import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', {
  state: () => ({
    running: false
  }),
  actions: {
    start() {
      this.running = true
    },
    stop() {
      this.running = false
    }
  }
})

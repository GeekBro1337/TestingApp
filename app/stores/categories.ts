import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    list: [] as string[],
  }),
  actions: {
    async load() {
      this.list = await $fetch<string[]>('/api/categories')
    },
    async add(name: string) {
      await $fetch('/api/categories', { method: 'POST', body: { name } })
      this.list.push(name)
    },
    async reorder(newOrder: string[]) {
      await $fetch('/api/categories/reorder', { method: 'POST', body: { order: newOrder } })
      this.list = [...newOrder]
    },
  },
})

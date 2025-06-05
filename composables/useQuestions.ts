export function useQuestions(apiUrl) {

  const questions = ref<Test.Test | null>(null)
  const pending = ref(true)
  const error = ref(null)
 
  async function load() {
    try {
      pending.value = true
      const res = await $fetch(apiUrl)
      questions.value = res.questions
    } catch (err) {
      error.value = err
    } finally {
      pending.value = false
    }
  }
 
  async function save() {
    await $fetch('/api/tests', {
      method: 'POST',
      body: { questions: questions.value }
    })
  }
 
  const total = computed(() => questions.value.length)
 
  return {
    questions,
    pending,
    error,
    load,
    save,
    total
  }
}
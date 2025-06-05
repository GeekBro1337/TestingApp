import { useMyLoaderStore } from "~/stores/loader";

export async function getTest(id: string): Promise<Test.Test | null> {
  const loader = useMyLoaderStore()
  try {
    loader.addLoad()
    const result = await $fetch<Test.Test>('/api/tests/' + id)
    console.log(result)
    return result
  } catch (err) {
    console.error("Error when try fetch test with " + id + ": ", err)
    return null
  } finally {
    loader.removeLoad()
  }

}
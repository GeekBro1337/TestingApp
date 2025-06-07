import { useMyLoaderStore } from "~/stores/loader";

export async function getTest(id: string): Promise<Test.Test | null> {
  const loader = useMyLoaderStore();
  try {
    loader.addLoad();
    const result = await $fetch<Test.Test>(`/api/tests/${id}`);
    console.log("Loaded test:", result);
    return result;
  } catch (err) {
    console.error(`Error when trying to fetch test with id "${id}":`, err);
    return null;
  } finally {
    loader.removeLoad();
  }
}

export async function saveTestAnswers(
  testId: string,
  answers: Array<{ questionId: string | number; answerId: string }>
): Promise<boolean> {
  const loader = useMyLoaderStore();
  try {
    loader.addLoad();
    await $fetch(`/api/tests/${testId}/answers`, {
      method: "POST",
      body: { answers },
    });
    console.log("Answers saved successfully");
    return true;
  } catch (err) {
    console.error(
      `Error when trying to save answers for test "${testId}":`,
      err
    );
    return false;
  } finally {
    loader.removeLoad();
  }
}

// Composable для удобного использования в компонентах
export function useTest(testId: string) {
  const test = ref<Test.Test | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadTest = async () => {
    try {
      loading.value = true;
      error.value = null;
      test.value = await getTest(testId);
      if (!test.value) {
        error.value = `Не удалось загрузить тест с ID: ${testId}`;
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Неизвестная ошибка";
    } finally {
      loading.value = false;
    }
  };

  const saveAnswers = async (
    answers: Array<{ questionId: string | number; answerId: string }>
  ) => {
    return await saveTestAnswers(testId, answers);
  };

  return {
    test: readonly(test),
    loading: readonly(loading),
    error: readonly(error),
    loadTest,
    saveAnswers,
  };
}

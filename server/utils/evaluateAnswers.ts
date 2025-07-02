export interface EvaluationResult {
  total: number
  max: number
}

/**
 * Compare user answers with correct answers and calculate score
 */
export function evaluateAnswers(
  config: Test.FormConfig & {
    fields: Array<Test.FormField & { correct?: string[]; points?: number }>
  },
  state: Test.FormState
): EvaluationResult {
  let total = 0
  let max = 0

  for (const field of config.fields) {
    const correct = field.correct || []
    const points = field.points || 0
    max += points

    const value = state[field.name]
    if (!points) continue

    if (Array.isArray(value)) {
      const isCorrect =
        correct.every((c) => (value as string[]).includes(c)) &&
        (value as string[]).length === correct.length
      if (isCorrect) total += points
    } else if (typeof value === 'string') {
      if (correct.includes(value)) total += points
    }
  }

  return { total, max }
}


export {}

declare global {
        namespace Test {
            interface Metadata{
                title: string,
                status: 'delete' | 'update' | 'submit' | 'unviewed'
            }

            interface answer {
                key: uuid,
                answer: string
            }

            interface question {
                id: uuid,
                question: string,
                answers: answer[] 
                correct: answer[]
            }

            interface Test {
                id: uuid,
                metadata: Metadata,
                questions: question[]
            }
        }
}
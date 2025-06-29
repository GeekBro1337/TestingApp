export {};

declare global {
  namespace Test {
    interface Metadata {
      fileName: string;
      title: string;
      fields: FormField[];
      // answers: answer[]
    }

    // interface answer {
    //     key: uuid,
    //     answer: string
    // }

    interface FormField {
      id: number;
      name: string;
      label: string;
      type: "text" | "number" | "textarea" | "checkboxGroup";
      placeholder?: string;
      required: boolean;
      validation?: {
        minLength?: number;
        maxLength?: number;
        pattern?: RegExp;
        min?: number;
        max?: number;
        step?: number;
      };
      options?: Array<{ label: string; value: string }>;
    }
    interface FormConfig {
      title: string;
      description: string;
      fields: FormField[];
      metadata?: Metadata;
    }
    interface FormState {
      [key: string]: string | number | boolean | string[] | undefined;
    }
  }
}

import { defineStore } from "pinia";

type EditMode = "default" | "edit";

// DONE: храним оригинальную и текущую версии теста
// DONE: в будущем сюда можно перенести утилиты для работы с API
export const useEditStore = defineStore("edit", {
  state: () => ({
    mode: "default" as EditMode,
    originalTest: null as Test.FormConfig | null,
    currentTest: null as Test.FormConfig | null,
  }),

  getters: {
    isEditMode(state): boolean {
      return state.mode === "edit";
    },
  },

  actions: {
    initialize() {
      if (import.meta.client) {
        const savedMode = sessionStorage.getItem("editMode") as EditMode;
        if (savedMode) {
          this.mode = savedMode;
        }
      }
    },

    /** Установить конкретный режим */
    setMode(newMode: EditMode) {
      this.mode = newMode;
      if (import.meta.client) {
        sessionStorage.setItem("editMode", newMode);
      }
    },
    /** Переключить default ↔︎ edit */
    toggle() {
      const next: EditMode = this.isEditMode ? "default" : "edit";
      this.setMode(next);
    },

    setOriginalTest(test: Test.FormConfig | null) {
      this.originalTest = test;
      this.currentTest = test ? { ...test } : null;
    },

    setCurrentTest(test: Test.FormConfig | null) {
      this.currentTest = test;
    },
  },
});


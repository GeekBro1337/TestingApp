import { defineStore } from "pinia";

type EditMode = "default" | "edit";

export const useEditStore = defineStore("edit", {
  state: () => ({
    mode: "default" as EditMode,
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
  },
});

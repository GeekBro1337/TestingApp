import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    role: import.meta.client
      ? (sessionStorage.getItem("role") as "guest" | "admin") || "guest"
      : "guest",
  }),

  actions: {
    setRole(newRole: "guest" | "admin") {
      this.role = newRole;
      if (import.meta.client) {
        sessionStorage.setItem("role", newRole);
      }
    },
  },
});

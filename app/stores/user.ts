import { defineStore } from "pinia";

// TODO: Move to global types
type UserRole = "guest" | "admin";

// When user is admin? where declarations
export const useUserStore = defineStore("user", {
  state: () => ({
    role:
      (import.meta.client
        ? (sessionStorage.getItem("role") as UserRole)
        : "guest") || "guest",
  }),

  getters: {
    isAdmin(state): boolean {
      return state.role === "admin";
    },
  },

  actions: {
    setRole(newRole: UserRole) {
      this.role = newRole;
      if (import.meta.client) {
        sessionStorage.setItem("role", newRole);
      }
    },

    toggleRole() {
      const newRole: UserRole = this.isAdmin ? "guest" : "admin";
      this.setRole(newRole);
    },
  },
});

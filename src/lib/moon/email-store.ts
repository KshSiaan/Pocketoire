import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type MailStore = {
  email: string;
  passwordResetToken: string;
  setEmail: (email: string) => void;
  setPasswordResetToken: (token: string) => void;
  removeEmail: () => void;
  removePasswordResetToken: () => void;
  clearRecovery: () => void;
};

export const useMailStore = create<MailStore>()(
  persist(
    (set) => ({
      email: "",
      passwordResetToken: "",
      setEmail: (email: string) => set({ email }),
      setPasswordResetToken: (passwordResetToken: string) =>
        set({ passwordResetToken }),
      removeEmail: () => set({ email: "" }),
      removePasswordResetToken: () => set({ passwordResetToken: "" }),
      clearRecovery: () => set({ email: "", passwordResetToken: "" }),
    }),
    {
      name: "email_verif",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);


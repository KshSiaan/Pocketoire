import {create} from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'



type MailStore = {
  email: string
  setEmail: (email: string) => void
  removeEmail: () => void
}

export const useMailStore = create<MailStore>()(
  persist(
    (set, get) => ({
        email: "",
        setEmail: (email: string) => set({email}),
        removeEmail: () => set({email:""})
    }),
    {
      name: 'email_verif', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)


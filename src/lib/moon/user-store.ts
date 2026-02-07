import { UserType } from "@/types/global"
import {create} from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'



type MailStore = {
  me: UserType|null
  setEmail: (me: UserType) => void
  removeEmail: () => void
}

export const useMeStore = create<MailStore>()(
  persist(
    (set, get) => ({
        me: null,
        setEmail: (me: UserType|null) => set({me}),
        removeEmail: () => set({me:null})
    }),
    {
      name: 'user-me', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)


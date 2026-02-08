import { UserType } from "@/types/global"
import {create} from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'



type MailStore = {
  me: UserType|null
  setMe: (me: UserType) => void
  removeMe: () => void
}

export const useMeStore = create<MailStore>()(
  persist(
    (set, get) => ({
        me: null,
        setMe: (me: UserType) => set({me}),
        removeMe: () => set({me:null})
    }),
    {
      name: 'user-me', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)


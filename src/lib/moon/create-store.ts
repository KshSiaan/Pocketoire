import { create } from "zustand";

interface StoreType {
  storename: string;
  storeurl: string;
  description: string;
  profile_photo: File | null;
  cover_photo: File | null;
  setStoreInfo: (info: Pick<StoreType,"storename"|"storeurl">) => void;

}

type MailStore = {
  store: StoreType | null
  setStore: (store: StoreType) => void
  removeStore: () => void
}

export const useStoreCreator = create<MailStore>()(
    (set, get) => ({
        store: null,
        setStore: (store: StoreType) => set({store}),
        removeStore: () => set({store:null})
    }),
)
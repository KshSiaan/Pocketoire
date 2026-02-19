import { create } from "zustand";

interface StoreType {
  storename: string | null;
  storeurl: string | null;
  description: string;
  profile_photo: File | null;
  cover_photo: File | null;
  setNameAndUrl: (name: string, url: string) => void;
  setDescription: (description: string) => void;
  setProfilePhoto: (photo: File | null) => void;
  setCoverPhoto: (photo: File | null) => void;
  getStoreData: () => Omit<StoreType, "setNameAndUrl" | "setDescription" | "setProfilePhoto" | "setCoverPhoto" | "getStoreData" | "resetStore">;
  resetStore: () => void;
}

export const useStoreCreator = create<StoreType>()((set, get) => ({
  storename: null,
  storeurl: null,
  description: "",
  profile_photo: null,
  cover_photo: null,
  setNameAndUrl: (name: string, url: string) =>
    set({ storename: name, storeurl: url }),
  setDescription: (description: string) => set({ description }),
  setProfilePhoto: (photo: File | null) => set({ profile_photo: photo }),
  setCoverPhoto: (photo: File | null) => set({ cover_photo: photo }),
  getStoreData: () => {
    const state = get();
    return {
      storename: state.storename,
      storeurl: state.storeurl,
      description: state.description,
      profile_photo: state.profile_photo,
      cover_photo: state.cover_photo,
    };
  },
  resetStore: () =>
    set({
      storename: null,
      storeurl: null,
      description: "",
      profile_photo: null,
      cover_photo: null,
    }),
}))
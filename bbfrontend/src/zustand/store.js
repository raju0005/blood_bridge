import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (info) => set(() => ({ userInfo: info })),
      clearUserInfo: () => set(() => ({ userInfo: null })),
    }),
    {
      name: "userInfo",
      partialize: (state) => ({ userInfo: state.userInfo }),
    }
  )
);

export default useUserStore;

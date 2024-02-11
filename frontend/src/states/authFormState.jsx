import { create } from "zustand";
import { devtools } from "zustand/middleware";
export const useAuthFormStore = create(
    devtools((set) => ({
        openLogin: false,
        openSignUp: false,
        setOpenLogin: (value) => set({ openLogin: value }),
        setOpenSignUp: (value) => set({ openSignUp: value }),
    }))
);

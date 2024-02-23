import { create } from "zustand";
import { devtools } from "zustand/middleware";
export const useUserStore = create(
    devtools((set) => ({
        isAuthenticated: false,
        setIsAuthenticated: (value) => set({ isAuthenticated: value }),
        userInfo: null,
        setUserInfo: (value) => {
            set({ userInfo: value });
        },
        authLoading: true,
        setAuthLoading: (value) => set({ authLoading: value }),
    }))
);

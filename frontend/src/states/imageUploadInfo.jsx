import { create } from "zustand";
import { devtools } from "zustand/middleware";
export const useImageUploadStore = create(
    devtools((set) => ({
        imageInfo: {
            url: "",
            theme: "",
            sketch: {
                blur: 3,
                sharpness: 10,
            },
            cartoonURL: "",
        },
        isLoading: false,
        setImageInfo: (value) =>
            set((state) => ({
                imageInfo: { ...state.imageInfo, ...value },
            })),
        setIsLoading: (value) => set({ isLoading: value }),
    }))
);

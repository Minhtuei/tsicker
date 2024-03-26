import { create } from "zustand";
import { devtools } from "zustand/middleware";
export const useImageUploadStore = create(
    devtools((set) => ({
        imageFile: null,
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
        setImageFile: (value) => set({ imageFile: value }),
        setIsLoading: (value) => set({ isLoading: value }),
    }))
);

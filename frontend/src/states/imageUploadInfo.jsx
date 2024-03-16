import { create } from "zustand";
import { devtools } from "zustand/middleware";
export const useImageUploadStore = create(
    devtools((set) => ({
        imageInfo: {
            url: "",
            theme: "",
            sketch: {
                isSketch: false,
                blur: 0,
                sharpness: 0,
            },
            cartoonURL: "",
        },
        setImageInfo: (value) =>
            set((state) => ({
                imageInfo: { ...state.imageInfo, ...value },
            })),
    }))
);

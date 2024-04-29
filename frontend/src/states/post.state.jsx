import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { postService } from "../services/postService";
export const usePostStore = create(
    devtools((set) => ({
        posts: [],
        getAllPosts: async () => {
            const response = await postService.getAllPosts();
            if (response.success) {
                set({ posts: response.posts });
            }
        },
        addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
        clearPosts: () => set({ posts: [] }),
    }))
);

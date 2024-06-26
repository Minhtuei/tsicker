import axios from "axios";
export const postService = {
    cartoonify: async (imageInfo) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVERLESS_API_URL}`,
                {
                    url: imageInfo.url,
                    theme: imageInfo.theme,
                    sketch: imageInfo.sketch,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, error: error.message };
        }
    },
    uploadPost: async (postInfo) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/post/create`,
                postInfo,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, error: error.message };
        }
    },
    getAllPosts: async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/post/getAll`
            );
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, error: error.message };
        }
    },
    getPost: async (postId) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_REACT_API_URL}/post/${postId}`
            );
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, error: error.message };
        }
    },
};

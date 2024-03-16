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
};

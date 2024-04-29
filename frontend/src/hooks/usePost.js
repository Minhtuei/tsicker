import { useState, useEffect } from "react";
import { postService } from "../services/postService";

function usePost(postId) {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await postService.getPost(postId);
            if (response.success) {
                setPost(response.post);
            }
        };

        fetchPost();
    }, [postId]);

    return post;
}

export default usePost;

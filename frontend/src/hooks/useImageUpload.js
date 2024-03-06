import { useState, useCallback } from "react";

const useImageUpload = () => {
    const [imageUrl, setImageUrl] = useState("");

    const handleUploadImage = useCallback(() => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.onchange = () => {
            const file = fileInput.files[0];
            const reader = new FileReader();
            if (file) {
                reader.onload = (e) => {
                    setImageUrl(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        };
        fileInput.value = null;
        fileInput.click();
    }, []);

    const clearImage = useCallback(() => {
        setImageUrl("");
    }, []);

    return [imageUrl, handleUploadImage, clearImage];
};

export default useImageUpload;

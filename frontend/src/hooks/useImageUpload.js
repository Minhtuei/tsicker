import { useState, useCallback } from "react";

const useImageUpload = () => {
    const [file, setFile] = useState(null);
    const handleUploadImage = useCallback(() => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.onchange = () => {
            const file = fileInput.files[0];
            if (file) {
                setFile(file);
            }
        };
        fileInput.value = null;
        fileInput.click();
    }, []);

    const clearImage = useCallback(() => {
        setFile(null);
    }, []);

    return [file, handleUploadImage, clearImage];
};

export default useImageUpload;

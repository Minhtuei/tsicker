export const getImageUrl = async (file) => {
    const reader = new FileReader();
    await new Promise((resolve, reject) => {
        reader.onload = () => resolve();
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
    return reader.result;
};

export const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    const metadata = { type: data.type };
    const filename = "cartoonify.jpg";
    const file = new File([data], filename, metadata);
    return file;
};

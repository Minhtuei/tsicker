const {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} = require("firebase/storage");
const crypto = require("crypto");
// const sharp = require("sharp");
const uploadImage = async (file) => {
    const storage = getStorage();
    // const buffer = await sharp(file.buffer)
    //     .resize({ height: 1920, width: 1080, fit: "contain" })
    //     .toBuffer();
    const imageName = crypto.randomBytes(32).toString("hex");
    const storageRef = ref(storage, `images/${imageName}`);
    const metadata = {
        contentType: file.mimetype,
    };
    const snapshot = await uploadBytesResumable(
        storageRef,
        file.buffer,
        metadata
    );
    const imageURL = await getDownloadURL(snapshot.ref);
    return imageURL;
};

module.exports = {
    uploadImage,
};

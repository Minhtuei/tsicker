const firebaseConfig = require("../configs/firebaseConfig");
const { initializeApp } = require("firebase/app");
const firebaseClient = initializeApp(firebaseConfig);
module.exports = {
    firebaseClient,
};

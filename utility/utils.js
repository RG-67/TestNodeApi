const bcrypt = require('bcrypt');

function generateUserId() {
    const prefix = "US";
    const date = Date.now();
    const randomKey = Math.floor(Math.random() * 1000);
    return `${prefix}${date}${randomKey}`;
}

function getDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth()+1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

function getTime() {
    const time = new Date();
    const hour = String(time.getHours()).padStart(2, '0');
    const minute = String(time.getMinutes()).padStart(2, '0');
    return `${hour}:${minute}`;
}

async function setPassword(plainText) {
    const hassPass = await bcrypt.hash(plainText, 10);
    return hassPass;
}

async function getPassword(plainText, storePass) {
    const isMatch = await bcrypt.compare(plainText, storePass);
    if (isMatch) {
        return true;
    } else {
        return false;
    }
}


module.exports = {
    generateUserId,
    getDate,
    getTime,
    setPassword,
    getPassword
}
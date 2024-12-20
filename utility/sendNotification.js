const admin = require('firebase-admin');
const serviceAccount = require('../service_account_key/serviceKey.json');
const appCred = require('./appCred');

/* let scheduleDateTime = [
    new Date(new Date().getTime() + 60 * 1000),  // 1 minute from now
    new Date(new Date().getTime() + 2 * 60 * 1000) // 2 minutes from now
] */

console.log("Starting notification scheduler...");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

/**
 * @param {String} userToken
 * @param {String} title
 * @param {String} body
 */

async function sendNotification(userToken, title, body) {
    const message = {
        notification: {
            title: title,
            body: body
        },
        token: userToken,
        android: {
            priority: "high",
        },
    };

    try {
        const response = await admin.messaging().send(message);
        console.log("Successfully send notification", response);
    } catch (error) {
        console.log("Error sending notification", error);
    }
}

/* const userToken = appCred.token;
const notificationTitle = "Hello World!!";
const notificationBody = "Test message"; */

/* const intervalID = setInterval(() => {
    const currentTime = new Date();
    console.log("Checking at:", currentTime);

    scheduleDateTime.forEach((scheduleDate, index) => {
        if (currentTime >= scheduleDate) {
            console.log("Sending notification for:", scheduleDate);
            sendNotification(userToken, notificationTitle, `${notificationBody} schedule for: ${scheduleDate}`);
        }
    });

    scheduleDateTime = scheduleDateTime.filter(date => currentTime < date);

    if (scheduleDateTime.length === 0) {
        console.log("All scheduled notifications have been sent. Stopping the scheduler.");
        clearInterval(intervalID);
    }
}, 1000); */



module.exports = { sendNotification };
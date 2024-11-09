// const dateTime = new Date();
const dateTime = new Date(new Date().getTime() + 60 * 1000);
console.log(dateTime);



module.exports = {dateTime}




/* const admin = require('firebase-admin');
const cron = require('node-cron');
const MongoClient = require('mongodb').MongoClient;
const serviceAccount = require('./path/to/serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// MongoDB setup (replace with your connection URI)
const dbURI = "mongodb+srv://your-connection-string";
const client = new MongoClient(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

async function sendNotification(token, title, body) {
  const message = {
    notification: { title: title, body: body },
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Notification sent successfully:", response);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

async function checkAndSendNotifications() {
  const currentTime = new Date();

  // Connect to MongoDB and fetch pending notifications
  const db = client.db("your-database-name");
  const notifications = await db.collection("notifications")
    .find({ scheduledTime: { $lte: currentTime }, status: "pending" })
    .toArray();

  notifications.forEach(async (notification) => {
    // Send notification
    await sendNotification(notification.token, notification.title, notification.body);

    // Update status to "sent" in the database
    await db.collection("notifications").updateOne(
      { _id: notification._id },
      { $set: { status: "sent" } }
    );
  });
}

// Schedule the job to run every minute
cron.schedule('* * * * *', async () => {
  console.log("Running scheduled job to check for notifications...");
  await checkAndSendNotifications();
});

// Start MongoDB client
client.connect().then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

 */
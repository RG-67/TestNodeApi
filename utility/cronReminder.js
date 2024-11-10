const cron = require('node-cron');
const noteReminder = require('../models/noteReminder');
const { sendNotification } = require('./sendNotification');



cron.schedule('* * * * *', async() => {
    console.log('Checking for due reminder');
    const currentTime = new Date();

    try {
        const dueReminder = await noteReminder.find({isSendNotification: 1, reminderDateTime: {$lte: currentTime}});
        dueReminder.forEach(async (reminder) => {
            await sendNotification(reminder.userToken, "", `You have a reminder for user: ${reminder.userId} and noteId: ${reminder.noteId}`);
            await noteReminder.updateOne({_id: reminder._id}, {$set: {isSendNotification: 0}});
            console.log(`Note send for reminder id ${reminder._id}`);
        })
    } catch (error) {
        console.log('Error checking reminder', error);
    }
})

console.log('Crop job has been set up');
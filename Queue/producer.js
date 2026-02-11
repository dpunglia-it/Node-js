import { emailQueue } from "./queue.js";

async function addJob() {
    await emailQueue.add("sendemail", {
        email: "dp@gmail.com",
        message : "Welcome Dp",
    });
    console.log("Job added");
};

addJob();

import { Practice_queue } from "./queue.js";

async function clearQueue() {
    try {
        console.log("Starting queue cleanup...");

        // Remove waiting + delayed jobs
        // await Practice_queue.drain();

        // Remove completed jobs
        await Practice_queue.clean(0, 10, "completed");

        // Remove failed jobs
        await Practice_queue.clean(0, 10, "failed");

        console.log("Queue cleaned successfully");
    } catch (error) {
        console.error("Error cleaning queue:", error);
    }
    process.exit(0);
}

clearQueue();

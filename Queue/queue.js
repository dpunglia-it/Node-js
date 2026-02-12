import {Queue, Worker} from "bullmq";

export const connection = {
    host: "127.0.0.1",
    port: 6379,
};

export const emailQueue = new Queue("emailQueue", { connection });
export const Practice_queue = new Queue("Practice_queue", { connection });

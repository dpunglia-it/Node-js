import { Worker } from "bullmq";
import { connection } from "./queue.js";

const worker = new Worker ("emailQueue", async (job) => {
    console.log(job.data);
},
{ connection }
);
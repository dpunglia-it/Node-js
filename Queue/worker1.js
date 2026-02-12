import { Worker } from "bullmq";

let retryFailCount = 0;

const worker = new Worker(
  "Practice_queue",
  async job => {

    console.log("Processing:", job.name, job.data);

    // 1️⃣ Retry Logic Simulation
    if (job.name === "retry-job") {
      if (retryFailCount < 2) {
        retryFailCount++;
        console.log("Failing retry job intentionally...");
        throw new Error("Intentional Failure");
      }
      return "Retry Success";
    }

    // Simulate processing time
    await new Promise(res => setTimeout(res, 2000));

    return "Done";
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379
    },

    // 4️⃣ Concurrency Limit
    concurrency: 2
  }
);

// Events
worker.on("completed", job => {
  console.log("Completed:", job.name);
});

worker.on("failed", (job, err) => {
  console.log("Failed:", job.name, err.message);
});

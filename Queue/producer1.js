import { Practice_queue } from "./queue.js";

// 1️⃣ Retry Logic Job
await Practice_queue.add(
  "retry-job",
  { task: "Retry Example" },
  {
    attempts: 3,
    backoff: {
      type: "fixed",
      delay: 3000
    }
  }
);

// 2️⃣ Delayed Job (10 Seconds)
await Practice_queue.add(
  "delayed-job",
  { task: "Run After 10 Seconds" },
  {
    delay: 10000
  }
);

// 3️⃣ Priority Jobs
await Practice_queue.add(
  "low-priority-job",
  { task: "Low Priority" },
  { priority: 5 }
);

await Practice_queue.add(
  "high-priority-job",
  { task: "High Priority" },
  { priority: 1 }
);

console.log("Jobs Added");

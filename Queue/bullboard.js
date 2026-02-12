import express from "express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

import { Practice_queue } from "./queue.js";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [
    new BullMQAdapter(Practice_queue)
  ],
  serverAdapter
});

const app = express();

app.use("/admin/queues", serverAdapter.getRouter());

app.listen(3000, () => {
  console.log("Bull Board running at:");
  console.log("http://localhost:3000/admin/queues");
});

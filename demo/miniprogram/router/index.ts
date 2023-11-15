import { createRouter } from "../sliky/router/index.js";

export const router = createRouter<{
  "pages/index/index": {};
  "pages/logs/logs": {
    log: 1;
  };
}>();

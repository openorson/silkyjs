import { createApp } from "../sliky/app/index.js";
import { defineAppHooks } from "../sliky/app/hooks/index.js";

const root = createApp();

defineAppHooks(root, {
  onLaunch() {},
});

export const app = root;

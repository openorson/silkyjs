import { createApp } from "../sliky/app/index.js";
import { defineAppHooks } from "../sliky/app/hooks/index.js";
import { defineStore } from "../sliky/app/store/index.js";
import { AppStore } from "../store/app/index.js";

const root = createApp();

defineStore(root, { AppStore });

defineAppHooks(root, {
  onLaunch(opts) {
    console.log("onLaunch", opts);
  },
});

export const app = root;

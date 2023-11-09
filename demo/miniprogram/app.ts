import { defineAppHooks } from "./sliky/app/hooks/index.js";
import { defineAppState } from "./sliky/app/state/index.js";
import { createApp } from "./sliky/index.js";

const app = createApp();

defineAppState(app, {
  token: "123",
});

defineAppHooks(app, {
  onLaunch(opts) {
    console.log("onLaunch", opts);
  },
});

app.bootstrap();

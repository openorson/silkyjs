import { useAppHooks } from "./sliky/app/hooks/index.js";
import { createApp } from "./sliky/app/index.js";

const app = createApp();

useAppHooks(app, {
  onLaunch() {},
});

app.bootstrap();

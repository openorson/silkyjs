import { createApp } from "./sliky/index.js";

const app = createApp();

app.onLaunch((opts) => {
  console.log("onLaunch", opts);
});

app.bootstrap();

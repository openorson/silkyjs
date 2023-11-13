import { defineState } from "../../sliky/page/state/index.js";
import { defineHooks } from "../../sliky/page/hooks/index.js";
import { defineEffects } from "../../sliky/page/effects/index.js";
import { createPage } from "../../sliky/page/index.js";
import { defineActions } from "../../sliky/page/actions/index.js";
import { defineStores } from "../../sliky/page/store/index.js";
import { appStore } from "../../store/index.js";

const page = createPage();

defineStores(page, { app: appStore });

defineState(page, {
  count: 1,
  user: {
    name: "jack",
    age: 18,
    info: {
      a: 1,
      b: 2,
    },
  },
});

defineEffects(page, {
  count: {
    effect(args) {
      console.log("count", args);
    },
    dependencies: ["count"],
  },
  username: {
    effect(args) {
      console.log("user.name", args);
    },
    dependencies: ["user.name"],
  },
});

defineActions(page, {
  incr() {
    page.state.count++;
  },
  changeName() {
    page.state.user.name = "rose";
  },
  changeInfo() {
    page.state.user.info = { a: 2, b: 3 };
  },
});

defineHooks(page, {
  onLoad() {
    page.store.app.field = 10;
  },
});

page.bootstrap();

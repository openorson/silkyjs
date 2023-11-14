import { createPage } from "../../sliky/page/index.js";
import { useState } from "../../sliky/page/state/index.js";
import { useHooks } from "../../sliky/page/hooks/index.js";
import { useEffects } from "../../sliky/page/effects/index.js";
import { useActions } from "../../sliky/page/actions/index.js";
import { useApp } from "../../store/index.js";

const page = createPage();

const app = useApp();

useState(page, {
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

useEffects(page, {
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

useActions(page, {
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

useHooks(page, {
  onLoad() {
    app.inject();
  },
});

page.bootstrap();

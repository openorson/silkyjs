import { defineActions } from "../../sliky/page/actions/index.js";
import { createPage } from "../../sliky/index.js";
import { defineState } from "../../sliky/page/state/index.js";
import { defineHooks } from "../../sliky/page/hooks/index.js";
import { defineGetters } from "../../sliky/page/getters/index.js";

const page = createPage();

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

defineGetters(page, {
  username: (state: any) => state.user.name,
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
  onLoad(query) {
    console.log(query);
  },
});

page.bootstrap();

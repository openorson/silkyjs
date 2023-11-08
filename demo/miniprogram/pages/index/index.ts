import { createPage } from "../../sliky/index.js";

const page = createPage({
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

page.onLoad((opts) => {
  console.log("onLoad", opts);
});

page.actions({
  incr() {
    page.state.count++;
  },
  changeName() {
    // page.state.user = { name: "rose", age: 17, info: { a: 1, b: 2 } };
    page.state.user.name = "rose";
  },
  changeInfo() {
    page.state.user.info = { a: 2, b: 3 };
  },
});

page.bootstrap();

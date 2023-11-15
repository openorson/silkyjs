import { createPage } from "../../sliky/page/index.js";
import { useHooks } from "../../sliky/page/hooks/index.js";
import { router } from "../../router/index.js";
import { useActions } from "../../sliky/page/actions/index.js";

const page = createPage();

useActions(page, {
  back() {
    router.back({ index: 1 }, 1);
  },
});

useHooks(page, {
  onShow() {
    console.log("logs", router.route.path, router.route.parmas);
  },
});

page.bootstrap();

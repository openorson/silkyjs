import { Page, PageActions, PageEffects, PageHooks, PageState, PageStore } from "../index.js";

export function defineHooks<
  Store extends PageStore,
  State extends PageState,
  Actions extends PageActions,
  Effects extends PageEffects,
  Hooks extends PageHooks
>(page: Page<Store, State, Actions, Effects, {}>, hooks: Hooks): asserts page is Page<Store, State, Actions, Effects, Hooks> {
  Object.entries(hooks).forEach(([name, hook]) => {
    const wrapper: { [Name in keyof PageHooks]?: (callback: PageHooks[Name]) => PageHooks[Name] } = {
      onLoad(callback) {
        return function onLoad(this: WechatMiniprogram.Page.Instance<State, {}>, ...args) {
          page.self = this;
          page.route.path = page.self.route;
          page.route.query = args[0] ?? {};
          callback?.call(null, ...args);
        };
      },
    };

    page.options[name] = Reflect.has(wrapper, name) ? wrapper[name as keyof PageHooks]!(hook as any) : hook;
  });
}

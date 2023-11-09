import { Page, PageActions, PageGetters, PageHooks, PageState, PageTrackers, PageTriggers } from "../index.js";

export function defineHooks<
  State extends PageState,
  Getters extends PageGetters,
  Actions extends PageActions,
  Trackers extends PageTrackers,
  Triggers extends PageTriggers,
  Hooks extends PageHooks
>(
  page: Page<State, Getters, Actions, Trackers, Triggers, {}>,
  hooks: Hooks
): asserts page is Page<State, Getters, Actions, Trackers, Triggers, Hooks> {
  Object.entries(hooks).forEach(([name, hook]) => {
    const wrapper: { [Name in keyof PageHooks]?: (callback: PageHooks[Name]) => PageHooks[Name] } = {
      onLoad(callback) {
        return function onLoad(this: any, ...args) {
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

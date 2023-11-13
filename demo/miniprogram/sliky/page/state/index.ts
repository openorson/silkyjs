import { createReactive } from "../../common/reactive.js";
import { Page, PageActions, PageEffects, PageHooks, PageState, PageStore } from "../index.js";

export function defineState<
  Store extends PageStore,
  State extends PageState,
  Actions extends PageActions,
  Effects extends PageEffects,
  Hooks extends PageHooks
>(page: Page<Store, {}, Actions, Effects, Hooks>, initialState: State): asserts page is Page<Store, State, Actions, Effects, Hooks> {
  const _initialState = (initialState ?? {}) as State;

  const reactive = createReactive({
    trigger(args) {
      const path = args.path.join(".");

      page.self.setData({ [path]: args.value });

      Object.entries(page.effects).forEach(([_, { effect, dependencies }]) => {
        if (dependencies.includes(path)) effect(args);
      });
    },
  });

  Object.assign(page.options.data, _initialState);

  page.state = reactive(_initialState);
}

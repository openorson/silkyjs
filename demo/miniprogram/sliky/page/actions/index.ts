import { Page, PageActions, PageEffects, PageHooks, PageState, PageStore } from "../index.js";

export function defineActions<
  Store extends PageStore,
  State extends PageState,
  Actions extends PageActions,
  Effects extends PageEffects,
  Hooks extends PageHooks
>(page: Page<Store, State, {}, Effects, Hooks>, actions: Actions): asserts page is Page<Store, State, Actions, Effects, Hooks> {
  Object.entries(actions).forEach(([name, action]) => (page.options[name] = action));
}

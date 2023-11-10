import { Page, PageActions, PageEffects, PageGetters, PageHooks, PageState } from "../index.js";

export function defineActions<
  State extends PageState,
  Getters extends PageGetters,
  Actions extends PageActions,
  Effects extends PageEffects,
  Hooks extends PageHooks
>(page: Page<State, Getters, {}, Effects, Hooks>, actions: Actions): asserts page is Page<State, Getters, Actions, Effects, Hooks> {
  Object.entries(actions).forEach(([name, action]) => (page.options[name] = action));
}

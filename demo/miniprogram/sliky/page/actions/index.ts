import { Page, PageActions, PageEffects, PageHooks, PageState } from "../index.js";

export function useActions<State extends PageState, Actions extends PageActions, Effects extends PageEffects, Hooks extends PageHooks>(
  page: Page<State, {}, Effects, Hooks>,
  actions: Actions
): asserts page is Page<State, Actions, Effects, Hooks> {
  Object.entries(actions).forEach(([name, action]) => (page.options[name] = action));
}

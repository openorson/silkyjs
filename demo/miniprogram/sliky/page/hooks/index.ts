import { Page, PageActions, PageEffects, PageHooks, PageState } from "../index.js";

export function useHooks<State extends PageState, Actions extends PageActions, Effects extends PageEffects, Hooks extends PageHooks>(
  page: Page<State, Actions, Effects, {}>,
  hooks: Hooks
): asserts page is Page<State, Actions, Effects, Hooks> {
  Object.entries(hooks).forEach(([name, hook]) => {
    page.options[name] = hook;
  });
}

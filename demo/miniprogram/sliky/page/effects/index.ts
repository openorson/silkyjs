import { Page, PageActions, PageEffects, PageHooks, PageState, PageStore } from "../index.js";

export function defineEffects<
  Store extends PageStore,
  State extends PageState,
  Actions extends PageActions,
  Effects extends PageEffects,
  Hooks extends PageHooks
>(page: Page<Store, State, Actions, {}, Hooks>, effects: Effects): asserts page is Page<Store, State, Actions, Effects, Hooks> {
  page.effects = effects;
}

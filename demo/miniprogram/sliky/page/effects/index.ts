import { Page, PageActions, PageEffects, PageGetters, PageHooks, PageState } from "../index.js";

export function defineEffects<
  State extends PageState,
  Getters extends PageGetters,
  Actions extends PageActions,
  Effects extends PageEffects,
  Hooks extends PageHooks
>(page: Page<State, Getters, Actions, {}, Hooks>, effects: Effects): asserts page is Page<State, Getters, Actions, Effects, Hooks> {
  page.effects = effects;
}

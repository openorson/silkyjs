import { Page, PageActions, PageEffects, PageHooks, PageState } from "../index.js";

export function useEffects<State extends PageState, Actions extends PageActions, Effects extends PageEffects, Hooks extends PageHooks>(
  page: Page<State, Actions, {}, Hooks>,
  effects: Effects
): asserts page is Page<State, Actions, Effects, Hooks> {
  page.effects = effects;
}

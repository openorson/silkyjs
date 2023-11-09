import { Page, PageActions, PageGetters, PageHooks, PageState, PageTrackers, PageTriggers } from "../index.js";

export function defineTriggers<
  State extends PageState,
  Getters extends PageGetters,
  Actions extends PageActions,
  Trackers extends PageTrackers,
  Triggers extends PageTriggers,
  Hooks extends PageHooks
>(
  page: Page<State, Getters, Actions, Trackers, {}, Hooks>,
  triggers: Triggers
): asserts page is Page<State, Getters, Actions, Trackers, Triggers, Hooks> {
  page.triggers = triggers;
}

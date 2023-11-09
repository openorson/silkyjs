import { Page, PageActions, PageGetters, PageHooks, PageState, PageTrackers, PageTriggers } from "../index.js";

export function defineGetters<
  State extends PageState,
  Getters extends PageGetters,
  Actions extends PageActions,
  Trackers extends PageTrackers,
  Triggers extends PageTriggers,
  Hooks extends PageHooks
>(
  page: Page<State, {}, Actions, Trackers, Triggers, Hooks>,
  getters: Getters
): asserts page is Page<State, Getters, Actions, Trackers, Triggers, Hooks> {
  page.getters = getters;
}

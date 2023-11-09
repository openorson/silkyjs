import { Page, PageActions, PageGetters, PageHooks, PageState, PageTrackers, PageTriggers } from "../index.js";

export function defineTrackers<
  State extends PageState,
  Getters extends PageGetters,
  Actions extends PageActions,
  Trackers extends PageTrackers,
  Triggers extends PageTriggers,
  Hooks extends PageHooks
>(
  page: Page<State, Getters, Actions, {}, Triggers, Hooks>,
  trackers: Trackers
): asserts page is Page<State, Getters, Actions, Trackers, Triggers, Hooks> {
  page.trackers = trackers;
}

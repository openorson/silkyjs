import { Page, PageActions, PageGetters, PageHooks, PageState, PageTrackers, PageTriggers } from "../index.js";

export function defineActions<
  State extends PageState,
  Getters extends PageGetters,
  Actions extends PageActions,
  Trackers extends PageTrackers,
  Triggers extends PageTriggers,
  Hooks extends PageHooks
>(
  page: Page<State, Getters, {}, Trackers, Triggers, Hooks>,
  actions: Actions
): asserts page is Page<State, Getters, Actions, Trackers, Triggers, Hooks> {
  Object.entries(actions).forEach(([name, action]) => (page.options[name] = action));
}

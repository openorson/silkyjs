import { Page, PageActions, PageGetters, PageHooks, PageState, PageTrackers, PageTriggers } from "../index.js";

export function defineGetters<
  State extends PageState,
  Getters extends PageGetters<State>,
  Actions extends PageActions,
  Trackers extends PageTrackers,
  Triggers extends PageTriggers,
  Hooks extends PageHooks
>(
  page: Page<State, {}, Actions, Trackers, Triggers, Hooks>,
  getters: Getters
): asserts page is Page<State, Getters, Actions, Trackers, Triggers, Hooks> {
  const _getters = (getters ?? {}) as Getters;

  const initialData = Object.fromEntries(Object.entries(_getters).map(([name, getter]) => [name, getter(page.state)]));

  Object.assign(page.options.data, initialData);
}

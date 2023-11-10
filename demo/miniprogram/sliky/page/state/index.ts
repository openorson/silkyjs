import { createReactive } from "../../common/reactive.js";
import { Page, PageActions, PageGetters, PageHooks, PageState, PageTrackers, PageTriggers } from "../index.js";

export function defineState<
  State extends PageState,
  Getters extends PageGetters,
  Actions extends PageActions,
  Trackers extends PageTrackers,
  Triggers extends PageTriggers,
  Hooks extends PageHooks
>(
  page: Page<{}, Getters, Actions, Trackers, Triggers, Hooks>,
  initialState: State
): asserts page is Page<State, Getters, Actions, Trackers, Triggers, Hooks> {
  const _initialState = (initialState ?? {}) as State;

  const reactive = createReactive({
    trigger(args) {
      page.self.setData({ [args.path.join(".")]: args.value });
    },
  });

  Object.assign(page.options.data, _initialState);

  page.state = reactive(_initialState);
}

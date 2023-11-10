import { Page, PageActions, PageEffects, PageGetters, PageHooks, PageState } from "../index.js";

export function defineGetters<
  State extends PageState,
  Getters extends PageGetters<State>,
  Actions extends PageActions,
  Effects extends PageEffects,
  Hooks extends PageHooks
>(page: Page<State, {}, Actions, Effects, Hooks>, getters: Getters): asserts page is Page<State, Getters, Actions, Effects, Hooks> {
  const _getters = (getters ?? {}) as Getters;

  let initialData: Record<string, unknown> = {};
  Object.keys(_getters).forEach((key) => {
    if (key in page.state) throw new Error(`The getters property ${key} duplicates the state property.`);

    const getter = _getters[key];

    initialData[key] = getter(page.state);
  });

  Object.assign(page.options.data, initialData);
}

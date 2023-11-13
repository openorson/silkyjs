import { Page, PageActions, PageEffects, PageHooks, PageState, PageStore } from "../index.js";

function getAllMethods(obj: object) {
  let props: string[] = [];

  do {
    const l = Object.getOwnPropertyNames(obj)
      .concat(Object.getOwnPropertySymbols(obj).map((s) => s.toString()))
      .sort()
      .filter(
        (p, i, arr) =>
          typeof obj[p as keyof typeof obj] === "function" && p !== "constructor" && (i == 0 || p !== arr[i - 1]) && props.indexOf(p) === -1
      );
    props = props.concat(l);
  } while ((obj = Object.getPrototypeOf(obj)) && Object.getPrototypeOf(obj));

  return props;
}

export function defineStores<
  Store extends PageStore,
  State extends PageState,
  Actions extends PageActions,
  Effects extends PageEffects,
  Hooks extends PageHooks
>(page: Page<{}, State, Actions, Effects, Hooks>, store: Store): asserts page is Page<Store, State, Actions, Effects, Hooks> {
  const _store = Object.entries(store).map(([name, store]) => {
    let key = name.split(/store/i)[0];
    key = key.charAt(0).toLowerCase() + key.slice(1);

    const ref = new Proxy(store, {
      set(target, prop, value, receiver) {
        const result = Reflect.set(target, prop, value, receiver);

        const path = `store.${key}.${prop as string}`;
        page.self.setData({ [path]: value } as any);

        return result;
      },
    });

    return [
      key,
      {
        data: JSON.parse(JSON.stringify(store)),
        actions: getAllMethods(store).map((name) => [name, (store[name as keyof typeof store] as Function).bind(ref)]),
        raw: store,
        ref,
      },
    ] as const;
  });

  _store.forEach(([storeName, store]) => store.actions.forEach(([name, action]) => (page.options[`store.${storeName}.${name}`] = action)));

  Object.assign(page.options.data, { store: Object.fromEntries(_store.map(([name, store]) => [name, store.data])) });

  page.store = Object.fromEntries(_store.map(([name, store]) => [name, store.ref]));
}

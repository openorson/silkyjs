import { createReactive } from "../common/reactive";

export interface StoreConstructor<T = object> extends Function {
  new (...args: any[]): T;
}

export function createStore<Name extends string, Store extends object>(name: Name, constructor: StoreConstructor<Store>) {
  const store = new constructor();

  const data = JSON.parse(JSON.stringify(store));

  return function useStore() {
    let page: WechatMiniprogram.Page.Instance<{}, {}>;

    const reactive = createReactive({
      trigger(args) {
        if (!page) return;
        const path = `$.${name}.${args.path.join(".")}`;
        page.setData({ [path]: args.value } as any);
      },
    });

    function inject() {
      const pages = getCurrentPages();
      page = pages[pages.length - 1];
      page.setData({ [`$.${name}`]: data });
    }

    function reset() {}

    return { store: reactive(store), inject, reset };
  };
}

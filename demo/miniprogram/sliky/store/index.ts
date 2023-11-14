import { getOwnFunctionProperty } from "../common/property";
import { createReactive } from "../common/reactive";

export interface StoreConstructor<Type = {}> extends Function {
  new (...args: any[]): Type;
}

export interface Store<Name extends string, Entity extends {}> {
  name: Name;
  store: Entity;
  inject(): void;
  reset(): void;
}

export interface StoreUser<Name extends string, Entity extends {}> {
  $name: Name;
  (): Store<Name, Entity>;
}

export function createStore<Name extends string, Entity extends {}>(name: Name, entity: Entity) {
  const data = JSON.parse(JSON.stringify(entity));
  const functions = getOwnFunctionProperty(entity);

  const storeUser: StoreUser<Name, Entity> = function () {
    let page: WechatMiniprogram.Page.Instance<any, any>;

    const reactive = createReactive({
      trigger(args) {
        if (!page) return;
        const path = `$.${name}.${args.path.join(".")}`;
        page.setData({ [path]: args.value } as any);
      },
    });

    const store = reactive(entity);

    function inject() {
      const pages = getCurrentPages();
      page = pages[pages.length - 1];

      page.setData({ [`$.${name}`]: data });

      functions.forEach((action) => {
        page[`$.${name}.${action}`] = (...args: any[]) => (entity[action as keyof typeof entity] as Function).call(store, ...args);
      });
    }

    function reset() {}

    return { name, store, inject, reset };
  };

  storeUser["$name"] = name;

  return storeUser;
}

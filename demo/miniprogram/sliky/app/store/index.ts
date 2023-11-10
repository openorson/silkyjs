import { AppHooks, App, AppStore } from "../index.js";

export abstract class Store {}

export function defineStore<Store extends AppStore, Hooks extends AppHooks>(app: App<{}, Hooks>, store: Store): asserts app is App<Store, Hooks> {
  app.store = store;
}

export interface StoreConstructor<T extends Store = Store> extends Function {
  new (...args: any[]): T;
}

export abstract class Store {}

export function createStore<Stores extends Record<string, StoreConstructor>>(
  stores: Stores
): { [Name in keyof Stores as Uncapitalize<Extract<keyof Stores, string>>]: InstanceType<Stores[Name]> } {
  return stores as any;
}

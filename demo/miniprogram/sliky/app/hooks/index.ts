import { AppHooks, App, AppStore } from "../index.js";

export function defineAppHooks<Store extends AppStore, Hooks extends AppHooks>(app: App<Store, {}>, hooks: Hooks): asserts app is App<Store, Hooks> {
  Object.entries(hooks).forEach(([name, hook]) => {
    const wrapper: { [Name in keyof AppHooks]?: (callback: AppHooks[Name]) => AppHooks[Name] } = {
      onLaunch(callback) {
        return function onLaunch(this: any, ...args) {
          app.self = this;
          callback?.call(null, ...args);
        };
      },
    };

    app.options[name] = Reflect.has(wrapper, name) ? wrapper[name as keyof AppHooks]!(hook as any) : hook;
  });
}

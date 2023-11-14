import { AppHooks, App } from "../index.js";

export function useAppHooks<Hooks extends AppHooks>(app: App<{}>, hooks: Hooks): asserts app is App<Hooks> {
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

import { AppHooks, App } from "../index.js";

export function useAppHooks<Hooks extends AppHooks>(app: App<{}>, hooks: Hooks): asserts app is App<Hooks> {
  Object.entries(hooks).forEach(([name, hook]) => {
    app.options[name] = hook;
  });
}

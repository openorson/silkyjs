import { createReactive } from "../../common/reactive.js";
import { AppState, AppHooks, App } from "../index.js";

export function defineAppState<State extends AppState, Hooks extends AppHooks>(
  app: App<{}, Hooks>,
  initialState: State
): asserts app is App<State, Hooks> {
  const initialData = (initialState ?? {}) as State;

  const reactive = createReactive({
    trigger(args) {
      app.self.setData({ [args.path.join(".")]: args.value });
    },
  });

  app.options.appData = initialData;
  app.state = reactive(initialData);
}

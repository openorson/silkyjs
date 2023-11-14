import { createStore } from "../sliky/store/index.js";
import { AppStore } from "./app/index.js";

export const useApp = createStore("app", new AppStore());

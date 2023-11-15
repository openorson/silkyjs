import { createEventChannel } from "../index.js";

type BuiltInEvents = {
  "app-launch": WechatMiniprogram.App.LaunchShowOption;
  "app-show": WechatMiniprogram.App.LaunchShowOption;
  "app-hide": void;

  "page-load": { path: string; params: Record<string, string | undefined> };
  "page-show": void;
  "page-hide": void;
  "page-unload": void;
};

export const eventChannel = createEventChannel<BuiltInEvents>();

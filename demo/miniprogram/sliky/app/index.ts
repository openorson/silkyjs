import { eventChannel } from "../event/built-in/index.js";

export type AppHooks = {
  onLaunch?: (options: WechatMiniprogram.App.LaunchShowOption) => void;
  onShow?: (options: WechatMiniprogram.App.LaunchShowOption) => void;
  onHide?: () => void;
  onError?: (error: string) => void;
  onPageNotFound?: (options: WechatMiniprogram.App.PageNotFoundOption) => void;
  onUnhandledRejection?: WechatMiniprogram.OnUnhandledRejectionCallback;
  onThemeChange?: WechatMiniprogram.OnThemeChangeCallback;
};

export interface App<Hooks extends AppHooks = {}> {
  self: WechatMiniprogram.App.Instance<WechatMiniprogram.IAnyObject>;
  options: Record<string, any>;
  bootstrap: () => void;
}

export function createApp(): App {
  let self: any = null;

  const options: Partial<WechatMiniprogram.App.Option> & Record<string, unknown> = {};

  const app: App = {
    self,
    options,
    bootstrap() {
      options.onLaunch = async function (...args) {
        self = this;
        await options.onLaunch?.call?.(this, ...args);
        eventChannel.emit("app-launch", args[0]);
      };

      options.onShow = async function (...args) {
        await options.onShow?.call?.(this, ...args);
        eventChannel.emit("app-show", args[0]);
      };

      options.onHide = async function (...args) {
        await options.onHide?.call?.(this, ...args);
        eventChannel.emit("app-hide");
      };

      return App(options);
    },
  };

  return app;
}

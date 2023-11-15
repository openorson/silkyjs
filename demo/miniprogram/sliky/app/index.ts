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
      const onLaunch = options.onLaunch;
      options.onLaunch = async function (...args) {
        self = this;
        eventChannel.emit("app-launch", args[0]);
        await onLaunch?.call?.(this, ...args);
      };

      const onShow = options.onShow;
      options.onShow = async function (...args) {
        eventChannel.emit("app-show", args[0]);
        await onShow?.call?.(this, ...args);
      };

      const onHide = options.onHide;
      options.onHide = async function (...args) {
        eventChannel.emit("app-hide");
        await onHide?.call?.(this, ...args);
      };

      return App(options);
    },
  };

  return app;
}

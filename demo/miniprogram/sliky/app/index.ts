import { Store } from "./store/index.js";

export interface StoreConstructor<T extends Store = Store> extends Function {
  new (...args: any[]): T;
}

export type AppStore = Record<string, StoreConstructor>;
export type AppHooks = {
  onLaunch?: (options: WechatMiniprogram.App.LaunchShowOption) => void;
  onShow?: (options: WechatMiniprogram.App.LaunchShowOption) => void;
  onHide?: () => void;
  onError?: (error: string) => void;
  onPageNotFound?: (options: WechatMiniprogram.App.PageNotFoundOption) => void;
  onUnhandledRejection?: WechatMiniprogram.OnUnhandledRejectionCallback;
  onThemeChange?: WechatMiniprogram.OnThemeChangeCallback;
};

export interface App<Store extends AppStore = {}, Hooks extends AppHooks = {}> {
  self: WechatMiniprogram.App.Instance<WechatMiniprogram.IAnyObject>;
  options: Record<string, any>;
  store: { [Name in keyof Store as Uncapitalize<Extract<keyof Store, string>>]: InstanceType<Store[Name]> };
  hooks: Hooks;
  bootstrap: () => void;
}

export function createApp(): App {
  let self: any = null;

  const options: Partial<WechatMiniprogram.App.Option> & Record<string, unknown> = {};

  const app: App = {
    self,
    options,
    store: {},
    hooks: {},
    bootstrap() {
      return App(options);
    },
  };

  return app;
}

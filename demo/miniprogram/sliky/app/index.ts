export type AppState = {};
export type AppHooks = {
  onLaunch?: (options: WechatMiniprogram.App.LaunchShowOption) => void;
  onShow?: (options: WechatMiniprogram.App.LaunchShowOption) => void;
  onHide?: () => void;
  onError?: (error: string) => void;
  onPageNotFound?: (options: WechatMiniprogram.App.PageNotFoundOption) => void;
  onUnhandledRejection?: WechatMiniprogram.OnUnhandledRejectionCallback;
  onThemeChange?: WechatMiniprogram.OnThemeChangeCallback;
};

export interface App<State extends AppState = {}, Hooks extends AppHooks = {}> {
  self: WechatMiniprogram.App.Instance<WechatMiniprogram.IAnyObject>;
  options: Record<string, any>;
  state: State;
  hooks: Hooks;
  bootstrap: () => void;
}

export function createApp(): App {
  let self: any = null;

  const options: Partial<WechatMiniprogram.App.Option> & Record<string, unknown> = {};

  const app: App = {
    self,
    options,
    state: {},
    hooks: {},
    bootstrap() {
      return App(options);
    },
  };

  return app;
}

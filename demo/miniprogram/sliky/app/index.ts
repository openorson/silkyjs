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
  hooks: Hooks;
  bootstrap: () => void;
}

export function createApp(): App {
  let self: any = null;

  const options: Partial<WechatMiniprogram.App.Option> & Record<string, unknown> = {};

  const app: App = {
    self,
    options,
    hooks: {},
    bootstrap() {
      return App(options);
    },
  };

  return app;
}

export interface AppOptions<State extends {}> {
  state?: State;
  listener?: {
    onLaunch?: (options: WechatMiniprogram.App.LaunchShowOption) => void;
    onShow?: (options: WechatMiniprogram.App.LaunchShowOption) => void;
    onHide?: () => void;
    onError?: (error: string) => void;
    onPageNotFound?: (options: WechatMiniprogram.App.PageNotFoundOption) => void;
    onUnhandledRejection?: WechatMiniprogram.OnUnhandledRejectionCallback;
    onThemeChange?: WechatMiniprogram.OnThemeChangeCallback;
  };
}

export function createApp<State extends {}>(options: AppOptions<State>) {
  const { state, listener } = options;

  App({
    state,
    ...listener,
  });
}

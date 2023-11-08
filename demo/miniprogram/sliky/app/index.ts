export interface App {
  get self(): WechatMiniprogram.App.Instance<WechatMiniprogram.IAnyObject>;
  get options(): Record<string, any>;
  onLaunch: (callback: (options: WechatMiniprogram.App.LaunchShowOption) => void) => this;
  onShow: (callback: (options: WechatMiniprogram.App.LaunchShowOption) => void) => this;
  onHide: (callback: () => void) => this;
  onError: (callback: (error: string) => void) => this;
  onPageNotFound: (callback: (options: WechatMiniprogram.App.PageNotFoundOption) => void) => this;
  onUnhandledRejection: (callback: WechatMiniprogram.OnUnhandledRejectionCallback) => this;
  onThemeChange: (callback: WechatMiniprogram.OnThemeChangeCallback) => this;
  bootstrap: () => void;
}

export function createApp(): App {
  let _self: any = null;

  const _options: Partial<WechatMiniprogram.App.Option> & Record<string, unknown> = {};

  const app: App = {
    get self() {
      return _self;
    },
    get options() {
      return _options;
    },
    onLaunch(callback) {
      _options["onLaunch"] = function (...args) {
        _self = this;
        callback.call(null, ...args);
      };
      return this;
    },
    onShow(callback) {
      _options["onShow"] = callback.bind(null);
      return this;
    },
    onHide(callback) {
      _options["onHide"] = callback.bind(null);
      return this;
    },
    onError(callback) {
      _options["onError"] = callback.bind(null);
      return this;
    },
    onPageNotFound(callback) {
      _options["onPageNotFound"] = callback.bind(null);
      return this;
    },
    onUnhandledRejection(callback) {
      _options["onUnhandledRejection"] = callback.bind(null);
      return this;
    },
    onThemeChange(callback) {
      _options["onThemeChange"] = callback.bind(null);
      return this;
    },
    bootstrap() {
      return App(_options);
    },
  };

  return app;
}

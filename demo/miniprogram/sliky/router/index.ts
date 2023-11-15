import { objectToQueryString } from "../common/url.js";
import { eventChannel } from "../event/built-in/index.js";

export type RouterPushOptions = Omit<WechatMiniprogram.NavigateToOption, "url" | "success" | "fail" | "complete">;
export type RouterReplaceOptions = Omit<WechatMiniprogram.RedirectToOption, "url" | "success" | "fail" | "complete">;
export type RouterSwitchOptions = Omit<WechatMiniprogram.SwitchTabOption, "url" | "success" | "fail" | "complete">;
export type RouterLaunchOptions = Omit<WechatMiniprogram.ReLaunchOption, "url" | "success" | "fail" | "complete">;
export type RouterBackOptions = Omit<WechatMiniprogram.NavigateBackOption, "delta" | "success" | "fail" | "complete">;

export type RouterRoutes = Record<string, {}>;

export interface CurrentRoute<
  Routes extends RouterRoutes = Record<string, object>,
  Path extends Extract<keyof Routes, string> = Extract<keyof Routes, string>
> {
  path: Path;
  parmas: Partial<Routes[Path]>;
}

const CURRENT_ROUTE_KEY = Symbol("currentRoute");

class Router<Routes extends RouterRoutes = Record<string, object>> {
  private [CURRENT_ROUTE_KEY]: CurrentRoute<Routes> = {} as unknown as CurrentRoute<Routes>;

  get route() {
    return this[CURRENT_ROUTE_KEY];
  }

  constructor() {
    eventChannel.on("page-load", (args) => {
      this[CURRENT_ROUTE_KEY]["path"] = args.path as Extract<keyof Routes, string>;
      this[CURRENT_ROUTE_KEY]["parmas"] = Object.assign({}, this[CURRENT_ROUTE_KEY]["parmas"], args.params) as any;
    });
  }

  push<Path extends Extract<keyof Routes, string> = Extract<keyof Routes, string>, Params extends Partial<Routes[Path]> = Partial<Routes[Path]>>(
    path: Path,
    params?: Params,
    options?: RouterPushOptions
  ) {
    return new Promise<WechatMiniprogram.NavigateToSuccessCallbackResult>((success, fail) => {
      this[CURRENT_ROUTE_KEY].path = path;
      this[CURRENT_ROUTE_KEY].parmas = params ?? {};

      wx.navigateTo({
        ...options,
        url: `/${path}?${objectToQueryString(params)}`,
        success,
        fail,
      });
    });
  }

  replace<Path extends Extract<keyof Routes, string> = Extract<keyof Routes, string>, Params extends Partial<Routes[Path]> = Partial<Routes[Path]>>(
    path: Path,
    params?: Params,
    options?: RouterReplaceOptions
  ) {
    return new Promise<WechatMiniprogram.GeneralCallbackResult>((success, fail) => {
      this[CURRENT_ROUTE_KEY].path = path;
      this[CURRENT_ROUTE_KEY].parmas = params ?? {};

      wx.redirectTo({
        ...options,
        url: `/${path}?${objectToQueryString(params)}`,
        success,
        fail,
      });
    });
  }

  switch<Path extends Extract<keyof Routes, string> = Extract<keyof Routes, string>, Params extends Partial<Routes[Path]> = Partial<Routes[Path]>>(
    path: Path,
    params?: Params,
    options?: RouterSwitchOptions
  ) {
    return new Promise<WechatMiniprogram.GeneralCallbackResult>((success, fail) => {
      this[CURRENT_ROUTE_KEY].path = path;
      this[CURRENT_ROUTE_KEY].parmas = params ?? {};

      wx.switchTab({
        ...options,
        url: `/${path}`,
        success,
        fail,
      });
    });
  }

  launch<Path extends Extract<keyof Routes, string> = Extract<keyof Routes, string>, Params extends Partial<Routes[Path]> = Partial<Routes[Path]>>(
    path: Path,
    params?: Params,
    options?: RouterLaunchOptions
  ) {
    return new Promise<WechatMiniprogram.GeneralCallbackResult>((success, fail) => {
      this[CURRENT_ROUTE_KEY].path = path;
      this[CURRENT_ROUTE_KEY].parmas = params ?? {};

      wx.reLaunch({
        ...options,
        url: `/${path}?${objectToQueryString(params)}`,
        success,
        fail,
      });
    });
  }

  back<Path extends Extract<keyof Routes, string>>(params?: Partial<Routes[Path]>, delta?: number, options?: RouterBackOptions) {
    if (typeof delta === "number" && delta <= 0) return;

    const _delta = delta ?? 1;

    return new Promise<WechatMiniprogram.GeneralCallbackResult>((success, fail) => {
      const pages = getCurrentPages();
      const page = pages[_delta > pages.length ? 0 : pages.length - _delta - 1];

      this[CURRENT_ROUTE_KEY].path = page.route as Extract<keyof Routes, string>;
      this[CURRENT_ROUTE_KEY].parmas = params ?? {};

      wx.navigateBack({
        ...options,
        delta,
        success,
        fail,
      });
    });
  }
}

export function createRouter<Routes extends RouterRoutes = Record<string, object>>() {
  return new Router<Routes>();
}

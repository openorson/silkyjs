import { stringify } from "../common/stringify.js";

export type RouterPushOptions = Omit<WechatMiniprogram.NavigateToOption, "url" | "success" | "fail" | "complete">;
export type RouterReplaceOptions = Omit<WechatMiniprogram.RedirectToOption, "url" | "success" | "fail" | "complete">;
export type RouterSwitchOptions = Omit<WechatMiniprogram.SwitchTabOption, "url" | "success" | "fail" | "complete">;
export type RouterLaunchOptions = Omit<WechatMiniprogram.ReLaunchOption, "url" | "success" | "fail" | "complete">;
export type RouterBackOptions = Omit<WechatMiniprogram.NavigateBackOption, "delta" | "success" | "fail" | "complete">;

export class Router {
  private static instance: Router;

  static getInstance() {
    if (this.instance) return this.instance;
    this.instance = new this();
    return this.instance;
  }

  private constructor() {}

  push(url: string, query?: object, options?: RouterPushOptions) {
    return new Promise<void>((resolve, reject) => {
      wx.navigateTo({
        ...options,
        url: `${url}?${stringify(query)}`,
        success: () => {
          resolve();
        },
        fail: (reason) => reject(reason),
      });
    });
  }

  replace(url: string, query?: object, options?: RouterReplaceOptions) {
    return new Promise<void>((resolve, reject) => {
      wx.redirectTo({
        ...options,
        url: `${url}?${stringify(query)}`,
        success: () => {
          resolve();
        },
        fail: (reason) => reject(reason),
      });
    });
  }

  switch(url: string, options?: RouterSwitchOptions) {
    return new Promise<void>((resolve, reject) => {
      wx.switchTab({
        ...options,
        url: url as string,
        success: () => {
          resolve();
        },
        fail: (reason) => reject(reason),
      });
    });
  }

  launch(url: string, query?: object, options?: RouterLaunchOptions) {
    return new Promise<void>((resolve, reject) => {
      wx.reLaunch({
        ...options,
        url: `${url}?${stringify(query)}`,
        success: () => {
          resolve();
        },
        fail: (reason) => reject(reason),
      });
    });
  }

  back(delta?: number, options?: RouterBackOptions) {
    return new Promise<void>((resolve, reject) => {
      wx.navigateBack({
        ...options,
        delta,
        success: () => resolve(),
        fail: (reason) => reject(reason),
      });
    });
  }
}

import { eventChannel } from "../event/built-in/index.js";

export type PageState = {};
export type PageActions = {};
export type PageHooks = {
  onLoad?: (query: Record<string, string | undefined>) => void | Promise<void>;
  onShow?: () => void | Promise<void>;
  onReady?: () => void | Promise<void>;
  onHide?: () => void | Promise<void>;
  onUnload?: () => void | Promise<void>;
  onPullDownRefresh?: () => void | Promise<void>;
  onReachBottom?: () => void | Promise<void>;
  onShareAppMessage?: (options: WechatMiniprogram.Page.IShareAppMessageOption) => WechatMiniprogram.Page.ICustomShareContent | void;
  onShareTimeline?: () => WechatMiniprogram.Page.ICustomTimelineContent | void;
  onPageScroll?: (options: WechatMiniprogram.Page.IPageScrollOption) => void | Promise<void>;
  onTabItemTap?: (options: WechatMiniprogram.Page.ITabItemTapOption) => void | Promise<void>;
  onResize?: (options: WechatMiniprogram.Page.IResizeOption) => void | Promise<void>;
  onAddToFavorites?: (options: WechatMiniprogram.Page.IAddToFavoritesOption) => WechatMiniprogram.Page.IAddToFavoritesContent;
};
export type PageEffects = Record<
  string,
  {
    effect(args: { mode: "add" | "set"; target: object; prop: string; path: string[]; value: unknown; oldValue?: unknown }): void;
    dependencies: string[];
  }
>;

export interface Page<
  State extends PageState = {},
  Actions extends PageActions = {},
  Effects extends PageEffects = {},
  Hooks extends PageHooks = {}
> {
  self: WechatMiniprogram.Page.Instance<State, {}>;
  options: Record<string, any>;
  state: State;
  actions: Actions;
  effects: Effects;
  hooks: Hooks;
  bootstrap: () => void;
}

export function createPage(): Page {
  let self: any = null;

  const options: WechatMiniprogram.Page.Options<{}, {}> & Record<string, unknown> = {
    data: {},
  };

  const page: Page = {
    self,
    options,
    state: {},
    actions: {},
    effects: {},
    hooks: {},
    bootstrap() {
      const onLoad = options.onLoad;
      options.onLoad = async function (...args) {
        self = this;
        eventChannel.emit("page-load", { path: self.route, params: args[0] ?? {} });
        await onLoad?.call?.(this, ...args);
      };

      const onShow = options.onShow;
      options.onShow = async function (...args) {
        eventChannel.emit("page-show");
        await onShow?.call?.(this, ...args);
      };

      const onHide = options.onHide;
      options.onHide = async function (...args) {
        eventChannel.emit("page-hide");
        await onHide?.call?.(this, ...args);
      };

      const onUnload = options.onUnload;
      options.onUnload = async function (...args) {
        eventChannel.emit("page-unload");
        await onUnload?.call?.(this, ...args);
      };

      return Page(options);
    },
  };

  return page;
}

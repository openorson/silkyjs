import { eventChannel } from "../event/built-in/index.js";
import { Router } from "../router/index.js";

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
  router: Router;
  route: Route;
  state: State;
  actions: Actions;
  effects: Effects;
  hooks: Hooks;
  bootstrap: () => void;
}

export interface Route {
  path: string;
  query: object;
  coldQuery: object;
  hotQuery: object;
}

export function createPage(): Page {
  let self: any = null;

  const options: WechatMiniprogram.Page.Options<{}, {}> & Record<string, unknown> = {
    data: {},
  };

  const router = Router.getInstance();

  const route: Route = {
    path: "",
    query: {},
    coldQuery: {},
    hotQuery: {},
  };

  const page: Page = {
    self,
    options,
    route,
    router,
    state: {},
    actions: {},
    effects: {},
    hooks: {},
    bootstrap() {
      options.onLoad = async function (...args) {
        self = this;
        page.route.path = self.route;
        page.route.query = args[0] ?? {};
        await options.onLoad?.call?.(this, ...args);
        eventChannel.emit("page-load", { path: self.route, query: args[0] });
      };

      options.onShow = async function (...args) {
        await options.onShow?.call?.(this, ...args);
        eventChannel.emit("page-show");
      };

      options.onHide = async function (...args) {
        await options.onHide?.call?.(this, ...args);
        eventChannel.emit("page-hide");
      };

      options.onUnload = async function (...args) {
        await options.onUnload?.call?.(this, ...args);
        eventChannel.emit("page-unload");
      };

      return Page(options);
    },
  };

  return page;
}

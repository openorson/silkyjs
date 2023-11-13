import { Router } from "../router/index.js";

export type PageStore = Record<string, object>;
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
  Store extends PageStore = {},
  State extends PageState = {},
  Actions extends PageActions = {},
  Effects extends PageEffects = {},
  Hooks extends PageHooks = {}
> {
  self: WechatMiniprogram.Page.Instance<State, {}>;
  options: Record<string, any>;
  router: Router;
  route: Route;
  store: Store;
  state: State;
  actions: Actions;
  effects: Effects;
  hooks: Hooks;
  bootstrap: () => void;
}

export interface Route {
  path: string;
  query: object;
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
  };

  const page: Page = {
    self,
    options,
    route,
    router,
    store: {},
    state: {},
    actions: {},
    effects: {},
    hooks: {},
    bootstrap() {
      return Page(options);
    },
  };

  return page;
}

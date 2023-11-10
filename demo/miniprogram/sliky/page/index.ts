import { Router } from "../router/index.js";

export type PageState = {};
export type PageGetters<State extends PageState = {}> = Record<string, (state: State) => unknown>;
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
export type PageTrackers = {};
export type PageTriggers = {};

export interface Page<
  State extends PageState = {},
  Getters extends PageGetters<State> = {},
  Actions extends PageActions = {},
  Trackers extends PageTrackers = {},
  Triggers extends PageTriggers = {},
  Hooks extends PageHooks = {}
> {
  self: WechatMiniprogram.Page.Instance<State, {}>;
  options: Record<string, any>;
  router: Router;
  route: Route;
  state: State;
  getters: { [Name in keyof Getters]: ReturnType<Getters[Name]> };
  actions: Actions;
  trackers: Trackers;
  triggers: Triggers;
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
    state: {},
    getters: {},
    actions: {},
    hooks: {},
    trackers: {},
    triggers: {},
    bootstrap() {
      return Page(options);
    },
  };

  return page;
}

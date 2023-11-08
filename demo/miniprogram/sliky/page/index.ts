import { createReactive } from "../common/reactive.js";
import { Router } from "../router/index.js";

export interface Page<State extends {} = {}> {
  get self(): WechatMiniprogram.Page.Instance<State, {}>;
  get options(): Record<string, any>;
  router: Router;
  route: Route;
  state: State;
  trackers: (trackers: Record<string, () => void>) => this;
  triggers: (triggers: Record<string, () => void>) => this;
  actions: (actions: Record<string, () => void>) => this;
  onLoad: (callback: (query: Record<string, string | undefined>) => void | Promise<void>) => this;
  onShow: (callback: () => void | Promise<void>) => this;
  onReady: (callback: () => void | Promise<void>) => this;
  onHide: (callback: () => void | Promise<void>) => this;
  onUnload: (callback: () => void | Promise<void>) => this;
  onPullDownRefresh: (callback: () => void | Promise<void>) => this;
  onReachBottom: (callback: () => void | Promise<void>) => this;
  onShareAppMessage: (
    callback: (options: WechatMiniprogram.Page.IShareAppMessageOption) => WechatMiniprogram.Page.ICustomShareContent | void
  ) => this;
  onShareTimeline: (callback: () => WechatMiniprogram.Page.ICustomTimelineContent | void) => this;
  onPageScroll: (callback: (options: WechatMiniprogram.Page.IPageScrollOption) => void | Promise<void>) => this;
  onTabItemTap: (callback: (options: WechatMiniprogram.Page.ITabItemTapOption) => void | Promise<void>) => this;
  onResize: (callback: (options: WechatMiniprogram.Page.IResizeOption) => void | Promise<void>) => this;
  onAddToFavorites: (callback: (options: WechatMiniprogram.Page.IAddToFavoritesOption) => WechatMiniprogram.Page.IAddToFavoritesContent) => this;
  bootstrap: () => void;
}

export interface Route {
  path: string;
  query: object;
}

export function createPage<State extends {}>(initialState?: State): Page<State> {
  const initialData = (initialState ?? {}) as State;

  let _self: any = null;

  const _options: WechatMiniprogram.Page.Options<{}, {}> & Record<string, unknown> = {
    data: initialData,
  };

  const reactive = createReactive({
    trigger(args) {
      _self.setData({ [args.path.join(".")]: args.value });
    },
  });

  const state = reactive(initialData);

  const router = Router.getInstance();

  const route: Route = {
    path: "",
    query: {},
  };

  const page: Page<State> = {
    get self() {
      return _self;
    },
    get options() {
      return _options;
    },
    get route() {
      return route;
    },
    router,
    state,
    trackers() {
      // TODO
      return this;
    },
    triggers() {
      // TODO
      return this;
    },
    actions(actions) {
      Object.entries(actions).forEach(([name, action]) => (_options[name] = action));
      return this;
    },
    onLoad(callback) {
      _options["onLoad"] = function (...args) {
        _self = this;
        route.path = _self.route;
        route.query = args[0] ?? {};
        callback.call(null, ...args);
      };
      return this;
    },
    onShow(callback) {
      _options["onShow"] = callback.bind(null);
      return this;
    },
    onReady(callback) {
      _options["onReady"] = callback.bind(null);
      return this;
    },
    onHide(callback) {
      _options["onHide"] = callback.bind(null);
      return this;
    },
    onUnload(callback) {
      _options["onUnload"] = callback.bind(null);
      return this;
    },
    onPullDownRefresh(callback) {
      _options["onPullDownRefresh"] = callback.bind(null);
      return this;
    },
    onReachBottom(callback) {
      _options["onReachBottom"] = callback.bind(null);
      return this;
    },
    onShareAppMessage(callback) {
      _options["onShareAppMessage"] = callback.bind(null);
      return this;
    },
    onShareTimeline(callback) {
      _options["onShareTimeline"] = callback.bind(null);
      return this;
    },
    onPageScroll(callback) {
      _options["onPageScroll"] = callback.bind(null);
      return this;
    },
    onTabItemTap(callback) {
      _options["onTabItemTap"] = callback.bind(null);
      return this;
    },
    onResize(callback) {
      _options["onResize"] = callback.bind(null);
      return this;
    },
    onAddToFavorites(callback) {
      _options["onAddToFavorites"] = callback.bind(null);
      return this;
    },
    bootstrap() {
      return Page(_options);
    },
  };

  return page;
}

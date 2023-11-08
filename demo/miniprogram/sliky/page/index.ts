import { createReactive } from "../common/reactive.js";

export interface Page<State extends {} = {}, Actions extends Record<string, (...args: any[]) => any> = {}> {
  get self(): WechatMiniprogram.Page.Instance<State, {}>;
  get options(): Record<string, any>;
  state: State;
  actions: (actions: Actions) => this;
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

export function createPage<State extends {}, Actions extends Record<string, (...args: any[]) => any>>(initialState?: State): Page<State, Actions> {
  const initialData = (initialState ?? {}) as State;

  let _self: any = null;

  const _options: WechatMiniprogram.Page.Options<{}, {}> & Record<string, unknown> = {
    data: initialData,
  };

  const reactive = createReactive({
    tracker(target, prop) {
      console.group("state track");
      console.log("target:", target);
      console.log("prop:", prop);
      console.groupEnd();
    },
    trigger(mode, target, prop, value, oldValue) {
      _self.setData({ [prop]: value });

      console.group("state trigger");
      console.log("mode:", mode);
      console.log("target:", target);
      console.log("prop:", prop);
      console.log("value:", value);
      console.log("oldValue:", oldValue);
      console.groupEnd();
    },
  });

  const state = reactive(initialData);

  const page: Page<State> = {
    get self() {
      return _self;
    },
    get options() {
      return _options;
    },
    state,
    actions(actions) {
      Object.entries(actions).forEach(([name, action]) => (_options[name] = action));
      return this;
    },
    onLoad(callback) {
      _options["onLoad"] = function (...args) {
        _self = this;
        callback(...args);
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

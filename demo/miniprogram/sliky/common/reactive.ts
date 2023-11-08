const toProxy = new WeakMap();

function isObject(value: unknown) {
  return value !== null && typeof value === "object";
}

function hasChanged(value: unknown, oldValue: unknown) {
  return value !== oldValue && (value === value || oldValue === oldValue);
}

function hasOwn(value: unknown, prop: string) {
  return Object.hasOwnProperty.call(value, prop);
}

function createHandler(handler?: {
  tracker?: (target: object, prop: string) => void;
  trigger?: (mode: "add" | "set", target: object, prop: string, value: unknown, oldValue?: unknown) => void;
}) {
  return {
    get(target: object, prop: string, receiver: object) {
      const result = Reflect.get(target, prop, receiver);
      handler?.tracker?.(target, prop);
      if (isObject(result)) return createReactive(handler)(result);
      return result;
    },
    set(target: object, prop: string, value: unknown, receiver: object) {
      const oldValue = target[prop as keyof typeof target];
      const hadProp = hasOwn(target, prop);
      const result = Reflect.set(target, prop, value, receiver);

      if (!hadProp) {
        handler?.trigger?.("add", target, prop, value);
      } else if (hasChanged(value, oldValue)) {
        handler?.trigger?.("set", target, prop, value, oldValue);
      }

      return result;
    },
  };
}

export function createReactive(handler?: {
  tracker?: (target: object, prop: string) => void;
  trigger?: (mode: "add" | "set", target: object, prop: string, value: unknown, oldValue?: unknown) => void;
}) {
  const _handler = createHandler(handler);

  return function reactive<T extends object>(initialData: T): T {
    let observed = toProxy.get(initialData);

    if (observed) return observed;

    observed = new Proxy(initialData, _handler);

    toProxy.set(initialData, observed);

    return observed;
  };
}

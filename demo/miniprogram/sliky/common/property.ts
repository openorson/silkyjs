export function getOwnFunctionProperty<O extends object, K extends keyof O = keyof O>(object: O) {
  let props: string[] = [];

  do {
    props = props.concat(
      Object.getOwnPropertyNames(object)
        .concat(Object.getOwnPropertySymbols(object).map((symbol) => symbol.toString()))
        .sort()
        .filter(
          (prop, idx, arr) =>
            typeof object[prop as K] === "function" && prop !== "constructor" && (idx == 0 || prop !== arr[idx - 1]) && props.indexOf(prop) === -1
        )
    );
  } while ((object = Object.getPrototypeOf(object)) && Object.getPrototypeOf(object));

  return props;
}

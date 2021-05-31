interface NavigationRouteProp<T> {
  route: {
    key: string;
    name: string;
    params: T;
  };
}

interface NavigationProp<T> extends NavigationRouteProp<T> {
  navigation: {
    pop: () => {};
    push: (name: string, props?: object) => {};
    replace: (name: string, props?: object) => {};
    setOptions: (arg0: Object) => {};
  };
}

// eslint-disable-next-line no-undef
export { NavigationRouteProp, NavigationProp };

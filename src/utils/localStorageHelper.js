export const saveObject = (key, obj) => {
  localStorage.setItem(key, JSON.stringify(obj));
};

export const getObject = (key) => {
  const stored = localStorage.getItem(key);
  if (stored) {
    return JSON.parse(stored);
  } else {
    return undefined;
  }
};

// for every object we want to save, make sure we add it here with a corresponding key for the entry
export const storedObjects = new Proxy(
  {
    journals: getObject("journals") ?? [],
  },
  {
    set(target, p, newValue, receiver) {
      saveObject(p, newValue);
      Reflect.set(...arguments);
      return true;
    },
  },
);

console.log(storedObjects.journals);

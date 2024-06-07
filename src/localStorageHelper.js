/**
 * Adds two numbers together.
 *
 * @param {number} a - The first number to be added.
 * @param {number} b - The second number to be added.
 * @return {number} The sum of the two numbers.
 */
export const add = (a, b) => {
  return a + b;
};

/**
 * Saves an object to local storage.
 *
 * @param {string} key - The key to store the object under.
 * @param {Object} obj - The object to be stored.
 * @return {void}
 */
export const saveObject = (key, obj) => {
  localStorage.setItem(key, JSON.stringify(obj));
};

/**
 * Retrieves an object from local storage based on the provided key.
 *
 * @param {string} key - The key used to retrieve the object from local storage.
 * @return {Object|undefined} The retrieved object, or undefined if the key does not exist in local storage.
 */
export const getObject = (key) => {
  const stored = localStorage.getItem(key);
  if (stored) {
    return JSON.parse(stored);
  } else {
    return undefined;
  }
};
/**
 * @typedef {Object} journal
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} date
 */

// for every object we want to save, make sure we add it here with a corresponding key for the entry
// make sure to actually set the object, rather than mutating it because proxy cannot detect object mutations
export const storedObjects = new Proxy(
  {
    /**
     * @type {journal[]}
     */
    journals: getObject("journals") ?? [],
    tasks: getObject("tasks") ?? [],
    moods: getObject("moods") ?? [],
  },
  {
    /**
     * Sets a value in the target object and saves it to local storage.
     *
     * @param {Object} target - The target object.
     * @param {string|symbol} p - The property key.
     * @param {*} newValue - The new value to set.
     * @param {Object} receiver - The receiver object.
     * @return {boolean} Returns true if the value was successfully set.
     */
    set(target, p, newValue, receiver) {
      saveObject(p, newValue);
      Reflect.set(...arguments);
      return true;
    },
  },
);

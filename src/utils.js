/**
 * Generates a unique id
 * @return {string} A unique id.
 */
export function generateUniqueId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

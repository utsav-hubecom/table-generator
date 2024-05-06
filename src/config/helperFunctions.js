export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export function safeAccess(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

export const throttle = (callback, cooldown, setter = () => {}) => {
  let fire = true;
  return (...args) => {
    if (!fire) {
      return;
    }
    fire = false;
    setter(true);
    setTimeout(() => {
      fire = true;
      setter(false);
      callback.apply(this, args);
    }, cooldown);
  };
};

export const isNull = value => typeof value === 'object' && !value;

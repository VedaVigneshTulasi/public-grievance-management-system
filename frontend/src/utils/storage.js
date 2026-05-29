export const getStorageItem = key => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    return null;
  }
};

export const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeStorageItem = key => {
  localStorage.removeItem(key);
};

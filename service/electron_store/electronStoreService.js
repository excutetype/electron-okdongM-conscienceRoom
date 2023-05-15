const ElectronStore = require("electron-store");
const store = new ElectronStore();
const ElectronStoreError = require("../../error/custom_error/ElectronStoreError");

const electronStoreService = {
  set: (key, value) => {
    try {
      store.set(key, JSON.stringify(value));
    } catch {
      throw new ElectronStoreError.setStoreError();
    }
  },
  get: (key, nonexistentKeyValue) => {
    try {
      const value = store.get(key);
      if (!value) {
        return nonexistentKeyValue;
      }
      return JSON.parse(value);
    } catch {
      throw new ElectronStoreError.setStoreError();
    }
  },
};

module.exports = electronStoreService;

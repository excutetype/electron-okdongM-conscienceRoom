const ElectronStore = require("electron-store");
const store = new ElectronStore();
const ElectronStoreError = require("../../error/custom_error/ElectronStoreError");

const electronStoreService = {
  set: {
    databaseSetting: (settingValue) => {
      try {
        store.set("database-setting", JSON.stringify(settingValue));
      } catch {
        throw new ElectronStoreError.setStoreError();
      }
    },
  },
  get: {
    databaseSetting: () => {
      try {
        const stringifiedSetting = store.get("database-setting");

        if (!stringifiedSetting) {
          return {};
        }

        return JSON.parse(stringifiedSetting);
      } catch {
        throw new ElectronStoreError.getStoreError();
      }
    },
    password: () => {
      try {
        const stringifiedPassword = store.get("password");

        if (!stringifiedPassword) {
          return "";
        }

        return JSON.parse(stringifiedPassword);
      } catch {
        throw new ElectronStoreError.getStoreError();
      }
    },
  },
};

module.exports = electronStoreService;

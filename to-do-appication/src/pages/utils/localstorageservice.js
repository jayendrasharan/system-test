class LocalStorageService {
    storeDataItem(key, value) {
        console.log(value);
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
        catch (e) {
        }
    }
    retrieveDataItem(key) {
        try {
            return JSON.parse(window.localStorage.getItem(key));
        }
        catch (e) {
        }
    }
    removeItem(key) {
        try {
            window.localStorage.removeItem(key);
        }
        catch (e) {
        }
    }
    clearStorage() {
        try {
            window.localStorage.clear();
        }
        catch (e) {
        }
    }
}
export default LocalStorageService;
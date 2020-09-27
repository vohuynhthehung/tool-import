export class LocalStorage {
    /**
     * 
     * @param {string} key
     * @param {object} item 
     */
    static setObjectItem(key, item) { localStorage.setItem(key, JSON.stringify(item)) }

    /**
     * 
     * @param {string} key 
     */
    static getObjectItem(key) { return JSON.parse(localStorage.getItem(key)) }
}
import randomNum from './random';

/** Utility functions of miscellaneous use, anything that was needed twice or more */
export default {

    /**
     * Returns a non-secure hash used as an id to uniquely identify a component
     * Note this function is not for secure hashing, nor is it really "hashing"
     * @param {Set} hashBin
     * @returns {String} hash string
     */
    getHash(hashBin) {
        let hashString = '';
        do {
            hashString += randomNum(0,9).toString();
        } while (hashBin.has(hashString));
        hashBin.add(hashString);
        return hashString;
    },

    /**
     * Populates the hashbin with the current ids
     * Expected use case, get the id's of objects pulled from database
     * @param {Set} hashBin 
     * @param {Array} objects with an .id property
     * @returns {Set} Set with id hashes
     */
    hashBinPopulator(objects) {
        const hashBin = new Set();
        objects.forEach(object => hashBin.add(object.id));
        return hashBin;
    },

    /**
     * Checks whether an object pulled out of sessionStorage or localStorage exists
     * @param {Object} object 
     * @returns {Boolean} true if it's invalid
     */
    isNotValidSessionObject(object) {
        return !object || object.length < 0 || !object.length[0]
    },

    /**
     * A call back for a sort method, to sort items by date
     * @param {Object} A Object with a date property
     * @param {Object} B Object with a date property
     */
    By: {
        DateDesc(A, B) {
            B.date.valueOf() - A.date.valueOf()
        },
        DateAsc(A, B) {
            A.date.valueOf() - B.date.valueOf()
        }
    }
}
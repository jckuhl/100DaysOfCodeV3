import randomNum from './random';

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
    }

}
import randomNum from './random';

export default function getHash(hashBin) {
    let hashString = '';
    do {
        hashString += randomNum(0,9).toString();
    } while (hashBin.has(hashString));
    hashBin.add(hashString);
    return hashString;
}
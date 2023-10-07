import { encoded, translations } from './data.js'
const UNDECODED_IDS = ['groupId'];

// Поиск уникальных айди

function getUniqueIdsFromEncodedStructure(encodedStructure) {
    return Array.from(new Set(encodedStructure
        .flatMap(object => Object.values(object))))
        .filter(item => item)
}
const listOfUniqueIds = getUniqueIdsFromEncodedStructure(encoded);

// Расшифровка
function getDecodedStructure(encodedStructure) {
    return encodedStructure.map(object => Object.fromEntries(Object.entries(object)
        .map(([key, value]) => UNDECODED_IDS.includes(key) || !key.includes('Id') || value == '0'
            ? ([key, value])
            : ([key, translations[value] ?? value]),
        )))
}

const decodedStructure = getDecodedStructure(encoded);
console.log(decodedStructure);
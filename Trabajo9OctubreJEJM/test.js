const SmartSearchEngine = require('./TrieSearchEngine');

const searchEngine = new SmartSearchEngine();

searchEngine.insert("air max", 90);
searchEngine.insert("air force", 95);
searchEngine.insert("air jordan", 85);
searchEngine.insert("adidas boost", 80);

const results = searchEngine.searchTopK("air", 2);

console.log("Resultados obtenidos para searchTopK('air', 2):");
console.log(JSON.stringify(results, null, 2));
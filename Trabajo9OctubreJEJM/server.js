const express = require('express');
const cors = require('cors');
const SmartSearchEngine = require('./TrieSearchEngine');

const app = express();
app.use(cors());
app.use(express.json());

const searchEngine = new SmartSearchEngine();
searchEngine.insert("air max", 90);
searchEngine.insert("air force", 95);
searchEngine.insert("air jordan", 85);
searchEngine.insert("adidas boost", 80);
searchEngine.insert("nike pegasus", 88);
searchEngine.insert("adidas superstar", 75);

app.get('/api/search', (req, res) => {
    const { prefix = '', k = 3 } = req.query;
    const results = searchEngine.searchTopK(prefix.toLowerCase(), parseInt(k, 10));
    res.json(results);
});

app.post('/api/products', (req, res) => {
    const { name, popularity } = req.body;
    if (!name || popularity === undefined) {
        return res.status(400).json({ error: 'Nombre y popularidad requeridos' });
    }
    searchEngine.insert(name.toLowerCase(), Number(popularity));
    res.json({ success: true, message: 'Producto agregado correctamente al Trie' });
});

app.use(express.static('HTML'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
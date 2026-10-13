class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.productData = null; 
    }
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    push(val, comparator) {
        this.heap.push(val);
        this.up(this.heap.length - 1, comparator);
    }

    pop(comparator) {
        if (this.size() === 0) return null;
        const top = this.heap[0];
        const bottom = this.heap.pop();
        if (this.size() > 0) {
            this.heap[0] = bottom;
            this.down(0, comparator);
        }
        return top;
    }

    up(index, comparator) {
        let parent = Math.floor((index - 1) / 2);
        while (index > 0 && comparator(this.heap[index], this.heap[parent]) < 0) {
            [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }
    }

    down(index, comparator) {
        let lastIndex = this.size() - 1;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;

            if (left <= lastIndex && comparator(this.heap[left], this.heap[smallest]) < 0) {
                smallest = left;
            }
            if (right <= lastIndex && comparator(this.heap[right], this.heap[smallest]) < 0) {
                smallest = right;
            }
            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

class SmartSearchEngine {
    constructor() {
        this.root = new TrieNode();
    }

    insert(name, popularity) {
        let node = this.root;
        for (let char of name) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
        node.productData = { name, popularity };
    }

    _collectAllProducts(node, results = []) {
        if (!node) return results;
        if (node.isEndOfWord && node.productData) {
            results.push(node.productData);
        }
        for (let char in node.children) {
            this._collectAllProducts(node.children[char], results);
        }
        return results;
    }

    searchTopK(prefix, k) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                return []; 
            }
            node = node.children[char];
        }

        const matchingProducts = this._collectAllProducts(node, []);

        const minHeap = new MinHeap();
        const comparator = (a, b) => a.popularity - b.popularity;

        for (let product of matchingProducts) {
            minHeap.push(product, comparator);
            if (minHeap.size() > k) {
                minHeap.pop(comparator);
            }
        }

        const topResults = [];
        while (minHeap.size() > 0) {
            topResults.unshift(minHeap.pop(comparator));
        }

        return topResults;
    }
}

module.exports = SmartSearchEngine;
class BookNode {
  constructor(book) {
    this.value = book;
    this.next = null;
  }
}

export class BookStack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(book) {
    const newNode = new BookNode(book);
    if (!this.top) {
      this.top = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }
    this.size++;
  }

  pop() {
    if (!this.top) return null;
    const poppedNode = this.top;
    this.top = this.top.next;
    this.size--;
    return poppedNode.value;
  }

  peek() {
    return this.top ? this.top.value : null;
  }

  toArray() {
    const books = [];
    let current = this.top;
    while (current) {
      books.push(current.value);
      current = current.next;
    }
    return books;
  }
}
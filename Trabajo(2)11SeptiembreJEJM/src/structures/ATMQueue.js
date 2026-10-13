class PersonNode {
  constructor(person) {
    this.value = person;
    this.next = null;
  }
}

export class ATMQueue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  enqueue(person) {
    const newNode = new PersonNode(person);
    if (!this.front) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }

  dequeue() {
    if (!this.front) return null;
    const dequeuedNode = this.front;
    this.front = this.front.next;
    if (!this.front) {
      this.rear = null;
    }
    this.size--;
    return dequeuedNode.value;
  }

  peek() {
    return this.front ? this.front.value : null;
  }

  toArray() {
    const people = [];
    let current = this.front;
    while (current) {
      people.push(current.value);
      current = current.next;
    }
    return people.sort((a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate));
  }
}
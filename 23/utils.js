class ListNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class CircularList {
  constructor() {
    this.head = null;
    // this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.head.left = newNode;
      this.head.right = newNode;
    } else if (this.length === 1) {
      this.head.right = newNode;
      this.head.left = newNode;
      newNode.left = this.head;
      newNode.right = this.head;
    } else {
      this.head.left.right = newNode;
      newNode.left = this.head.left;
      newNode.right = this.head;
      this.head.left = newNode;
    }
    this.length += 1;
    return newNode;
  }

  removeRight(node) {
    const nodeToRemove = node.right;
    if (nodeToRemove === this.head) {
      this.head = nodeToRemove.right;
    }
    node.right = nodeToRemove.right;
    nodeToRemove.right.left = node;

    nodeToRemove.left = null;
    nodeToRemove.right = null;
    this.length -= 1;
    return nodeToRemove.value;
  }

  appendRight(node, value) {
    const newNode = new ListNode(value, node, node.right);
    newNode.left = node;
    newNode.right = node.right;
    node.right = newNode;
    newNode.right.left = newNode;
    this.length += 1;
    return newNode;
  }

  getListValues() {
    if (this.length === 0) {
      return [];
    }

    const values = [];
    let current = this.head;

    do {
      values.push(current.value);
      current = current.right;
    } while (current !== this.head);
    return values;
  }

  findNode(value) {
    if (this.length === 0) {
      return null;
    }

    let current = this.head;
    do {
      if (current.value === value) {
        return current;
      }
      current = current.right;
    } while (current !== this.head);
    return null;
  }
}

module.exports = { CircularList };

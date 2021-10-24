export class BinarySearchTreeNode {
  constructor(value, parent = null) {
    this._left = null;
    this._right = null;
    this._value = value;
    this._parent = parent;
  }

  get left() {
    return this._left;
  }

  set left(value) {
    this._left = value;
  }

  get right() {
    return this._right;
  }

  set right(value) {
    this._right = value;
  }

  get value() {
    return this._value;
  }

  get parent() {
    return this._parent;
  }

  set parent(value) {
    this._parent = value;
  }

  get isLeaf() {
    return !this._left && !this._right;
  }

  get isRoot() {
    return !this._parent;
  }

  get description() {
    const description = { value: this._value };
    if (this._parent)
      Object.assign(description, { parentValue: this._parent.value });
    if (this._left)
      Object.assign(description, { left: this._left.description });
    if (this._right)
      Object.assign(description, { right: this._right.description });
    return description;
  }

  add(value) {
    if (value === this._value) return;
    if (value < this._value) {
      if (this._left) {
        this._left.add(value);
      } else {
        this._left = new BinarySearchTreeNode(value, this);
      }
    } else {
      if (this._right) {
        this._right.add(value);
      } else {
        this._right = new BinarySearchTreeNode(value, this);
      }
    }
  }

  traverseInOrder(list) {
    this._left && this._left.traverseInOrder(list);
    list.push(this._value);
    this._right && this._right.traverseInOrder(list);
  }

  traversePostOrder(list) {
    this._right && this._right.traversePostOrder(list);
    list.push(this._value);
    this._left && this._left.traversePostOrder(list);
  }

  findNode(value) {
    if (this._value === value) return this;
    if (value < this._value && this._left) return this._left.findNode(value);
    if (this._right) return this._right.findNode(value);
  }

  findMaxNode() {
    if (!this._right) return this;
    return this._right.findMaxNode();
  }

  findLowestLeafNode() {
    if (!this._left) return this;
    return this._left.findLowestLeafNode();
  }

  attach(node) {
    if (node.value < this._value && !this._left) this._left = node;
    else if (!this._right) this._right = node;
    node.parent = this;
  }

  detach() {
    if (!this._parent) return;
    if (this._parent.left === this) this._parent.left = null;
    else this._parent.right = null;
    this._parent = null;
  }
}

import { BinarySearchTreeNode } from "./binary-search-tree-node";

export class BinarySearchTree {
  constructor(...values) {
    this._root = null;
    if (values && values.length > 0) {
      this.add(...values);
    }
  }

  get root() {
    return this._root;
  }

  add(...values) {
    values.forEach((value) => {
      if (!this._root) this._root = new BinarySearchTreeNode(value);
      else this._root.add(value);
    });
  }

  asOrderedList(order = "asc") {
    if (!this._root) return [];
    const list = [];
    if (order === "desc") this._root.traversePostOrder(list);
    else this._root.traverseInOrder(list);
    return list;
  }

  findNode(value) {
    if (!this._root) return;
    return this._root.findNode(value);
  }

  findMinNode() {
    if (!this._root) return;
    return this._root.findMinNode();
  }

  findMaxNode() {
    if (!this._root) return;
    return this._root.findMaxNode();
  }

  isEmpty() {
    return !this._root;
  }

  deleteNode(value) {
    // If the tree is empty
    if (this.isEmpty()) return;

    const nodeToDelete = this.findNode(value);
    if (!nodeToDelete) return; // did not find a node to delete, do nothing

    const { left, right, parent } = nodeToDelete;
    let replacementNode = null;

    if (left) {
      if (right) {
        right.detach();
        left.findMaxNode().attach(right);
      }
      replacementNode = left;
    } else if (right) {
      replacementNode = right;
    }

    nodeToDelete.detach();

    if (replacementNode) {
      replacementNode.detach();

      if (parent) parent.attach(replacementNode);
      else this._root = replacementNode;
    } else if (!parent) this._root = null;
  }
}

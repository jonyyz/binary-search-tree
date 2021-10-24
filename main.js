import { BinarySearchTree } from "./binary-search-tree";

const tree = new BinarySearchTree(8, 4, 1, 17, 22, 145, 57, 22, 7, 9);

const valuesToDelete = [8, 22, 7, 9, 17, -1, 57, 145, 1, 4, -5];
valuesToDelete.forEach((value, i) => {
  if (i) console.log();
  const header = `Delete Value: ${value}`;
  console.log(header);
  console.log("-".repeat(header.length));
  console.log(tree.asOrderedList());
  tree.deleteNode(value);
  console.log(tree.asOrderedList());
  console.log("-".repeat(header.length));
});

const treeNodes = [{
    nodeId: 1,
    parentId: null,
    label: "ROOT",
  },
  {
    nodeId: 2,
    parentId: 1,
    label: "A",
  },
  {
    nodeId: 3,
    parentId: 1,
    label: "B",
  },
  {
    nodeId: 4,
    parentId: 2,
    label: "C",
  },
  {
    nodeId: 5,
    parentId: 2,
    label: "D",
  },
  {
    nodeId: 6,
    parentId: 3,
    label: "E",
  },
  {
    nodeId: 7,
    parentId: 3,
    label: "F",
  },
  {
    nodeId: 8,
    parentId: 6,
    label: "G",
  },
  {
    nodeId: 9,
    parentId: 6,
    label: "H",
  },
];

const rootUl = document.getElementById("root-ul");
let rootNode;

const getRootNode = () => {
  return treeNodes.filter((node) => node.parentId === null)[0];
};

rootNode = getRootNode();
const isNodeParent = (node) => {
  let nodeIsParent = false;
  let foundNode = treeNodes.filter((x) => x.parentId === node.nodeId)[0];
  if (foundNode) {
    nodeIsParent = true;
  }
  return nodeIsParent;
};
const drawRoot = () => {
  const rootLi = document.createElement("li");
  const innerUl = document.createElement("ul");

  let {
    label
  } = rootNode;

  rootLi.innerHTML = `<a href='#'><span>${label}</span></a>`;
  let childUl = rootLi.appendChild(innerUl);
  rootUl.appendChild(rootLi);
  return childUl;
};

const drawNodesFrom = (node, ulElement) => {
  const childNodes = treeNodes.filter((x) => x.parentId === node.nodeId);
  if (childNodes.length > 0) {
    let leftChild = childNodes[0];
    let rightChild = childNodes[1];

    if (leftChild) {
      let innerUl = drawNode(leftChild, ulElement);
      drawNodesFrom(leftChild, innerUl);
      console.log("end");
    }

    if (rightChild) {
      let innerUl = drawNode(rightChild, ulElement);
      drawNodesFrom(rightChild, innerUl);
      console.log("end");
    }
  }
};



const drawNode = (node, ulElement) => {
  const newLi = document.createElement("li");
  const innerUl = document.createElement("ul");

  let {
    label
  } = node;

  let nodeHasChildren = isNodeParent(node);
  let childUl

  newLi.innerHTML = `<a href='#'><span>${label}</span></a>`;

  // Dont append UL if node has no children
  if (nodeHasChildren) {
    childUl = newLi.appendChild(innerUl);

  }
  ulElement.appendChild(newLi);

  return childUl;
};

const drawTree = () => {
  let rootUl = drawRoot();
  drawNodesFrom(rootNode, rootUl);
};
drawTree();
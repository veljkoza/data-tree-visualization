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
  // {
  //   nodeId: 4,
  //   parentId: 2,
  //   label: "C",
  // },
  // {
  //   nodeId: 5,
  //   parentId: 2,
  //   label: "D",
  // },
  // {
  //   nodeId: 6,
  //   parentId: 3,
  //   label: "E",
  // },
  // {
  //   nodeId: 7,
  //   parentId: 3,
  //   label: "F",
  // },
  // {
  //   nodeId: 8,
  //   parentId: 6,
  //   label: "G",
  // },
  // {
  //   nodeId: 9,
  //   parentId: 6,
  //   label: "H",
  // },
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
    label,
    nodeId
  } = rootNode;

  rootLi.innerHTML = `<button>
                        <div class='drop-off' data-nodeId=${nodeId}>
                          <p>-<p>
                        </div>
                        <span>${label}</span>
                      </button>`;

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



const createNodeElement = node => {
  let{nodeId,label} = node

  let innerDiv = document.createElement('div')
  let innerButton = document.createElement('button')
  let nodeDropOffDiv = document.createElement('div')
  let labelSpan = document.createElement('span')

  innerButton.setAttribute('draggable', true)
  innerButton.setAttribute('id', nodeId)
  labelSpan.innerText = label
  nodeDropOffDiv.innerHTML = `<p>-<p>`
  nodeDropOffDiv.classList.add('drop-off')
  nodeDropOffDiv.setAttribute('data-nodeId', nodeId)

  innerButton.appendChild(labelSpan)
  innerDiv.appendChild(innerButton)

  let nodeHasChildren = isNodeParent(node);

  // if (nodeHasChildren) {
    innerButton.appendChild(nodeDropOffDiv)
  // }

  return innerDiv

}

const drawNode = (node, ulElement) => {
  const newLi = document.createElement("li");
  const innerUl = document.createElement("ul");

  // let {
  //   label,
  //   nodeId
  // } = node;

  let nodeHasChildren = isNodeParent(node);

  // let innerDiv = document.createElement('div')
  // let innerButton = document.createElement('button')
  // let nodeDropOffDiv = document.createElement('div')
  // let labelSpan = document.createElement('span')

  // innerButton.setAttribute('draggable', true)
  // innerButton.setAttribute('id', nodeId)
  // labelSpan.innerText = label
  // nodeDropOffDiv.innerHTML = `<p>-<p>`
  // nodeDropOffDiv.classList.add('drop-off')
  // nodeDropOffDiv.setAttribute('data-nodeId', nodeId)

  // innerButton.appendChild(labelSpan)
  // innerDiv.appendChild(innerButton)
  let innerDiv = createNodeElement(node)
  newLi.innerHTML = innerDiv.outerHTML


  let childUl;
  // Append UL only if node has children
  // if (nodeHasChildren) {
    // innerButton.appendChild(nodeDropOffDiv)
    // newLi.innerHTML = innerDiv.outerHTML

    childUl = newLi.appendChild(innerUl);
  // }
  ulElement.appendChild(newLi);

  return childUl;
};

const drawTree = () => {
  let rootUl = drawRoot();
  drawNodesFrom(rootNode, rootUl);
};

drawTree();
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
    parentId: 2,
    label: "B",
  },
  {
    nodeId: 4,
    parentId: 3,
    label: "C",
  },
  {
    nodeId: 5,
    parentId: 4,
    label: "D",
  },
  {
    nodeId: 6,
    parentId: 5,
    label: "E",
  },
  {
    nodeId: 7,
    parentId: 6,
    label: "F",
  },
  {
    nodeId: 8,
    parentId: 7,
    label: "G",
  },
  {
    nodeId: 9,
    parentId: 8,
    label: "H",
  },
];

const findNodeById = (nodeId) => {
  let foundNode = treeNodes.find(x => {
    return x.nodeId === nodeId
  })
  return foundNode
}

const getNodeChildrenById = (nodeId) => {
  let nodeChildren = treeNodes.filter((x) => x.parentId === nodeId);

  return nodeChildren;
};

const rootUl = document.getElementById("root-ul");
let rootNode;

const getRootNode = () => {
  return treeNodes.filter((node) => node.parentId === null)[0];
};

rootNode = getRootNode();

const drawRoot = () => {
  const rootLi = document.createElement("li");
  const innerUl = document.createElement("ul");

  let {
    label,
    nodeId
  } = rootNode;

  rootLi.innerHTML = `<div class="node-container">
  
                          <button draggable='true' class="node" id='${nodeId}'>
  
                            <span>${label}</span>
                          </button>
                          <div class='drop-off' data-nodeId=${nodeId}>
                            -
                          </div>
                      </div>`;

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
    }

    if (rightChild) {
      let innerUl = drawNode(rightChild, ulElement);
      drawNodesFrom(rightChild, innerUl);
    }
  }
};



const createNodeElement = node => {
  let {
    nodeId,
    label
  } = node

  let innerDiv = document.createElement('div')
  let innerButton = document.createElement('button')
  let nodeDropOffDiv = document.createElement('div')
  let labelSpan = document.createElement('span')


  innerDiv.classList.add('node-container')
  innerButton.setAttribute('draggable', true)
  innerButton.setAttribute('id', nodeId)
  innerButton.classList.add('node')
  labelSpan.innerText = label
  nodeDropOffDiv.innerHTML = `-`
  nodeDropOffDiv.classList.add('drop-off')
  nodeDropOffDiv.setAttribute('data-nodeId', nodeId)

  innerButton.appendChild(labelSpan)
  innerDiv.appendChild(innerButton)

  innerDiv.appendChild(nodeDropOffDiv)

  return innerDiv

}

const drawNode = (node, ulElement) => {
  const newLi = document.createElement("li");
  const innerUl = document.createElement("ul");

  let innerDiv = createNodeElement(node)
  newLi.innerHTML = innerDiv.outerHTML


  let childUl;

  childUl = newLi.appendChild(innerUl);
  ulElement.appendChild(newLi);

  return childUl;
};


const undrawTree = () => {
  rootUl.innerHTML = ''
}

const drawTree = () => {
  let rootUl = drawRoot();
  drawNodesFrom(rootNode, rootUl);
};

const refreshTree = () => {
  undrawTree()
  drawTree()
  addDragAndDrop()
}



const addDragAndDrop = () => {
  let nodes = document.querySelectorAll('.node')
  let dropOffs = document.querySelectorAll('.drop-off')

  let nodeBeingDragged;
  let targetedDroppOff;

  const changeNodeParent = () => {
    let draggedNodeId = parseInt(nodeBeingDragged.getAttribute('id'));
    let dropOffParentId = parseInt(targetedDroppOff.getAttribute('data-nodeId'))
    let foundNode = findNodeById(draggedNodeId)
    let dropOffNode = findNodeById(dropOffParentId)

    let dropOffNodeChildren = getNodeChildrenById(dropOffParentId)
    let draggedNodeChildren = getNodeChildrenById(draggedNodeId)
    let leftNode = dropOffNodeChildren[0]

    // dont allow dragging nodes to the existing parent
    if (foundNode.parentId === dropOffParentId) return
    if (!leftNode && foundNode.parentId === null) {
      return
    }

    if ((foundNode.parentId === null && leftNode) || (draggedNodeId === dropOffParentId && leftNode) || (draggedNodeId === dropOffNode.parentId && !leftNode)) {
      let temp = JSON.parse(JSON.stringify(leftNode ? leftNode : dropOffNode))
      if (leftNode) {
        leftNode.label = foundNode.label
      } else {
        dropOffNode.label = foundNode.label
      }

      foundNode.label = temp.label
    } else if (dropOffNodeChildren.length === 1) {
      if (draggedNodeChildren[0]) {
        draggedNodeChildren[0].parentId = foundNode.parentId

      }
      foundNode.parentId = dropOffParentId
    } else if (dropOffNodeChildren.length) {

      let temp = JSON.parse(JSON.stringify(leftNode))


      leftNode.parentId = foundNode.parentId
      foundNode.parentId = temp.parentId

      draggedNodeChildren.forEach(childNode => {
        childNode.parentId = leftNode.nodeId
      })


    } else {
      foundNode.parentId = dropOffParentId

    }

    refreshTree()
  }

  // drag functions
  const dragStart = (e) => {
    nodeBeingDragged = e.target
  }

  const dragEnd = () => {
    nodeBeingDragged = null
  }

  // dropOffs functions
  const dragOver = (e) => {
    e.preventDefault()
    e.target.classList.add('hovered')
  }
  const dragEnter = () => {

  }
  const dragLeave = (e) => {
    e.target.classList.remove('hovered')

  }
  const dragDrop = (e) => {
    e.target.classList.remove('hovered')
    targetedDroppOff = e.target
    changeNodeParent()
  }

  // dropOffs listeners
  dropOffs.forEach(dropOff => {
    dropOff.addEventListener('dragover', dragOver)
    dropOff.addEventListener('dragenter', dragEnter)
    dropOff.addEventListener('dragleave', dragLeave)
    dropOff.addEventListener('drop', dragDrop)

  })


  // nodes listeners
  nodes.forEach(node => {
    node.addEventListener('dragstart', dragStart);
    node.addEventListener('dragend', dragEnd);
  })




}



drawTree();
addDragAndDrop()
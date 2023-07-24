import { RootNode, ChildNode } from "./ast";

interface VisitorOption {
  enter(node: ChildNode | RootNode, parent: ChildNode | RootNode | undefined);
  exit(node: ChildNode | RootNode, parent: ChildNode | RootNode | undefined);
}

export interface Visitor {
  Program?: VisitorOption;
  CallExpression?: VisitorOption;
  NumberLiteral?: VisitorOption;
  StringLiteral?: VisitorOption;
}

export function traverser(rootNode: RootNode, visitor: Visitor) {
  //1.深度优先搜索
  //2.visitor

  function traverserArray(
    array: ChildNode[],
    parent: ChildNode | RootNode | undefined
  ) {
    array.forEach((node) => {
      traverserNode(node, parent);
    });
  }

  function traverserNode(
    node: ChildNode | RootNode,
    parent?: ChildNode | RootNode
  ) {
    // console.log("node:", node);
    const visitorObj = visitor[node.type];
    if (visitorObj) {
      visitorObj.enter(node, parent);
    }
    switch (node.type) {
      case "Program":
        traverserArray(node.body, node);
        break;
      case "CallExpression":
        traverserArray(node.params, node);
        break;
      case "NumberLiteral":
        break;
    }
    if (visitorObj) {
      visitorObj.exit(node, parent);
    }
  }

  traverserNode(rootNode);
}

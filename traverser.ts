import { RootNode, ChildNode } from "./ast";

interface VisitorOption {
  enter();
  exit();
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

  function traverserArray(array: ChildNode[]) {
    array.forEach((node) => {
      traverserNode(node);
    });
  }

  function traverserNode(node: ChildNode | RootNode) {
    // console.log("node:", node);
    const visitorObj = visitor[node.type];
    if (visitorObj) {
      visitorObj.enter();
    }
    switch (node.type) {
      case "Program":
        traverserArray(node.body);
        break;
      case "CallExpression":
        traverserArray(node.params);
        break;
      case "NumberLiteral":
        break;
    }
    if (visitorObj) {
      visitorObj.exit();
    }
  }

  traverserNode(rootNode);
}

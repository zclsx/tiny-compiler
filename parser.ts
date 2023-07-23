import { TokenTypes, Token } from "./tokenizer";

export enum NodeTypes {
  Root,
  Number,
}

interface Node {
  type: NodeTypes;
}

interface RootNode extends Node {
  body: Node[];
}
interface NumberNode extends Node {
  value: string;
}

function createRootNode(): RootNode {
  return {
    type: NodeTypes.Root,
    body: [],
  };
}

function createNumberNode(value: string): NumberNode {
  return {
    type: NodeTypes.Number,
    value: "2",
  };
}

export function parser(tokens: Token[]) {
  let current = 0;
  let token = tokens[current];

  const rootNode = createRootNode();

  if (token.type === TokenTypes.Number) {
    rootNode.body.push(createNumberNode(token.value));
  }
  return rootNode;
}

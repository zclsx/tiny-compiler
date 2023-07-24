import { C } from "vitest/dist/types-198fd1d9";
import { TokenTypes, Token } from "./tokenizer";

export enum NodeTypes {
  Root,
  Number,
  CallExpression,
}

interface Node {
  type: NodeTypes;
}

type ChildNode = NumberNode | CallExpressionNode;

interface RootNode extends Node {
  body: ChildNode[];
}
interface NumberNode extends Node {
  value: string;
}

interface CallExpressionNode extends Node {
  name: string;
  //考虑到后面还有表达式
  params: ChildNode[];
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

  if (token.type === TokenTypes.paren && token.value === "(") {
    token = tokens[++current];
    const node: CallExpressionNode = {
      type: NodeTypes.CallExpression,
      name: token.value,
      params: [],
    };
    token = tokens[++current];
    while (!(token.type === TokenTypes.paren && token.value === ")")) {
      if (token.type === TokenTypes.Number) {
        node.params.push(createNumberNode(token.value));
      }
      token = tokens[++current];
    }
  }
  return rootNode;
}

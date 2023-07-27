import {
  createRootNode,
  createStringLiteralNode,
  createNumberLiteralNode,
  createCallExpression,
} from "./ast";
import { Token, TokenTypes } from "./tokenizer";

export function parser(tokens: Token[]) {
  let current = 0;

  const rootNode = createRootNode();

  function walk() {
    //递归
    let token = tokens[current];
    if (token.type === TokenTypes.Number) {
      // rootNode.body.push(createNumberNode(token.value));
      current++;
      return createNumberLiteralNode(token.value);
    }
    if(token.type === TokenTypes.String){
      current++;
      return createStringLiteralNode(token.value);
    } 


    if (token.type === TokenTypes.paren && token.value === "(") {
      token = tokens[++current];
      const node = createCallExpression(token.value);

      token = tokens[++current];
      while (!(token.type === TokenTypes.paren && token.value === ")")) {
        node.params.push(walk());
        token = tokens[current];
      }
      current++; //跳过右括号
      // rootNode.body.push(node); //把node放到rootNode的body里
      return node;
    }
    throw new Error(`unexpected token:${token}`);
  }
  while (current < tokens.length) {
    rootNode.body.push(walk());
  }
  return rootNode;
}


// export enum NodeTypes {
//   Root,
//   Number,
//   CallExpression,
// }

// interface Node {
//   type: NodeTypes;
// }

// type ChildNode = NumberNode | CallExpressionNode;

// interface RootNode extends Node {
//   body: ChildNode[];
// }
// interface NumberNode extends Node {
//   value: string;
// }

// interface CallExpressionNode extends Node {
//   name: string;
//   //考虑到后面还有表达式
//   params: ChildNode[];
// }

// function createRootNode(): RootNode {
//   return {
//     type: NodeTypes.Root,
//     body: [],
//   };
// }

// function createNumberNode(value: string): NumberNode {
//   return {
//     type: NodeTypes.Number,
//     value,
//   };
// }

// function createCallExpressionNode(name: string): CallExpressionNode {
//   return {
//     type: NodeTypes.CallExpression,
//     name,
//     params: [],
//   };
// }

import { TokenTypes, Token } from "./tokenizer";

export enum NodeTypes {
  Root,
  Number,
}

export function parser(tokens: Token[]) {
  let current = 0;
  let token = tokens[current];

  const rootNode: any = {
    type: NodeTypes.Root,
    body: [],
  };

  if (token.type === TokenTypes.Number) {
    const numberNode = {
      type: NodeTypes.Number,
      value: "2",
    };
    rootNode.body.push(numberNode);
  }
  return rootNode;
}

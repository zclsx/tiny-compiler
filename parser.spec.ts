import { expect, test } from "vitest";
import { TokenTypes } from "./tokenizer";
import { parser, NodeTypes } from "./parser";
//词法分析
test.skip("should ", () => {
  const token = [
    { type: TokenTypes.paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.paren, value: "(" },
    { type: TokenTypes.Name, value: "subtract" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.paren, value: ")" },
    { type: TokenTypes.paren, value: ")" },
  ];
  const ast = {
    type: "Program",
    body: [
      {
        type: "CallExpression",
        name: "add",
        params: [
          {
            type: "NumberLiteral",
            value: "2",
          },
          {
            type: "CallExpression",
            name: "subtract",
            params: [
              {
                type: "NumberLiteral",
                value: "4",
              },
              {
                type: "NumberLiteral",
                value: "2",
              },
            ],
          },
        ],
      },
    ],
  };

  expect(parser(token)).toEqual(ast);
});

test("number", () => {
  const token = [
    {
      type: TokenTypes.Number,
      value: "2",
    },
  ];
  const ast = {
    type: NodeTypes.Root,
    body: [
      {
        type: NodeTypes.Number,
        value: "2",
      },
    ],
  };

  expect(parser(token)).toEqual(ast);
});

test("CallExpression ", () => {
  const token = [
    { type: TokenTypes.paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.paren, value: "(" },
  ];

  const ast = {
    type: NodeTypes.Root,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.Number,
            value: "2",
          },
          {
            type: NodeTypes.Number,
            value: "4",
          },
        ],
      },
    ],
  };
});

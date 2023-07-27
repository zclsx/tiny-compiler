import { expect, test } from "vitest";
import { TokenTypes } from "./tokenizer";
import { NodeTypes } from "./ast";
import { parser } from "./parser";
//词法分析
test("should ", () => {
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
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: "2",
          },
          {
            type: NodeTypes.CallExpression,
            name: "subtract",
            params: [
              {
                type: NodeTypes.NumberLiteral,
                value: "4",
              },
              {
                type: NodeTypes.NumberLiteral,
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
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.NumberLiteral,
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
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: "2",
          },
          {
            type: NodeTypes.NumberLiteral,
            value: "4",
          },
        ],
      },
    ],
  };
});

test("two CallExpression ", () => {
  const token = [
    { type: TokenTypes.paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.paren, value: ")" },
    { type: TokenTypes.paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "3" },
    { type: TokenTypes.Number, value: "5" },
    { type: TokenTypes.paren, value: "(" },
  ];

  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: "2",
          },
          {
            type: NodeTypes.NumberLiteral,
            value: "4",
          },
        ],
      },
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: "3",
          },
          {
            type: NodeTypes.NumberLiteral,
            value: "5",
          },
        ],
      },
    ],
  };
});

import { expect, test } from "vitest";
import { NodeTypes, RootNode } from "./ast";
import { traverser, Visitor } from "./traverser";
// 遍历树
test("traverser", () => {
  const ast: RootNode = {
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

  const callCounts: any = [];
  const visitor: Visitor = {
    Program: {
      enter() {
        callCounts.push("program-enter");
      },
      exit() {
        callCounts.push("program-exit");
      },
    },

    CallExpression: {
      enter() {
        callCounts.push("callExpression-enter");
      },
      exit() {
        callCounts.push("callExpression-exit");
      },
    },

    NumberLiteral: {
      enter() {
        callCounts.push("numberLiteral-enter");
      },
      exit() {
        callCounts.push("numberLiteral-exit");
      },
    },
  };

  traverser(ast, visitor);

  expect(callCounts).toEqual([
    "program-enter",
    "callExpression-enter",
    "numberLiteral-enter",
    "numberLiteral-exit",
    "callExpression-enter",
    "numberLiteral-enter",
    "numberLiteral-exit",
    "numberLiteral-enter",
    "numberLiteral-exit",
    "callExpression-exit",
    "callExpression-exit",
    "program-exit",
  ]);
});

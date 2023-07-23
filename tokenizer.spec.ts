import { test, expect } from "vitest";
import { tokenizer, TokenTypes } from "./tokenizer";

test("tokenizer", () => {
  const code = `(add 2 (subtract 4 2))`;
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
  expect(tokenizer(code)).toEqual(token);
});

test("left (->paren", () => {
  const code = `(`;
  const token = [{ type: TokenTypes.paren, value: "(" }];
  expect(tokenizer(code)).toEqual(token);
});

test("name", () => {
  const code = `add`;
  const token = [{ type: TokenTypes.Name, value: "add" }];
  expect(tokenizer(code)).toEqual(token);
});

test("number", () => {
  const code = `22`;
  const token = [{ type: TokenTypes.Number, value: "22" }];
  expect(tokenizer(code)).toEqual(token);
});

test("right )->paren", () => {
  const code = `)`;
  const token = [{ type: TokenTypes.paren, value: ")" }];
  expect(tokenizer(code)).toEqual(token);
});

test("mix S and N", () => {
  const code = `(add 1 2)`;
  const token = [
    { type: TokenTypes.paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "1" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.paren, value: ")" },
  ];
  expect(tokenizer(code)).toEqual(token);
});


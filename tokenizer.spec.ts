import { test, expect } from "vitest";
import { tokenizer, TokenTypes } from "./tokenizer";

test.skip("tokenizer", () => {
  const code = `(add 2 (subtract 4 2))`;
  const token = [
    { type: "paren", value: "(" },
    { type: "name", value: "add" },
    { type: "number", value: "2" },
    { type: "paren", value: "(" },
    { type: "name", value: "subtract" },
    { type: "number", value: "4" },
    { type: "number", value: "2" },
    { type: "paren", value: ")" },
    { type: "paren", value: ")" },
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

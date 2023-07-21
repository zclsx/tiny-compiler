export enum TokenTypes {
    paren
}

interface Token {
  type: TokenTypes;
  value: string;
}

export function tokenizer(code: string) {
  const tokens: Token[] = [];
  let current = 0;
  let char = code[current];

  if (char === "(") {
    tokens.push({
      type: TokenTypes.paren,
      value: char,
    });
  }
  return tokens;
}

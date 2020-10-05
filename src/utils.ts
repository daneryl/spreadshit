const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const letters = (n: number) => alphabet.slice(0, n);

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => i + 1);

export { letters, range };

export type ScalarOperationType = (first: number, second: number) => number;

export const pow: ScalarOperationType = (
  first: number,
  second: number
): number => first ** second;

export const mod: ScalarOperationType = (
  first: number,
  second: number
): number => first % second;

export const mul: ScalarOperationType = (
  first: number,
  second: number
): number => first * second;

export const div: ScalarOperationType = (
  first: number,
  second: number
): number => first / second;

export const add: ScalarOperationType = (
  first: number,
  second: number
): number => first + second;

export const minus: ScalarOperationType = (
  first: number,
  second: number
): number => first - second;

export const mathOperators: { [key: string]: ScalarOperationType } = {
  "*": mul,
  "/": div,
  "+": add,
  "-": minus,
  "%": mod,
  "**": pow,
};

export const mathPriorities: number[] = [1, 2, 3];

const [FIRST, SECOND, THIRD] = mathPriorities;

export const mathOperatorsPriorities: { [key: string]: number } = {
  "**": FIRST,
  "%": SECOND,
  "*": SECOND,
  "/": SECOND,
  "+": THIRD,
  "-": THIRD,
};

import { mul, div, add, minus, pov, rem } from "./mathOperators";

describe("mathOperators test cases", () => {
  it("mul 1 * 2 to equal 2", () => {
    expect(mul(1, 2)).toBe(2);
  });

  it("mul 2 * 2 to equal 4", () => {
    expect(mul(2, 2)).toBe(4);
  });

  it("div 2 / 2 to equal 1", () => {
    expect(div(2, 2)).toBe(1);
  });

  it("div 4 / 2 to equal 2", () => {
    expect(div(4, 2)).toBe(2);
  });

  it("add 4 + 2 to equal 6", () => {
    expect(add(4, 2)).toBe(6);
  });

  it("minus 4 - 2 to equal 2", () => {
    expect(minus(4, 2)).toBe(2);
  });

  it("pov 4 ** 2 to equal 16", () => {
    expect(pov(4, 2)).toBe(16);
  });

  it("pov 3 ** 3 to equal 27", () => {
    expect(pov(3, 3)).toBe(27);
  });

  it("rem 14 % 5 to equal 4", () => {
    expect(rem(14, 5)).toBe(4);
  });

  it("rem 12 % 3 to equal 0", () => {
    expect(rem(12, 3)).toBe(0);
  });
});

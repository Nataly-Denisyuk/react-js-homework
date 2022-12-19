import {
  firstPrioritiesCalc,
  secondPrioritiesCalc,
  thirdPrioritiesCalc,
  braketsCalc,
} from "./engine";

describe("firstPrioritiesCalc simple cases", () => {
  it("[1, * 32]", () => {
    expect(firstPrioritiesCalc([1, "*", 32])).toEqual([1, "*", 32]);
  });

  it("[32, /, 32]", () => {
    expect(firstPrioritiesCalc([32, "/", 32])).toEqual([32, "/", 32]);
  });

  it("[32, +, 32]", () => {
    expect(firstPrioritiesCalc([32, "+", 32])).toEqual([32, "+", 32]);
  });

  it("[32, -, 32]", () => {
    expect(firstPrioritiesCalc([32, "-", 32])).toEqual([32, "-", 32]);
  });
  it("[3, **, 3]", () => {
    expect(firstPrioritiesCalc([3, "**", 3])).toEqual([27]);
  });
  it("[13, %, 4]", () => {
    expect(firstPrioritiesCalc([13, "%", 4])).toEqual([1]);
  });
});

describe("firstPrioritiesCalc mixed with secondPrioritiesCalc and thirdPrioritiesCalc", () => {
  it("[32, /, 32, +, 10, **, 2]", () => {
    expect(firstPrioritiesCalc([32, "/", 32, "+", 10, "**", 2])).toEqual([
      32,
      "/",
      32,
      "+",
      100,
    ]);
  });
});

describe("secondPrioritiesCalc invalid cases", () => {
  it("[3, ** 3]", () => {
    expect(() => secondPrioritiesCalc([3, "**", 3])).toThrow(
      TypeError("Unexpected stack!")
    );
  });
});

describe("secondPrioritiesCalc simple cases", () => {
  it("[32, *, 3]", () => {
    expect(secondPrioritiesCalc([32, "*", 3])).toEqual([96]);
  });

  it("[32, /, 32]", () => {
    expect(secondPrioritiesCalc([32, "/", 32])).toEqual([1]);
  });

  it("[32, * 3, /, 2]", () => {
    expect(secondPrioritiesCalc([32, "*", 3, "/", 2])).toEqual([48]);
  });
});

describe("thirdPrioritiesCalc invalid cases", () => {
  it("[32, * 3]", () => {
    expect(() => thirdPrioritiesCalc([32, "*", 3])).toThrowError(
      "Unexpected stack!"
    );
  });
});

describe("thirdPrioritiesCalc simple cases", () => {
  it("[32, +, 3]", () => {
    expect(thirdPrioritiesCalc([32, "+", 3])).toEqual(35);
  });

  it("[32, -, 32]", () => {
    expect(thirdPrioritiesCalc([32, "-", 32])).toEqual(0);
  });
});

describe("braketsCalc diferent simple", () => {
  it("[1 + 5 * ( 2 + 1 ) + 3]", () => {
    expect(braketsCalc([1, "+", 5, "*", "(", 2, "+", 1, ")", "+", 3])).toEqual([
      "19",
    ]);
  });

  it("[1 + 5 * ( 2 + 1 ) - 3 ** 2]", () => {
    expect(
      braketsCalc([1, "+", 5, "*", "(", 2, "+", 1, ")", "-", 3, "**", 2])
    ).toEqual(["7"]);
  });

  it("[1 + 5 * ( 2 + 1 ) * ( 3 + 2 )]", () => {
    expect(
      braketsCalc([
        1,
        "+",
        5,
        "*",
        "(",
        2,
        "+",
        1,
        ")",
        "*",
        "(",
        3,
        "+",
        2,
        ")",
      ])
    ).toEqual(["76"]);
  });

  it("[1 + 5 * ( 2 + ( 1 + 3 ) * 2 )]", () => {
    expect(
      braketsCalc([
        1,
        "+",
        5,
        "*",
        "(",
        2,
        "+",
        "(",
        1,
        "+",
        3,
        ")",
        "*",
        2,
        ")",
      ])
    ).toEqual(["51"]);
  });
});

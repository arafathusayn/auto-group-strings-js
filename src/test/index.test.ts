import autoGroupStrings from "../index";

describe("auto-group-strings", () => {
  test("returns an empty array for empty array in first argument", () => {
    const result = autoGroupStrings([]);

    expect(result instanceof Array).toBe(true);
  });

  test("groups strings and applies default space delimiter & rtl direction", () => {
    const result = autoGroupStrings([
      "hello code", // 0
      "apple and orange", // 1
      "for the happy code", // 2
      "i don't know", // 3
      "is it?", // 4
      "it's a happy code", // 5
      "ok", // 6
      "you mean the happy code", // 7
    ]);

    expect(result[0].common).toBe("code");
    expect(result[0].members).toStrictEqual([0, 2, 5, 7]);
    expect(result[1].common).toBe("happy code");
    expect(result[1].members).toStrictEqual([2, 5, 7]);
    expect(result[2].common).toBe("the happy code");
    expect(result[2].members).toStrictEqual([2, 7]);
  });

  test("applies given delimiter, direction and caseSensitive check", () => {
    const result1 = autoGroupStrings(
      [
        "hello, hi, hey, world", // 0
        "hello, world", // 1
        "apple and orange", // 2
        "hello, hi, hey, developer", // 3
      ],
      {
        delimiter: ",",
        direction: "ltr",
        caseSensitive: true,
      },
    );

    expect(result1[0].common).toBe("hello");
    expect(result1[0].members).toStrictEqual([0, 1, 3]);
    expect(result1[1].common).toBe("hello, hi");
    expect(result1[1].members).toStrictEqual([0, 3]);
    expect(result1[2].common).toBe("hello, hi, hey");
    expect(result1[2].members).toStrictEqual([0, 3]);

    const result2 = autoGroupStrings(
      [
        "hello, hi, hey, world", // 0
        "hello, world", // 1
        "apple and orange", // 2
        "hello, hi, hey, developer", // 3
      ],
      {
        delimiter: ",",
        direction: "rtl",
        caseSensitive: false,
      },
    );

    expect(result2[0].common).toBe(" world");
    expect(result2[0].members).toStrictEqual([0, 1]);

    const result3 = autoGroupStrings(
      [
        "hello, hi, hey, world", // 0
        "hello, world", // 1
        "apple and orange", // 2
        "hello, hi, hey, developer", // 3
      ],
      {
        delimiter: ",",
        direction: "rtl",
        caseSensitive: true,
      },
    );

    expect(result3[0].common).toBe(" world");
    expect(result3[0].members).toStrictEqual([0, 1]);

    const result4 = autoGroupStrings(
      [
        "hello, hi, hey, world", // 0
        "hello, world", // 1
        "apple and orange", // 2
        "hello, hi, hey, developer", // 3
      ],
      {
        delimiter: ",",
        direction: "ltr",
        caseSensitive: false,
      },
    );

    expect(result4[0].common).toBe("hello");
    expect(result4[0].members).toStrictEqual([0, 1, 3]);
  });
});
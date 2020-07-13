const autoGroupStrings = (
  inputStrings: string[],
  {
    delimiter,
    direction,
    caseSensitive,
  }: {
    delimiter: string;
    direction: "ltr" | "rtl";
    caseSensitive: boolean;
  } = {
    delimiter: " ",
    direction: "rtl",
    caseSensitive: false,
  },
): { common: string; members: number[] }[] | [] => {
  const len = inputStrings.length;

  let output: {
    common: string;
    members: number[];
    prevWords: string[][];
  }[] = [];

  for (let i = 0; i < len; i++) {
    if (direction === "rtl") {
      const words = inputStrings[i].split(delimiter).slice().reverse();

      if (i === 0) {
        output.push({
          common: words[i],
          members: [i],
          prevWords: [words],
        });

        continue;
      } else {
        if (output.find((word) => words[0] === word.common)) {
          const index = output.findIndex((word) =>
            caseSensitive
              ? words[0] === word.common
              : words[0].toLowerCase() === word.common.toLowerCase(),
          );

          output[index].members.push(i);

          for (let k = 1; k < words.length; k++) {
            for (let l = 0; l < output[index].prevWords.length; l++) {
              if (typeof output[index].prevWords[l][k] === "undefined") {
                continue;
              }

              if (
                caseSensitive
                  ? output[index].prevWords[l][k] === words[k]
                  : output[index].prevWords[l][k].toLowerCase() ===
                    words[k].toLowerCase()
              ) {
                output.push({
                  common:
                    words[k] +
                    delimiter +
                    words.slice(0, k).reverse().join(delimiter),
                  members: [
                    inputStrings.indexOf(
                      output[index].prevWords[l]
                        .slice()
                        .reverse()
                        .join(delimiter),
                    ),
                    i,
                  ],
                  prevWords: [],
                });
              }
            }
          }

          output[index].prevWords.push(words);
        } else {
          continue;
        }
      }
    } else {
      // code for ltr
      const words = inputStrings[i].split(delimiter);

      if (i === 0) {
        output.push({
          common: words[i],
          members: [i],
          prevWords: [words],
        });

        continue;
      } else {
        if (output.find((word) => words[0] === word.common)) {
          const index = output.findIndex((word) =>
            caseSensitive
              ? words[0] === word.common
              : words[0].toLowerCase() === word.common.toLowerCase(),
          );

          output[index].members.push(i);

          for (let k = 1; k < words.length; k++) {
            for (let l = 0; l < output[index].prevWords.length; l++) {
              if (typeof output[index].prevWords[l][k] === "undefined") {
                continue;
              }

              if (
                caseSensitive
                  ? output[index].prevWords[l][k] === words[k]
                  : output[index].prevWords[l][k].toLowerCase() ===
                    words[k].toLowerCase()
              ) {
                output.push({
                  common:
                    words.slice(0, k).join(delimiter) + delimiter + words[k],
                  members: [
                    inputStrings.indexOf(
                      output[index].prevWords[l].join(delimiter),
                    ),
                    i,
                  ],
                  prevWords: [],
                });
              }
            }
          }

          output[index].prevWords.push(words);
        } else {
          continue;
        }
      }
    }
  }

  let newOutput = [];

  const uniqueArrayByCommon = Array.from(
    new Set(output.map((item) => item.common)),
  );

  for (const item of uniqueArrayByCommon) {
    newOutput.push({
      common: item,
      members: Array.from(
        new Set(
          output
            .filter((x) => x.common === item)
            .map((x) => x.members)
            .flat(),
        ),
      ),
    });
  }

  return newOutput;
};

export default autoGroupStrings;
module.exports = autoGroupStrings;

const autoGroupStrings = (
  inputStrings: string[],
  {
    delimiter,
    delimiterRegExp,
    direction,
    caseSensitive,
    includeSingleElementMembers,
  }: {
    delimiter?: string;
    delimiterRegExp?: RegExp;
    direction?: "ltr" | "rtl";
    caseSensitive?: boolean;
    includeSingleElementMembers?: boolean;
  } = {
    delimiter: " ",
    direction: "rtl",
    caseSensitive: false,
    includeSingleElementMembers: false,
  },
): { common: string; members: number[] }[] | [] => {
  if (typeof delimiter === "undefined") {
    delimiter = " ";
  }

  if (typeof direction === "undefined") {
    direction = "rtl";
  }

  if (typeof caseSensitive === "undefined") {
    caseSensitive = false;
  }

  const len = inputStrings.length;

  let output: {
    common: string;
    members: number[];
    prevWords: string[][];
  }[] = [];

  for (let i = 0; i < len; i++) {
    if (delimiterRegExp instanceof RegExp) {
      const match = inputStrings[i].match(delimiterRegExp);

      delimiter = (match && match[0]) || delimiter;
    }

    if (direction === "rtl") {
      let words = inputStrings[i]
        .split(delimiterRegExp || delimiter)
        .slice()
        .reverse();

      if (delimiterRegExp instanceof RegExp && words.length === 1) {
        words = inputStrings[i].split(delimiter).slice().reverse();
      }

      if (!output.find((x) => x.common === words[0])) {
        output.push({
          common: words[0],
          members: [i],
          prevWords: [words],
        });
      } else {
        const foundCommonIndex = output.findIndex((x) => x.common === words[0]);

        output[foundCommonIndex].members.push(i);
      }

      const index = output.findIndex((word) =>
        caseSensitive === true
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
            caseSensitive === true
              ? output[index].prevWords[l].slice(0, k + 1).join(delimiter) ===
                words.slice(0, k + 1).join(delimiter)
              : output[index].prevWords[l]
                  .slice(0, k + 1)
                  .join(delimiter)
                  .toLowerCase() ===
                words
                  .slice(0, k + 1)
                  .join(delimiter)
                  .toLowerCase()
          ) {
            output.push({
              common:
                words[k] +
                delimiter +
                words.slice(0, k).reverse().join(delimiter),
              members: [
                inputStrings.indexOf(
                  output[index].prevWords[l].slice().reverse().join(delimiter),
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
      // code for ltr
      let words = inputStrings[i].split(delimiterRegExp || delimiter);

      if (delimiterRegExp instanceof RegExp && words.length === 1) {
        words = inputStrings[i].split(delimiter);
      }

      if (!output.find((x) => x.common === words[0])) {
        output.push({
          common: words[0],
          members: [i],
          prevWords: [words],
        });
      } else {
        const foundCommonIndex = output.findIndex((x) => x.common === words[0]);

        output[foundCommonIndex].members.push(i);
      }

      const index = output.findIndex((word) =>
        caseSensitive === true
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
            caseSensitive === true
              ? output[index].prevWords[l].slice(0, k + 1).join(delimiter) ===
                words.slice(0, k + 1).join(delimiter)
              : output[index].prevWords[l]
                  .slice(0, k + 1)
                  .join(delimiter)
                  .toLowerCase() ===
                words
                  .slice(0, k + 1)
                  .join(delimiter)
                  .toLowerCase()
          ) {
            output.push({
              common: words.slice(0, k).join(delimiter) + delimiter + words[k],
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
    }
  }

  let newOutput: {
    common: string;
    members: number[];
  }[] = [];

  let uniqueArrayByCommon: string[];

  if (includeSingleElementMembers === true) {
    uniqueArrayByCommon = Array.from(
      new Set(output.map((item) => item.common).concat(inputStrings)),
    );
  } else {
    uniqueArrayByCommon = Array.from(
      new Set(output.map((item) => item.common)),
    );
  }

  for (const item of uniqueArrayByCommon) {
    const membersContainingDuplicates = output
      .filter((x) => x.common === item)
      .map((x) => x.members)
      .flat();

    if (includeSingleElementMembers === true) {
      newOutput.push({
        common: item,
        members: Array.from(
          new Set(
            membersContainingDuplicates.length > 0
              ? membersContainingDuplicates
              : [inputStrings.indexOf(item)],
          ),
        ),
      });
    } else {
      newOutput.push({
        common: item,
        members: Array.from(new Set(membersContainingDuplicates)),
      });
    }
  }

  if (!includeSingleElementMembers) {
    newOutput = newOutput.filter((x) => x.members.length > 1);
  }

  return newOutput;
};

export default autoGroupStrings;
module.exports = autoGroupStrings;

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.autoGroupStrings = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autoGroupStrings = (inputStrings, { delimiter, direction, caseSensitive, } = {
    delimiter: " ",
    direction: "rtl",
    caseSensitive: false,
}) => {
    const len = inputStrings.length;
    let output = [];
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
            }
            else {
                if (output.find((word) => words[0] === word.common)) {
                    const index = output.findIndex((word) => caseSensitive
                        ? words[0] === word.common
                        : words[0].toLowerCase() === word.common.toLowerCase());
                    output[index].members.push(i);
                    for (let k = 1; k < words.length; k++) {
                        for (let l = 0; l < output[index].prevWords.length; l++) {
                            if (typeof output[index].prevWords[l][k] === "undefined") {
                                continue;
                            }
                            if (caseSensitive
                                ? output[index].prevWords[l][k] === words[k]
                                : output[index].prevWords[l][k].toLowerCase() ===
                                    words[k].toLowerCase()) {
                                output.push({
                                    common: words[k] +
                                        delimiter +
                                        words.slice(0, k).reverse().join(delimiter),
                                    members: [
                                        inputStrings.indexOf(output[index].prevWords[l]
                                            .slice()
                                            .reverse()
                                            .join(delimiter)),
                                        i,
                                    ],
                                    prevWords: [],
                                });
                            }
                        }
                    }
                    output[index].prevWords.push(words);
                }
                else {
                    continue;
                }
            }
        }
        else {
            // code for ltr
            const words = inputStrings[i].split(delimiter);
            if (i === 0) {
                output.push({
                    common: words[i],
                    members: [i],
                    prevWords: [words],
                });
                continue;
            }
            else {
                if (output.find((word) => words[0] === word.common)) {
                    const index = output.findIndex((word) => caseSensitive
                        ? words[0] === word.common
                        : words[0].toLowerCase() === word.common.toLowerCase());
                    output[index].members.push(i);
                    for (let k = 1; k < words.length; k++) {
                        for (let l = 0; l < output[index].prevWords.length; l++) {
                            if (typeof output[index].prevWords[l][k] === "undefined") {
                                continue;
                            }
                            if (caseSensitive
                                ? output[index].prevWords[l][k] === words[k]
                                : output[index].prevWords[l][k].toLowerCase() ===
                                    words[k].toLowerCase()) {
                                output.push({
                                    common: words.slice(0, k).join(delimiter) + delimiter + words[k],
                                    members: [
                                        inputStrings.indexOf(output[index].prevWords[l].join(delimiter)),
                                        i,
                                    ],
                                    prevWords: [],
                                });
                            }
                        }
                    }
                    output[index].prevWords.push(words);
                }
                else {
                    continue;
                }
            }
        }
    }
    let newOutput = [];
    const uniqueArrayByCommon = Array.from(new Set(output.map((item) => item.common)));
    for (const item of uniqueArrayByCommon) {
        newOutput.push({
            common: item,
            members: Array.from(new Set(output
                .filter((x) => x.common === item)
                .map((x) => x.members)
                .flat())),
        });
    }
    return newOutput;
};
exports.default = autoGroupStrings;
module.exports = autoGroupStrings;

},{}]},{},[1])(1)
});

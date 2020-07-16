(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.autoGroupStrings = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autoGroupStrings = (inputStrings, { delimiter, direction, caseSensitive, } = {
    delimiter: " ",
    direction: "rtl",
    caseSensitive: false,
}) => {
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
    let output = [];
    for (let i = 0; i < len; i++) {
        if (direction === "rtl") {
            const words = inputStrings[i].split(delimiter).slice().reverse();
            if (!output.find((x) => x.common === words[0])) {
                output.push({
                    common: words[0],
                    members: [i],
                    prevWords: [words],
                });
            }
            else {
                const foundCommonIndex = output.findIndex((x) => x.common === words[0]);
                output[foundCommonIndex].members.push(i);
            }
            const index = output.findIndex((word) => caseSensitive === true
                ? words[0] === word.common
                : words[0].toLowerCase() === word.common.toLowerCase());
            output[index].members.push(i);
            for (let k = 1; k < words.length; k++) {
                for (let l = 0; l < output[index].prevWords.length; l++) {
                    if (typeof output[index].prevWords[l][k] === "undefined") {
                        continue;
                    }
                    if (caseSensitive === true
                        ? output[index].prevWords[l].slice(0, k + 1).join(delimiter) ===
                            words.slice(0, k + 1).join(delimiter)
                        : output[index].prevWords[l]
                            .slice(0, k + 1)
                            .join(delimiter)
                            .toLowerCase() ===
                            words
                                .slice(0, k + 1)
                                .join(delimiter)
                                .toLowerCase()) {
                        output.push({
                            common: words[k] +
                                delimiter +
                                words.slice(0, k).reverse().join(delimiter),
                            members: [
                                inputStrings.indexOf(output[index].prevWords[l].slice().reverse().join(delimiter)),
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
            // code for ltr
            const words = inputStrings[i].split(delimiter);
            if (!output.find((x) => x.common === words[0])) {
                output.push({
                    common: words[0],
                    members: [i],
                    prevWords: [words],
                });
            }
            else {
                const foundCommonIndex = output.findIndex((x) => x.common === words[0]);
                output[foundCommonIndex].members.push(i);
            }
            const index = output.findIndex((word) => caseSensitive === true
                ? words[0] === word.common
                : words[0].toLowerCase() === word.common.toLowerCase());
            output[index].members.push(i);
            for (let k = 1; k < words.length; k++) {
                for (let l = 0; l < output[index].prevWords.length; l++) {
                    if (typeof output[index].prevWords[l][k] === "undefined") {
                        continue;
                    }
                    if (caseSensitive === true
                        ? output[index].prevWords[l].slice(0, k + 1).join(delimiter) ===
                            words.slice(0, k + 1).join(delimiter)
                        : output[index].prevWords[l]
                            .slice(0, k + 1)
                            .join(delimiter)
                            .toLowerCase() ===
                            words
                                .slice(0, k + 1)
                                .join(delimiter)
                                .toLowerCase()) {
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
    newOutput = newOutput.filter((x) => x.members.length > 1);
    return newOutput;
};
exports.default = autoGroupStrings;
module.exports = autoGroupStrings;

},{}]},{},[1])(1)
});

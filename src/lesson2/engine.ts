import { ParsedLineType } from "./parser";
import { isNumber } from "./helpers";
//import { runner } from "./runner";
import {
  mathOperators,
  mathPriorities,
  mathOperatorsPriorities,
} from "./mathOperators";

const [FIRST, SECOND, THIRD] = mathPriorities;

export const firstPrioritiesCalc = (stack: ParsedLineType): ParsedLineType =>
  stack.reduce<ParsedLineType>((result, nextItem) => {
    const prevItem = result[result.length - 2];
    const item = result[result.length - 1];

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === FIRST) {
      if (!mathOperators[item]) {
        throw new Error("Unexpected stack!");
      }
      result = [
        ...result.slice(0, -2),
        mathOperators[item](Number(prevItem), Number(nextItem)),
      ];
    } else {
      result.push(nextItem);
    }
    return result;
  }, []);

export const secondPrioritiesCalc = (stack: ParsedLineType): ParsedLineType =>
  stack.reduce<ParsedLineType>((result, nextItem) => {
    const prevItem = result[result.length - 2];
    const item = result[result.length - 1];

    if (mathOperatorsPriorities[item] === FIRST) {
      throw new Error(`Unexpected stack!`);
    }

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === SECOND) {
      result = [
        ...result.slice(0, -2),
        mathOperators[item](Number(prevItem), Number(nextItem)),
      ];
    } else {
      result.push(nextItem);
    }
    return result;
  }, []);

export const thirdPrioritiesCalc = (stack: ParsedLineType): number =>
  stack.reduce<number>((result, nextItem, key) => {
    const item = stack[key - 1];

    if (
      mathOperatorsPriorities[item] === SECOND ||
      mathOperatorsPriorities[item] === FIRST
    ) {
      throw new Error(`Unexpected stack!`);
    }

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === THIRD) {
      result = mathOperators[item](Number(result), Number(nextItem));
    }
    return result;
  }, Number(stack[0]));

export const braketsCalc = (line: ParsedLineType): ParsedLineType => {
  //console.info(line);
  if (line.includes("(")) {
    let i = 0;
    let braketscount = 1;
    const leftindex = line.indexOf("(");
    for (i = leftindex + 1; i < line.length; i++) {
      if (line[i] === ")") {
        braketscount--;
      }
      if (line[i] === "(") {
        braketscount++;
      }
      if (braketscount === 0) {
        const stack: ParsedLineType = [];
        //console.info(line.slice(leftindex + 1, i));
        const res = braketsCalc(line.slice(leftindex + 1, i));
        return braketsCalc(
          stack.concat(
            line.slice(0, leftindex),
            res,
            line.slice(i + 1, line.length)
          )
        );
      }
    }
  } else {
    return [
      thirdPrioritiesCalc(
        secondPrioritiesCalc(firstPrioritiesCalc(line))
      ).toString(),
    ];
    //}
  }
  return line;
};

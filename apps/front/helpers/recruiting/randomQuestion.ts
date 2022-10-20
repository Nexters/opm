import { Assignments } from "opm-models";
import {
  CorrectQuestion,
  ParaphraseQuestion,
} from "opm-models/dist/models/assignment";

export const makeArray = (objectLength: number) => {
  return Array.from(
    {
      length: objectLength,
    },
    (v, i) => i + 1,
  );
};

export const getCombi = (arr: number[], selectnum: number) => {
  let result: any[] = [];
  if (selectnum === 1) {
    return arr.map((v) => [v]);
  }
  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combi = getCombi(rest, selectnum - 1);
    const fixed_combi = combi.map((v) => [fixed, ...v]);
    result.push(...fixed_combi);
  });
  return result;
};

export const rand = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const pickAssignment = (
  obj: Record<number, CorrectQuestion | ParaphraseQuestion>,
) => {
  const numberList = makeArray(Object.keys(obj).length);
  const combiList = getCombi(numberList, 3);
  return combiList[rand(1, combiList.length)];
};

export const updateAssignmentNumber = (
  assignmentList: number[],
  assignments: Record<number, CorrectQuestion | ParaphraseQuestion>,
) => {
  const assignmentData: Assignments[] = [];
  assignmentList.map((el) => {
    const cur: Assignments = {
      number: el,
      question: assignments[el],
      answer: "",
    };
    assignmentData.push(cur);
  });

  return assignmentData;
};

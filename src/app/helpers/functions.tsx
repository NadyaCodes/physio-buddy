import { ExerciseAlgoBase, ExerciseData } from "./types";

export const calculateDateDifference = (startDate: Date, endDate: Date) => {
  // Calculate the difference in days (ignoring time)
  const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  const differenceMs = Math.abs(endDate.getTime() - startDate.getTime());
  const differenceDays = Math.floor(differenceMs / oneDay); // Round down to nearest day

  return differenceDays;
};

export const createFakeDate = () => {
  const startDateString = "2024-05-14";
  const startDate = new Date(startDateString); // Convert string to Date object
  return startDate;
};

export const createList = (list: ExerciseAlgoBase) => {
  const algoList = list || {};
  const exerciseArray = Object.keys(algoList);
  const finalObject = {} as ExerciseData;
  exerciseArray.forEach((exercise) => {
    let entry = algoList[exercise];
    if (entry) {
      let index = Number(entry.start);
      const color = algoList[exercise]?.color || "";
      finalObject[index] = {
        ...finalObject[index],
        [exercise]: { status: false, color },
      };
      while (index < 10) {
        finalObject[index] = {
          ...finalObject[index],
          [exercise]: { status: false, color },
        };
        index += Number(entry.frequency);
      }
    }
  });
  console.log("finalObject: ", finalObject);
  return finalObject;
};

import { ExerciseAlgoBase, ExerciseData } from "./types";

export const calculateDateDifference = (startDate: Date, endDate: Date) => {
  // Calculate the difference in days (ignoring time)
  const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  const differenceMs = Math.abs(endDate.getTime() - startDate.getTime());
  const differenceDays = Math.floor(differenceMs / oneDay); // Round down to nearest day

  return differenceDays;
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
      while (index <= 40) {
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

export const colorSwitch = (color: string) => {
  switch (color) {
    case "blue":
      return " text-blue-400";
    case "pink":
      return " text-pink-400";
    case "green":
      return " text-green-400";
    case "purple":
      return " text-purple-400";
    case "yellow":
      return " text-yellow-200";
    default:
      return " text-yellow-200";
  }
};

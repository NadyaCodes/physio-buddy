export type ExerciseData = {
  [key: string]: {
    [key: string]: { status: boolean; color: string };
  };
};

export type ExerciseEntry = {
  exercise: string;
  frequency: string | number;
  start: string | number;
  color: string;
};

export type ExerciseAlgoBase = {
  [key: string]: ExerciseEntry;
};

export type ExerciseAlgo = {
  [key: string]: ExerciseAlgoBase;
};

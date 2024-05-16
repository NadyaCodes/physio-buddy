import React from "react";
import ExerciseColumn from "./ExerciseColumn";
import { ExerciseData } from "../helpers/types";

type DayColumProps = {
  day: String;
  exerciseIndex: number;
  exerciseData: ExerciseData;
  setExerciseData: React.Dispatch<React.SetStateAction<ExerciseData>>;
};

export default function DayColumn({
  day,
  exerciseIndex,
  exerciseData,
  setExerciseData,
}: DayColumProps) {
  return (
    <div className="flex flex-col p-3">
      <div className="text-lg font-bold">{day}</div>
      <ExerciseColumn
        exerciseData={exerciseData}
        setExerciseData={setExerciseData}
        exerciseIndex={exerciseIndex}
      />
    </div>
  );
}

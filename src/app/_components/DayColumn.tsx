import React from "react";
import ExerciseColumn from "./ExerciseColumn";

type DayColumProps = {
  day: String;
  exerciseIndex: number;
  exerciseData: Object;
  setExerciseData: Function;
};

export default function DayColumn({
  day,
  exerciseIndex,
  exerciseData,
  setExerciseData,
}: DayColumProps) {
  return (
    <div className="m-4 flex flex-col border-2 p-3">
      <div className="text-lg font-bold">{day}</div>
      <ExerciseColumn
        exerciseData={exerciseData}
        setExerciseData={setExerciseData}
        exerciseIndex={exerciseIndex}
      />
    </div>
  );
}
